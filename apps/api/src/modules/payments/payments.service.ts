import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { PrismaService } from '../../prisma/prisma.service';
import { ListResponse } from '../../types/api.types';
import {
  InvoiceStatus,
  PaymentMethod,
  PaymentStatus,
  Prisma,
  UserRole,
} from '../../types/prisma.types';
import { StatItem } from '../../types/shared.types';

import { CreatePaymentDto } from './dto/create-payment.dto';
import { PaymentsQueryDto } from './dto/payments-query.dto';
import { PAYMENTS_ERROR_MSG } from './payments.constants';
import { CreatePayment, PaymentItem } from './payments.types';

const PAYMENT_SELECT = {
  id: true,
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

@Injectable()
export class PaymentsService {
  constructor(private readonly prismaService: PrismaService) {}

  async getStats(): Promise<StatItem[]> {
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
  ): Promise<ListResponse<PaymentItem>> {
    const { page, limit, search, paymentStatus, paymentMethod } = query;
    const where: Prisma.PaymentWhereInput = {
      ...(role === UserRole.CUSTOMER && { customerId: userId }),
      ...(paymentStatus && { paymentStatus }),
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
      data: payments.map((payment) => this.mapPayment(payment)),
      meta: { page, limit, total },
    };
  }

  async findOne(
    id: string,
    userId: string,
    role: UserRole,
  ): Promise<PaymentItem> {
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
  ): Promise<CreatePayment> {
    return this.createPayment(dto, PaymentMethod.CASH, recordedBy);
  }

  async createOnline(
    dto: CreatePaymentDto,
    customerId: string,
  ): Promise<CreatePayment> {
    return this.createPayment(dto, PaymentMethod.ONLINE, null, customerId);
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
        const invoice = await tx.invoice.findUnique({
          where: { id: dto.invoiceId },
          select: {
            id: true,
            bookingId: true,
            customerId: true,
            totalAmount: true,
          },
        });

        if (!invoice || (customerId && invoice.customerId !== customerId)) {
          throw new NotFoundException(PAYMENTS_ERROR_MSG.INVOICE_NOT_FOUND);
        }

        const completedPayments = await tx.payment.aggregate({
          where: {
            invoiceId: invoice.id,
            paymentStatus: PaymentStatus.COMPLETED,
          },
          _sum: { amount: true },
        });
        const outstandingAmount =
          invoice.totalAmount - (completedPayments._sum.amount ?? 0);

        if (dto.amount > outstandingAmount) {
          throw new BadRequestException(
            PAYMENTS_ERROR_MSG.AMOUNT_EXCEEDS_BALANCE,
          );
        }

        const paidAt = paymentMethod === PaymentMethod.CASH ? new Date() : null;
        const payment = await tx.payment.create({
          data: {
            paymentReference: this.createPaymentReference(),
            invoiceId: invoice.id,
            bookingId: invoice.bookingId,
            customerId: invoice.customerId,
            amount: dto.amount,
            paymentMethod,
            paymentStatus:
              paymentMethod === PaymentMethod.CASH
                ? PaymentStatus.COMPLETED
                : PaymentStatus.PENDING,
            paidAt,
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

        if (payment.paymentStatus === PaymentStatus.COMPLETED) {
          const paidAmount = (completedPayments._sum.amount ?? 0) + dto.amount;
          await tx.invoice.update({
            where: { id: invoice.id },
            data: {
              status:
                paidAmount >= invoice.totalAmount
                  ? InvoiceStatus.PAID
                  : InvoiceStatus.PARTIALLY_PAID,
            },
          });
        }

        return {
          ...payment,
          paidAt: payment.paidAt?.toISOString() ?? null,
        };
      });
    } catch (error) {
      this.handlePrismaConflict(error);
    }
  }

  private mapPayment(payment: PaymentRecord): PaymentItem {
    return {
      id: payment.id,
      paymentReference: payment.paymentReference,
      transactionId: payment.transactionId,
      invoiceNumber: payment.invoice.invoiceNumber,
      bookingReference: payment.invoice.booking.bookingReference,
      customerName: payment.customer.fullName,
      amount: payment.amount,
      paymentMethod: payment.paymentMethod,
      paymentStatus: payment.paymentStatus,
      paidAt: payment.paidAt?.toISOString() ?? null,
      recordedByName: payment.recorder?.fullName ?? null,
      createdAt: payment.createdAt.toISOString(),
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
