import { createHash, createHmac, timingSafeEqual } from 'node:crypto';

import {
  BadRequestException,
  ConflictException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import Razorpay from 'razorpay';
import { z } from 'zod';

import { env } from '../../config';
import { PrismaService } from '../../prisma/prisma.service';
import { ListResponse } from '../../types/api.types';
import {
  BookingStatus,
  Category,
  InvoiceStatus,
  PaymentMethod,
  PaymentStatus,
  Prisma,
  UserRole,
} from '../../types/prisma.types';
import { StatItem } from '../../types/shared.types';

import { CreatePaymentDto } from './dto/create-payment.dto';
import { PaymentsQueryDto } from './dto/payments-query.dto';
import { VerifyPaymentDto } from './dto/verify-payment.dto';
import { PAYMENTS_ERROR_MSG } from './payments.constants';
import {
  CreateOrder,
  CreatePayment,
  CustomerPayment,
  PaymentItem,
  PublicPaymentStatus,
} from './payments.types';

const PAYMENT_SELECT = {
  id: true,
  bookingId: true,
  paymentReference: true,
  transactionId: true,
  amount: true,
  paymentMethod: true,
  paymentStatus: true,
  paidAt: true,
  createdAt: true,
  invoice: {
    select: {
      invoiceNumber: true,
      booking: { select: { bookingReference: true } },
    },
  },
  customer: { select: { fullName: true } },
  recorder: { select: { fullName: true } },
} satisfies Prisma.PaymentSelect;

type PaymentRecord = Prisma.PaymentGetPayload<{
  select: typeof PAYMENT_SELECT;
}>;

type GatewayPayment = {
  id: string;
  order_id: string;
  amount: number | string;
  currency: string;
  status: 'created' | 'authorized' | 'captured' | 'refunded' | 'failed';
  captured: boolean;
  created_at: number;
};

const RazorpayWebhookSchema = z
  .object({
    event: z.string(),
    payload: z
      .object({
        payment: z
          .object({
            entity: z
              .object({
                id: z.string(),
                order_id: z.string(),
              })
              .passthrough(),
          })
          .optional(),
      })
      .passthrough(),
  })
  .passthrough();

@Injectable()
export class PaymentsService {
  private razorpay: Razorpay;
  constructor(private readonly prismaService: PrismaService) {
    this.razorpay = new Razorpay({
      key_id: env.RAZORPAY_KEY_ID,
      key_secret: env.RAZORPAY_KEY_SECRET,
    });
  }

  async getStats(role: UserRole, category?: Category): Promise<StatItem[]> {
    this.assertPaymentReader(role, category);
    const [completed, pending, refunded] = await Promise.all([
      this.prismaService.payment.aggregate({
        where: { paymentStatus: PaymentStatus.COMPLETED },
        _sum: { amount: true },
        _count: { _all: true },
      }),
      this.prismaService.payment.aggregate({
        where: { paymentStatus: PaymentStatus.PENDING },
        _sum: { amount: true },
        _count: { _all: true },
      }),
      this.prismaService.payment.aggregate({
        where: { paymentStatus: PaymentStatus.REFUNDED },
        _sum: { amount: true },
      }),
    ]);

    const formatAmount = (amount: number) =>
      `₹${amount.toLocaleString('en-IN')}`;

    return [
      {
        id: 'total-collected',
        icon: 'IndianRupee',
        title: 'Total Collected',
        value: formatAmount(completed._sum.amount ?? 0),
        description: 'From completed payments',
        tone: 'emerald',
      },
      {
        id: 'pending-payments',
        icon: 'Clock',
        title: 'Pending Payments',
        value: formatAmount(pending._sum.amount ?? 0),
        description: `${pending._count._all.toLocaleString()} awaiting confirmation`,
        tone: 'gold',
      },
      {
        id: 'refunded-payments',
        icon: 'RefreshCw',
        title: 'Refunded',
        value: formatAmount(refunded._sum.amount ?? 0),
        description: 'Total amount refunded',
        tone: 'rose',
      },
      {
        id: 'completed-payments',
        icon: 'CheckCircle',
        title: 'Completed Payments',
        value: completed._count._all.toLocaleString(),
        description: 'Successfully collected transactions',
        tone: 'sky',
      },
    ];
  }

  async findAll(
    query: PaymentsQueryDto,
    userId: string,
    role: UserRole,
    category?: Category,
  ): Promise<ListResponse<PaymentItem | CustomerPayment>> {
    this.assertPaymentReader(role, category);
    const { page, limit, search, status, paymentMethod } = query;
    const where: Prisma.PaymentWhereInput = {
      ...(role === UserRole.CUSTOMER && { customerId: userId }),
      ...(status && { paymentStatus: status }),
      ...(paymentMethod && { paymentMethod }),
      ...(search && {
        OR: [
          { paymentReference: { contains: search, mode: 'insensitive' } },
          {
            invoice: {
              is: {
                booking: {
                  is: {
                    bookingReference: { contains: search, mode: 'insensitive' },
                  },
                },
              },
            },
          },
          {
            customer: {
              is: { fullName: { contains: search, mode: 'insensitive' } },
            },
          },
        ],
      }),
    };

    const [payments, total] = await this.prismaService.$transaction([
      this.prismaService.payment.findMany({
        where,
        select: PAYMENT_SELECT,
        orderBy: { createdAt: 'desc' },
        skip: (page - 1) * limit,
        take: limit,
      }),
      this.prismaService.payment.count({ where }),
    ]);

    return {
      data: payments.map((payment) =>
        role === UserRole.CUSTOMER
          ? this.mapCustomerPayment(payment)
          : this.mapPayment(payment),
      ),
      meta: { page, limit, total },
    };
  }

  async findOne(
    id: string,
    userId: string,
    role: UserRole,
    category?: Category,
  ): Promise<PaymentItem> {
    this.assertPaymentReader(role, category);
    const payment = await this.prismaService.payment.findUnique({
      where: { id },
      select: { ...PAYMENT_SELECT, customerId: true },
    });

    if (
      !payment ||
      (role === UserRole.CUSTOMER && payment.customerId !== userId)
    ) {
      throw new NotFoundException(PAYMENTS_ERROR_MSG.PAYMENT_NOT_FOUND);
    }

    return this.mapPayment(payment);
  }

  async createCash(
    dto: CreatePaymentDto,
    recordedBy: string,
    role: UserRole,
    category?: Category,
  ): Promise<CreatePayment> {
    if (
      role !== UserRole.ADMIN &&
      role !== UserRole.MANAGER &&
      !(role === UserRole.STAFF && category === Category.RECEPTIONIST)
    ) {
      throw new ForbiddenException(PAYMENTS_ERROR_MSG.PAYMENT_NOT_ALLOWED);
    }

    return this.createPayment(dto, PaymentMethod.CASH, recordedBy);
  }

  async createOrder(
    bookingId: string,
    userId: string,
    role: UserRole,
    category?: Category,
    paymentId?: string,
    checkoutToken?: string,
  ): Promise<CreateOrder> {
    if (!checkoutToken) this.assertPaymentInitiator(role, category);
    const publicTokenHash = checkoutToken
      ? this.hashPublicToken(checkoutToken)
      : undefined;

    const attempt = await this.prismaService.$transaction(async (tx) => {
      await tx.$queryRaw`SELECT "id" FROM "Booking" WHERE "id" = ${bookingId} FOR UPDATE`;

      const booking = await tx.booking.findFirst({
        where: {
          id: bookingId,
          ...(publicTokenHash
            ? { customerId: null, publicCheckoutTokenHash: publicTokenHash }
            : role === UserRole.CUSTOMER
              ? { customerId: userId }
              : {}),
        },
        select: {
          id: true,
          bookingReference: true,
          customerId: true,
          status: true,
          paymentMethod: true,
          checkoutExpiresAt: true,
          invoice: {
            select: {
              id: true,
              totalAmount: true,
              status: true,
              payments: {
                where: { paymentStatus: PaymentStatus.COMPLETED },
                select: { amount: true },
              },
            },
          },
        },
      });

      if (!booking) {
        throw new NotFoundException(PAYMENTS_ERROR_MSG.BOOKING_NOT_FOUND);
      }

      if (booking.paymentMethod === PaymentMethod.CASH) {
        throw new BadRequestException(PAYMENTS_ERROR_MSG.BOOKING_NOT_PAYABLE);
      }

      this.assertBookingPayable(booking.status);
      if (
        booking.checkoutExpiresAt &&
        booking.checkoutExpiresAt <= new Date()
      ) {
        throw new BadRequestException(PAYMENTS_ERROR_MSG.CHECKOUT_EXPIRED);
      }

      if (!booking.invoice) {
        throw new NotFoundException(PAYMENTS_ERROR_MSG.INVOICE_NOT_FOUND);
      }

      if (booking.invoice.status === InvoiceStatus.REFUNDED) {
        throw new BadRequestException(PAYMENTS_ERROR_MSG.BOOKING_NOT_PAYABLE);
      }

      const completedAmount = booking.invoice.payments.reduce(
        (total, payment) => total + payment.amount,
        0,
      );
      const outstandingAmount = booking.invoice.totalAmount - completedAmount;

      if (outstandingAmount <= 0) {
        throw new BadRequestException(
          PAYMENTS_ERROR_MSG.NO_OUTSTANDING_BALANCE,
        );
      }

      const currentAttempt = await tx.payment.findFirst({
        where: {
          ...(paymentId && { id: paymentId }),
          bookingId,
          paymentMethod: PaymentMethod.ONLINE,
          paymentStatus: { in: [PaymentStatus.PENDING, PaymentStatus.FAILED] },
        },
        orderBy: { createdAt: 'desc' },
        select: {
          id: true,
          paymentReference: true,
          amount: true,
          amountPaise: true,
          currency: true,
          orderId: true,
          paymentStatus: true,
        },
      });

      if (paymentId && !currentAttempt) {
        throw new NotFoundException(PAYMENTS_ERROR_MSG.PAYMENT_NOT_FOUND);
      }

      if (currentAttempt) {
        if (currentAttempt.amount !== outstandingAmount) {
          throw new ConflictException(PAYMENTS_ERROR_MSG.PAYMENT_RECONCILING);
        }

        if (currentAttempt.paymentStatus === PaymentStatus.FAILED) {
          await tx.payment.update({
            where: { id: currentAttempt.id },
            data: { paymentStatus: PaymentStatus.PENDING },
          });
        }

        return { attempt: currentAttempt, isNew: false };
      }

      const payment = await tx.payment.create({
        data: {
          paymentReference: this.createPaymentReference(),
          invoiceId: booking.invoice.id,
          bookingId: booking.id,
          customerId: booking.customerId,
          amount: outstandingAmount,
          amountPaise: outstandingAmount * 100,
          currency: 'INR',
          paymentMethod: PaymentMethod.ONLINE,
          paymentStatus: PaymentStatus.PENDING,
          recordedBy:
            role === UserRole.CUSTOMER || publicTokenHash ? null : userId,
          orderCreationStartedAt: new Date(),
        },
        select: {
          id: true,
          paymentReference: true,
          amount: true,
          amountPaise: true,
          currency: true,
          orderId: true,
          paymentStatus: true,
        },
      });

      return { attempt: payment, isNew: true };
    });

    if (attempt.attempt.orderId) {
      const order = await this.razorpay.orders.fetch(attempt.attempt.orderId);
      this.assertOrderMatchesAttempt(order, attempt.attempt);

      if (order.status === 'paid') {
        const payments = await this.razorpay.orders.fetchPayments(order.id);
        const captured = payments.items.find(
          (payment) => payment.status === 'captured' && payment.captured,
        );

        if (!captured) {
          throw new ConflictException(PAYMENTS_ERROR_MSG.PAYMENT_RECONCILING);
        }

        await this.persistGatewayPayment(attempt.attempt.id, captured);
        throw new BadRequestException(
          PAYMENTS_ERROR_MSG.NO_OUTSTANDING_BALANCE,
        );
      }

      return this.mapCreateOrder(attempt.attempt.id, order);
    }

    return this.createOrRecoverOrder(attempt.attempt, !attempt.isNew);
  }

  async createPublicOrder(
    bookingId: string,
    checkoutToken: string,
  ): Promise<CreateOrder> {
    return this.createOrder(
      bookingId,
      '',
      UserRole.CUSTOMER,
      undefined,
      undefined,
      checkoutToken,
    );
  }

  async verifyPayment(
    dto: VerifyPaymentDto,
    userId: string,
    role: UserRole,
    category?: Category,
  ): Promise<PaymentItem> {
    this.assertPaymentInitiator(role, category);

    const attempt = await this.prismaService.payment.findUnique({
      where: { id: dto.paymentId },
      select: {
        id: true,
        bookingId: true,
        customerId: true,
        amount: true,
        amountPaise: true,
        currency: true,
        orderId: true,
      },
    });

    if (
      !attempt ||
      (role === UserRole.CUSTOMER && attempt.customerId !== userId)
    ) {
      throw new NotFoundException(PAYMENTS_ERROR_MSG.PAYMENT_NOT_FOUND);
    }

    if (attempt.orderId !== dto.razorpayOrderId) {
      throw new BadRequestException(PAYMENTS_ERROR_MSG.PAYMENT_ORDER_MISMATCH);
    }

    await this.verifyGatewayPayment(dto, attempt);

    return this.findOne(attempt.id, userId, role);
  }

  async verifyPublicPayment(
    dto: VerifyPaymentDto,
    checkoutToken: string,
  ): Promise<PublicPaymentStatus> {
    const attempt = await this.prismaService.payment.findUnique({
      where: { id: dto.paymentId },
      select: {
        id: true,
        bookingId: true,
        customerId: true,
        amount: true,
        amountPaise: true,
        currency: true,
        orderId: true,
        invoice: {
          select: {
            booking: { select: { publicCheckoutTokenHash: true } },
          },
        },
      },
    });

    if (
      !attempt ||
      attempt.customerId !== null ||
      attempt.invoice.booking.publicCheckoutTokenHash !==
        this.hashPublicToken(checkoutToken)
    ) {
      throw new NotFoundException(PAYMENTS_ERROR_MSG.PAYMENT_NOT_FOUND);
    }

    await this.verifyGatewayPayment(dto, attempt);
    return this.getPublicPaymentStatus(dto.paymentId, checkoutToken);
  }

  async getPublicPaymentStatus(
    paymentId: string,
    checkoutToken: string,
  ): Promise<PublicPaymentStatus> {
    const payment = await this.prismaService.payment.findFirst({
      where: {
        id: paymentId,
        customerId: null,
        invoice: {
          is: {
            booking: {
              is: {
                publicCheckoutTokenHash: this.hashPublicToken(checkoutToken),
              },
            },
          },
        },
      },
      select: {
        id: true,
        paymentStatus: true,
        invoice: {
          select: {
            status: true,
            payments: {
              where: { paymentStatus: PaymentStatus.COMPLETED },
              select: { amount: true },
            },
            booking: {
              select: {
                id: true,
                bookingReference: true,
                status: true,
                totalAmount: true,
              },
            },
          },
        },
      },
    });

    if (!payment) {
      throw new NotFoundException(PAYMENTS_ERROR_MSG.PAYMENT_NOT_FOUND);
    }

    return {
      paymentId: payment.id,
      paymentStatus: payment.paymentStatus,
      invoiceStatus: payment.invoice.status,
      bookingId: payment.invoice.booking.id,
      bookingReference: payment.invoice.booking.bookingReference,
      bookingStatus: payment.invoice.booking.status,
      totalAmount: payment.invoice.booking.totalAmount,
      paidAmount: payment.invoice.payments.reduce(
        (total, completedPayment) => total + completedPayment.amount,
        0,
      ),
    };
  }

  private async verifyGatewayPayment(
    dto: VerifyPaymentDto,
    attempt: {
      id: string;
      bookingId: string;
      amount: number;
      amountPaise: number | null;
      currency: string;
      orderId: string | null;
    },
  ): Promise<void> {
    if (attempt.orderId !== dto.razorpayOrderId) {
      throw new BadRequestException(PAYMENTS_ERROR_MSG.PAYMENT_ORDER_MISMATCH);
    }

    const expectedSignature = createHmac('sha256', env.RAZORPAY_KEY_SECRET)
      .update(`${dto.razorpayOrderId}|${dto.razorpayPaymentId}`)
      .digest();
    const receivedSignature = Buffer.from(dto.razorpaySignature, 'hex');

    if (
      receivedSignature.length !== expectedSignature.length ||
      !timingSafeEqual(receivedSignature, expectedSignature)
    ) {
      throw new BadRequestException(
        PAYMENTS_ERROR_MSG.PAYMENT_SIGNATURE_INVALID,
      );
    }

    const gatewayPayment = await this.razorpay.payments.fetch(
      dto.razorpayPaymentId,
    );
    this.assertPaymentMatchesAttempt(gatewayPayment, attempt);
    await this.persistGatewayPayment(attempt.id, gatewayPayment);
  }

  async handleWebhook(
    rawBody: Buffer,
    signature: string,
    eventId: string,
  ): Promise<void> {
    const expectedSignature = createHmac('sha256', env.RAZORPAY_WEBHOOK_SECRET)
      .update(rawBody)
      .digest();
    const receivedSignature = Buffer.from(signature, 'hex');

    if (
      receivedSignature.length !== expectedSignature.length ||
      !timingSafeEqual(receivedSignature, expectedSignature)
    ) {
      throw new BadRequestException(
        PAYMENTS_ERROR_MSG.WEBHOOK_SIGNATURE_INVALID,
      );
    }

    let body: unknown;
    try {
      body = JSON.parse(rawBody.toString('utf8')) as unknown;
    } catch {
      throw new BadRequestException(PAYMENTS_ERROR_MSG.WEBHOOK_EVENT_INVALID);
    }

    const parsedBody = RazorpayWebhookSchema.safeParse(body);
    if (!parsedBody.success) {
      throw new BadRequestException(PAYMENTS_ERROR_MSG.WEBHOOK_EVENT_INVALID);
    }

    const eventType = parsedBody.data.event;
    const eventPayment = parsedBody.data.payload.payment?.entity;
    if (eventType !== 'payment.captured' && eventType !== 'payment.failed') {
      await this.persistWebhookEvent(eventId, eventType, null, null);
      return;
    }

    if (!eventPayment) {
      throw new BadRequestException(PAYMENTS_ERROR_MSG.WEBHOOK_EVENT_INVALID);
    }

    const gatewayPayment = await this.razorpay.payments.fetch(eventPayment.id);
    if (gatewayPayment.order_id !== eventPayment.order_id) {
      throw new BadRequestException(PAYMENTS_ERROR_MSG.PAYMENT_ORDER_MISMATCH);
    }

    if (
      eventType === 'payment.captured' &&
      (gatewayPayment.status !== 'captured' || !gatewayPayment.captured)
    ) {
      throw new ConflictException(PAYMENTS_ERROR_MSG.PAYMENT_RECONCILING);
    }

    let attempt = await this.prismaService.payment.findUnique({
      where: { orderId: gatewayPayment.order_id },
      select: {
        id: true,
        amount: true,
        amountPaise: true,
        currency: true,
        orderId: true,
      },
    });

    if (!attempt) {
      const order = await this.razorpay.orders.fetch(gatewayPayment.order_id);
      const paymentId = order.notes?.paymentId;

      if (typeof paymentId !== 'string') {
        throw new NotFoundException(PAYMENTS_ERROR_MSG.PAYMENT_NOT_FOUND);
      }

      const unlinkedAttempt = await this.prismaService.payment.findUnique({
        where: { id: paymentId },
        select: {
          id: true,
          amount: true,
          amountPaise: true,
          currency: true,
          orderId: true,
        },
      });

      if (!unlinkedAttempt) {
        throw new NotFoundException(PAYMENTS_ERROR_MSG.PAYMENT_NOT_FOUND);
      }

      this.assertOrderMatchesAttempt(order, unlinkedAttempt);
      await this.attachOrder(unlinkedAttempt.id, order);
      attempt = { ...unlinkedAttempt, orderId: order.id };
    }

    this.assertPaymentMatchesAttempt(gatewayPayment, attempt);

    try {
      await this.prismaService.$transaction(async (tx) => {
        await tx.paymentWebhookEvent.create({
          data: {
            eventId,
            eventType,
            orderId: gatewayPayment.order_id,
            gatewayPaymentId: gatewayPayment.id,
          },
        });

        await this.persistGatewayPayment(attempt.id, gatewayPayment, tx);
      });
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2002'
      ) {
        const existingEvent =
          await this.prismaService.paymentWebhookEvent.findUnique({
            where: { eventId },
            select: { id: true },
          });

        if (existingEvent) return;
      }

      throw error;
    }
  }

  async refund(id: string): Promise<void> {
    try {
      await this.prismaService.$transaction(async (tx) => {
        const payment = await tx.payment.findUnique({
          where: { id },
          select: { id: true, invoiceId: true, paymentStatus: true },
        });

        if (!payment) {
          throw new NotFoundException(PAYMENTS_ERROR_MSG.PAYMENT_NOT_FOUND);
        }

        if (payment.paymentStatus !== PaymentStatus.COMPLETED) {
          throw new BadRequestException(
            PAYMENTS_ERROR_MSG.INVALID_REFUND_STATUS,
          );
        }

        const updateResult = await tx.payment.updateMany({
          where: { id, paymentStatus: PaymentStatus.COMPLETED },
          data: { paymentStatus: PaymentStatus.REFUNDED },
        });

        if (updateResult.count !== 1) {
          throw new ConflictException(PAYMENTS_ERROR_MSG.PAYMENT_CHANGED);
        }

        const completedPayments = await tx.payment.aggregate({
          where: {
            invoiceId: payment.invoiceId,
            paymentStatus: PaymentStatus.COMPLETED,
          },
          _sum: { amount: true },
        });
        const completedAmount = completedPayments._sum.amount ?? 0;
        const invoice = await tx.invoice.findUnique({
          where: { id: payment.invoiceId },
          select: { totalAmount: true },
        });

        if (!invoice) {
          throw new NotFoundException(PAYMENTS_ERROR_MSG.INVOICE_NOT_FOUND);
        }

        await tx.invoice.update({
          where: { id: payment.invoiceId },
          data: {
            status:
              completedAmount === 0
                ? InvoiceStatus.REFUNDED
                : completedAmount >= invoice.totalAmount
                  ? InvoiceStatus.PAID
                  : InvoiceStatus.PARTIALLY_PAID,
          },
        });
      });
    } catch (error) {
      this.handlePrismaConflict(error);
    }
  }

  private async createPayment(
    dto: CreatePaymentDto,
    paymentMethod: PaymentMethod,
    recordedBy: string | null,
    customerId?: string,
  ): Promise<CreatePayment> {
    try {
      return await this.prismaService.$transaction(async (tx) => {
        const invoiceRef = await tx.invoice.findUnique({
          where: { id: dto.invoiceId },
          select: { bookingId: true },
        });

        if (!invoiceRef) {
          throw new NotFoundException(PAYMENTS_ERROR_MSG.INVOICE_NOT_FOUND);
        }

        await tx.$queryRaw`SELECT "id" FROM "Booking" WHERE "id" = ${invoiceRef.bookingId} FOR UPDATE`;

        const invoice = await tx.invoice.findUnique({
          where: { id: dto.invoiceId },
          select: {
            id: true,
            bookingId: true,
            customerId: true,
            totalAmount: true,
            status: true,
            booking: {
              select: {
                id: true,
                status: true,
                paymentMethod: true,
                bookingRoom: { select: { assignedRoomId: true } },
              },
            },
          },
        });

        if (!invoice || (customerId && invoice.customerId !== customerId)) {
          throw new NotFoundException(PAYMENTS_ERROR_MSG.INVOICE_NOT_FOUND);
        }

        if (invoice.booking.paymentMethod !== PaymentMethod.CASH) {
          throw new BadRequestException(
            PAYMENTS_ERROR_MSG.CASH_METHOD_REQUIRED,
          );
        }

        if (
          invoice.booking.status !== BookingStatus.PENDING &&
          invoice.booking.status !== BookingStatus.CONFIRMED
        ) {
          throw new BadRequestException(PAYMENTS_ERROR_MSG.BOOKING_NOT_PAYABLE);
        }

        if (!invoice.booking.bookingRoom?.assignedRoomId) {
          throw new BadRequestException(
            'An assigned room is required before cash can be collected.',
          );
        }

        if (invoice.status === InvoiceStatus.REFUNDED) {
          throw new BadRequestException(PAYMENTS_ERROR_MSG.BOOKING_NOT_PAYABLE);
        }

        if (invoice.status === InvoiceStatus.PAID) {
          throw new BadRequestException(
            PAYMENTS_ERROR_MSG.NO_OUTSTANDING_BALANCE,
          );
        }

        const [completedPayments, activeOnlinePayment, pendingCashPayments] =
          await Promise.all([
            tx.payment.aggregate({
              where: {
                invoiceId: invoice.id,
                paymentStatus: PaymentStatus.COMPLETED,
              },
              _sum: { amount: true },
            }),
            tx.payment.findFirst({
              where: {
                invoiceId: invoice.id,
                paymentMethod: PaymentMethod.ONLINE,
                paymentStatus: PaymentStatus.PENDING,
              },
              select: { id: true },
            }),
            tx.payment.findMany({
              where: {
                invoiceId: invoice.id,
                bookingId: invoice.bookingId,
                paymentMethod: PaymentMethod.CASH,
                paymentStatus: PaymentStatus.PENDING,
              },
              orderBy: { createdAt: 'asc' },
              select: {
                id: true,
                transactionId: true,
                orderId: true,
              },
            }),
          ]);

        if (activeOnlinePayment) {
          throw new ConflictException(
            PAYMENTS_ERROR_MSG.PAYMENT_ALREADY_ACTIVE,
          );
        }

        const completedAmount = completedPayments._sum.amount ?? 0;
        if (
          invoice.totalAmount <= 0 ||
          completedAmount < 0 ||
          completedAmount > invoice.totalAmount
        ) {
          throw new BadRequestException('The invoice balance is invalid.');
        }

        const outstandingAmount = invoice.totalAmount - completedAmount;
        if (outstandingAmount <= 0) {
          throw new BadRequestException(
            PAYMENTS_ERROR_MSG.NO_OUTSTANDING_BALANCE,
          );
        }

        if (pendingCashPayments.length > 1) {
          throw new ConflictException(PAYMENTS_ERROR_MSG.PAYMENT_CHANGED);
        }

        const collectedAt = new Date();
        let payment: {
          id: string;
          paymentReference: string;
          invoiceId: string;
          amount: number;
          paymentMethod: PaymentMethod;
          paymentStatus: PaymentStatus;
          paidAt: Date | null;
        };

        const pendingCash = pendingCashPayments[0];
        if (pendingCash) {
          if (pendingCash.transactionId || pendingCash.orderId) {
            throw new ConflictException(PAYMENTS_ERROR_MSG.PAYMENT_CHANGED);
          }

          const updated = await tx.payment.updateMany({
            where: {
              id: pendingCash.id,
              invoiceId: invoice.id,
              bookingId: invoice.bookingId,
              paymentMethod: PaymentMethod.CASH,
              paymentStatus: PaymentStatus.PENDING,
              transactionId: null,
              orderId: null,
            },
            data: {
              amount: outstandingAmount,
              amountPaise: null,
              paymentStatus: PaymentStatus.COMPLETED,
              paidAt: collectedAt,
              recordedBy,
            },
          });

          if (updated.count !== 1) {
            throw new ConflictException(PAYMENTS_ERROR_MSG.PAYMENT_CHANGED);
          }

          payment = await tx.payment.findUniqueOrThrow({
            where: { id: pendingCash.id },
            select: {
              id: true,
              paymentReference: true,
              invoiceId: true,
              amount: true,
              paymentMethod: true,
              paymentStatus: true,
              paidAt: true,
            },
          });
        } else {
          payment = await tx.payment.create({
            data: {
              paymentReference: this.createPaymentReference(),
              invoiceId: invoice.id,
              bookingId: invoice.bookingId,
              customerId: invoice.customerId,
              amount: outstandingAmount,
              paymentMethod,
              paymentStatus: PaymentStatus.COMPLETED,
              paidAt: collectedAt,
              recordedBy,
            },
            select: {
              id: true,
              paymentReference: true,
              invoiceId: true,
              amount: true,
              paymentMethod: true,
              paymentStatus: true,
              paidAt: true,
            },
          });
        }

        const paidAmount = completedAmount + outstandingAmount;
        const invoiceStatus =
          paidAmount >= invoice.totalAmount
            ? InvoiceStatus.PAID
            : InvoiceStatus.PARTIALLY_PAID;

        await tx.invoice.update({
          where: { id: invoice.id },
          data: { status: invoiceStatus },
        });

        if (
          invoiceStatus === InvoiceStatus.PAID &&
          invoice.booking.status === BookingStatus.PENDING
        ) {
          const bookingUpdated = await tx.booking.updateMany({
            where: {
              id: invoice.bookingId,
              status: BookingStatus.PENDING,
              paymentMethod: PaymentMethod.CASH,
            },
            data: { status: BookingStatus.CONFIRMED, checkoutExpiresAt: null },
          });

          if (bookingUpdated.count !== 1) {
            throw new ConflictException(PAYMENTS_ERROR_MSG.PAYMENT_CHANGED);
          }
        }

        return {
          payment: {
            ...payment,
            paidAt: payment.paidAt?.toISOString() ?? null,
          },
          booking: {
            id: invoice.bookingId,
            totalAmount: invoice.totalAmount,
            paidAmount,
            balance: Math.max(invoice.totalAmount - paidAmount, 0),
          },
        };
      });
    } catch (error) {
      this.handlePrismaConflict(error);
    }
  }

  private assertPaymentInitiator(role: UserRole, category?: Category): void {
    if (
      role !== UserRole.CUSTOMER &&
      role !== UserRole.ADMIN &&
      role !== UserRole.MANAGER &&
      !(role === UserRole.STAFF && category === Category.RECEPTIONIST)
    ) {
      throw new ForbiddenException(PAYMENTS_ERROR_MSG.PAYMENT_NOT_ALLOWED);
    }
  }

  private assertPaymentReader(role: UserRole, category?: Category): void {
    if (role === UserRole.STAFF && category !== Category.RECEPTIONIST) {
      throw new ForbiddenException(PAYMENTS_ERROR_MSG.PAYMENT_NOT_ALLOWED);
    }
  }

  private assertBookingPayable(status: BookingStatus): void {
    if (
      status !== BookingStatus.PENDING &&
      status !== BookingStatus.CONFIRMED &&
      status !== BookingStatus.CHECKED_IN
    ) {
      throw new BadRequestException(PAYMENTS_ERROR_MSG.BOOKING_NOT_PAYABLE);
    }
  }

  private hashPublicToken(token: string): string {
    return createHash('sha256').update(token).digest('hex');
  }

  private assertOrderMatchesAttempt(
    order: { id: string; amount: number | string; currency: string },
    attempt: {
      amount: number;
      amountPaise: number | null;
      currency: string;
    },
  ): void {
    const expectedAmount = attempt.amountPaise ?? attempt.amount * 100;

    if (
      Number(order.amount) !== expectedAmount ||
      order.currency !== attempt.currency
    ) {
      throw new ConflictException(PAYMENTS_ERROR_MSG.PAYMENT_AMOUNT_MISMATCH);
    }
  }

  private mapCreateOrder(
    paymentId: string,
    order: { id: string; amount: number | string; currency: string },
  ): CreateOrder {
    return {
      paymentId,
      orderId: order.id,
      amount: Number(order.amount),
      currency: order.currency,
      keyId: env.RAZORPAY_KEY_ID,
    };
  }

  private async attachOrder(
    paymentId: string,
    order: { id: string; amount: number | string; currency: string },
  ): Promise<void> {
    const existing = await this.prismaService.payment.findUnique({
      where: { id: paymentId },
      select: { id: true, amount: true, amountPaise: true, currency: true },
    });

    if (!existing) {
      throw new NotFoundException(PAYMENTS_ERROR_MSG.PAYMENT_NOT_FOUND);
    }

    this.assertOrderMatchesAttempt(order, existing);
    await this.prismaService.payment.updateMany({
      where: { id: paymentId, orderId: null },
      data: {
        orderId: order.id,
        amountPaise: Number(order.amount),
        currency: order.currency,
      },
    });

    const persisted = await this.prismaService.payment.findUnique({
      where: { id: paymentId },
      select: { orderId: true },
    });

    if (persisted?.orderId !== order.id) {
      throw new ConflictException(PAYMENTS_ERROR_MSG.PAYMENT_RECONCILING);
    }
  }

  private async createOrRecoverOrder(
    attempt: {
      id: string;
      paymentReference: string;
      amount: number;
      amountPaise: number | null;
      currency: string;
    },
    recoverBeforeCreate: boolean,
  ): Promise<CreateOrder> {
    const findOrderByReceipt = async () => {
      const orders = await this.razorpay.orders.all({
        receipt: attempt.paymentReference,
      });

      return orders.items.find(
        (order) => order.receipt === attempt.paymentReference,
      );
    };

    if (recoverBeforeCreate) {
      const recoveredOrder = await findOrderByReceipt();

      if (recoveredOrder) {
        this.assertOrderMatchesAttempt(recoveredOrder, attempt);
        await this.attachOrder(attempt.id, recoveredOrder);
        return this.mapCreateOrder(attempt.id, recoveredOrder);
      }
    }

    try {
      const order = await this.razorpay.orders.create({
        amount: attempt.amountPaise ?? attempt.amount * 100,
        currency: attempt.currency,
        receipt: attempt.paymentReference,
        notes: { paymentId: attempt.id },
      });

      this.assertOrderMatchesAttempt(order, attempt);
      await this.attachOrder(attempt.id, order);
      return this.mapCreateOrder(attempt.id, order);
    } catch (error) {
      const recoveredOrder = await findOrderByReceipt();

      if (!recoveredOrder) throw error;

      this.assertOrderMatchesAttempt(recoveredOrder, attempt);
      await this.attachOrder(attempt.id, recoveredOrder);
      return this.mapCreateOrder(attempt.id, recoveredOrder);
    }
  }

  private async persistWebhookEvent(
    eventId: string,
    eventType: string,
    orderId: string | null,
    gatewayPaymentId: string | null,
  ): Promise<void> {
    try {
      await this.prismaService.paymentWebhookEvent.create({
        data: { eventId, eventType, orderId, gatewayPaymentId },
      });
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2002'
      ) {
        const existingEvent =
          await this.prismaService.paymentWebhookEvent.findUnique({
            where: { eventId },
            select: { id: true },
          });

        if (existingEvent) return;
      }

      throw error;
    }
  }

  private assertPaymentMatchesAttempt(
    gatewayPayment: GatewayPayment,
    attempt: {
      amount: number;
      amountPaise: number | null;
      currency: string;
      orderId: string | null;
    },
  ): void {
    const expectedAmount = attempt.amountPaise ?? attempt.amount * 100;

    if (
      gatewayPayment.order_id !== attempt.orderId ||
      Number(gatewayPayment.amount) !== expectedAmount ||
      gatewayPayment.currency !== attempt.currency
    ) {
      throw new BadRequestException(PAYMENTS_ERROR_MSG.PAYMENT_AMOUNT_MISMATCH);
    }
  }

  private async persistGatewayPayment(
    paymentId: string,
    gatewayPayment: GatewayPayment,
    transaction?: Prisma.TransactionClient,
  ): Promise<void> {
    if (
      gatewayPayment.status !== 'captured' &&
      gatewayPayment.status !== 'failed'
    ) {
      return;
    }

    const updatePayment = async (tx: Prisma.TransactionClient) => {
      const current = await tx.payment.findUnique({
        where: { id: paymentId },
        select: {
          id: true,
          bookingId: true,
          invoiceId: true,
          amount: true,
          amountPaise: true,
          currency: true,
          orderId: true,
          transactionId: true,
          paymentStatus: true,
        },
      });

      if (!current) {
        throw new NotFoundException(PAYMENTS_ERROR_MSG.PAYMENT_NOT_FOUND);
      }

      await tx.$queryRaw`SELECT "id" FROM "Booking" WHERE "id" = ${current.bookingId} FOR UPDATE`;
      this.assertPaymentMatchesAttempt(gatewayPayment, current);

      if (gatewayPayment.status === 'failed') {
        if (
          current.paymentStatus === PaymentStatus.COMPLETED ||
          current.paymentStatus === PaymentStatus.REFUNDED
        ) {
          return;
        }

        await tx.payment.updateMany({
          where: {
            id: current.id,
            paymentStatus: PaymentStatus.PENDING,
          },
          data: {
            paymentStatus: PaymentStatus.FAILED,
            transactionId: gatewayPayment.id,
          },
        });
        return;
      }

      if (!gatewayPayment.captured) return;
      if (current.paymentStatus === PaymentStatus.REFUNDED) return;

      if (
        current.paymentStatus === PaymentStatus.COMPLETED &&
        current.transactionId === gatewayPayment.id
      ) {
        return;
      }

      const updateResult = await tx.payment.updateMany({
        where: {
          id: current.id,
          paymentStatus: {
            in: [PaymentStatus.PENDING, PaymentStatus.FAILED],
          },
        },
        data: {
          paymentStatus: PaymentStatus.COMPLETED,
          transactionId: gatewayPayment.id,
          paidAt: new Date(gatewayPayment.created_at * 1000),
        },
      });

      if (updateResult.count !== 1) {
        const latest = await tx.payment.findUnique({
          where: { id: current.id },
          select: { paymentStatus: true, transactionId: true },
        });

        if (
          latest?.paymentStatus !== PaymentStatus.COMPLETED ||
          latest.transactionId !== gatewayPayment.id
        ) {
          throw new ConflictException(PAYMENTS_ERROR_MSG.PAYMENT_CHANGED);
        }
        return;
      }

      const [invoice, completedPayments] = await Promise.all([
        tx.invoice.findUnique({
          where: { id: current.invoiceId },
          select: { totalAmount: true },
        }),
        tx.payment.aggregate({
          where: {
            invoiceId: current.invoiceId,
            paymentStatus: PaymentStatus.COMPLETED,
          },
          _sum: { amount: true },
        }),
      ]);

      if (!invoice) {
        throw new NotFoundException(PAYMENTS_ERROR_MSG.INVOICE_NOT_FOUND);
      }

      await tx.invoice.update({
        where: { id: current.invoiceId },
        data: {
          status:
            (completedPayments._sum.amount ?? 0) >= invoice.totalAmount
              ? InvoiceStatus.PAID
              : InvoiceStatus.PARTIALLY_PAID,
        },
      });

      if ((completedPayments._sum.amount ?? 0) >= invoice.totalAmount) {
        await tx.booking.updateMany({
          where: { id: current.bookingId, status: BookingStatus.PENDING },
          data: {
            status: BookingStatus.CONFIRMED,
            checkoutExpiresAt: null,
          },
        });
      }
    };

    if (transaction) {
      await updatePayment(transaction);
      return;
    }

    await this.prismaService.$transaction(updatePayment);
  }

  private mapPayment(payment: PaymentRecord): PaymentItem {
    return {
      id: payment.id,
      bookingId: payment.bookingId,
      paymentReference: payment.paymentReference,
      transactionId: payment.transactionId,
      invoiceNumber: payment.invoice.invoiceNumber,
      bookingReference: payment.invoice.booking.bookingReference,
      customerName: payment.customer?.fullName ?? 'Guest',
      amount: payment.amount,
      paymentMethod: payment.paymentMethod,
      paymentStatus: payment.paymentStatus,
      paidAt: payment.paidAt?.toISOString() ?? null,
      recordedByName: payment.recorder?.fullName ?? null,
      createdAt: payment.createdAt.toISOString(),
    };
  }

  private mapCustomerPayment(payment: PaymentRecord): CustomerPayment {
    return {
      id: payment.id,
      bookingId: payment.bookingId,
      bookingReference: payment.invoice.booking.bookingReference,
      date: (payment.paidAt ?? payment.createdAt).toISOString(),
      invoiceNumber: payment.invoice.invoiceNumber,
      transactionId: payment.transactionId,
      amount: payment.amount,
      paymentMethod: payment.paymentMethod,
      status: payment.paymentStatus,
    };
  }

  private createPaymentReference(): string {
    return `PAY-${Date.now()}-${Math.random().toString(36).slice(2, 7).toUpperCase()}`;
  }

  private handlePrismaConflict(error: unknown): never {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === 'P2002') {
        throw new ConflictException(
          PAYMENTS_ERROR_MSG.PAYMENT_REFERENCE_CONFLICT,
        );
      }
      if (error.code === 'P2034') {
        throw new ConflictException(PAYMENTS_ERROR_MSG.PAYMENT_CHANGED);
      }
    }

    throw error;
  }
}
