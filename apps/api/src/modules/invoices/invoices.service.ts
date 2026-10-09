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
  PaymentStatus,
  Prisma,
  UserRole,
} from '../../types/prisma.types';
import { StatItem } from '../../types/shared.types';

import { InvoicesQueryDto } from './dto/invoices-query.dto';
import { UpdateInvoiceDto } from './dto/update-invoice.dto';
import { INVOICES_ERROR_MSG } from './invoices.constants';
import { InvoiceDetails, InvoiceItem, UpdateInvoice } from './invoices.types';

const INVOICE_LIST_SELECT = {
  id: true,
  invoiceNumber: true,
  totalAmount: true,
  status: true,
  issuedAt: true,
  booking: { select: { bookingReference: true } },
  customer: { select: { fullName: true } },
  payments: {
    where: { paymentStatus: PaymentStatus.COMPLETED },
    select: { amount: true },
  },
} satisfies Prisma.InvoiceSelect;

const INVOICE_DETAILS_SELECT = {
  id: true,
  invoiceNumber: true,
  subtotal: true,
  taxAmount: true,
  discountAmount: true,
  totalAmount: true,
  status: true,
  issuedAt: true,
  customer: {
    select: { id: true, fullName: true, email: true, phone: true },
  },
  booking: {
    select: {
      id: true,
      bookingReference: true,
      status: true,
      checkInDate: true,
      checkOutDate: true,
      bookingRoom: {
        select: {
          pricePerNight: true,
          roomType: { select: { name: true } },
          assignedRoom: { select: { roomNumber: true } },
        },
      },
    },
  },
  payments: {
    orderBy: { createdAt: 'desc' },
    select: {
      id: true,
      paymentReference: true,
      transactionId: true,
      amount: true,
      paymentMethod: true,
      paymentStatus: true,
      paidAt: true,
      createdAt: true,
    },
  },
} satisfies Prisma.InvoiceSelect;

type InvoiceListRecord = Prisma.InvoiceGetPayload<{
  select: typeof INVOICE_LIST_SELECT;
}>;
type InvoiceDetailsRecord = Prisma.InvoiceGetPayload<{
  select: typeof INVOICE_DETAILS_SELECT;
}>;

@Injectable()
export class InvoicesService {
  constructor(private readonly prismaService: PrismaService) {}

  async getStats(): Promise<StatItem[]> {
    const now = new Date();
    const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);
    const nextMonthStart = new Date(now.getFullYear(), now.getMonth() + 1, 1);
    const outstandingStatuses = [
      InvoiceStatus.UNPAID,
      InvoiceStatus.PARTIALLY_PAID,
    ];
    const [
      monthlyInvoices,
      paidCount,
      partialCount,
      openInvoiceTotals,
      paidOnOpenInvoices,
    ] = await Promise.all([
      this.prismaService.invoice.aggregate({
        where: { issuedAt: { gte: monthStart, lt: nextMonthStart } },
        _sum: { totalAmount: true },
      }),
      this.prismaService.invoice.count({
        where: { status: InvoiceStatus.PAID },
      }),
      this.prismaService.invoice.count({
        where: { status: InvoiceStatus.PARTIALLY_PAID },
      }),
      this.prismaService.invoice.aggregate({
        where: { status: { in: outstandingStatuses } },
        _sum: { totalAmount: true },
      }),
      this.prismaService.payment.aggregate({
        where: {
          paymentStatus: PaymentStatus.COMPLETED,
          invoice: { is: { status: { in: outstandingStatuses } } },
        },
        _sum: { amount: true },
      }),
    ]);

    const formatAmount = (amount: number) =>
      `₹${amount.toLocaleString('en-IN')}`;
    const outstandingBalance = Math.max(
      0,
      (openInvoiceTotals._sum.totalAmount ?? 0) -
        (paidOnOpenInvoices._sum.amount ?? 0),
    );

    return [
      {
        id: 'invoiced-this-month',
        icon: 'IndianRupee',
        title: 'Invoiced This Month',
        value: formatAmount(monthlyInvoices._sum.totalAmount ?? 0),
        description: 'Total invoice value issued this month',
        tone: 'gold',
      },
      {
        id: 'paid-invoices',
        icon: 'CheckCircle',
        title: 'Paid Invoices',
        value: paidCount.toLocaleString(),
        description: 'Invoices paid in full',
        tone: 'emerald',
      },
      {
        id: 'partially-paid-invoices',
        icon: 'Clock',
        title: 'Partially Paid',
        value: partialCount.toLocaleString(),
        description: 'Invoices with a remaining balance',
        tone: 'sky',
      },
      {
        id: 'outstanding-balance',
        icon: 'Wallet',
        title: 'Outstanding Balance',
        value: formatAmount(outstandingBalance),
        description: 'Balance due across open invoices',
        tone: 'rose',
      },
    ];
  }

  async findAll(
    query: InvoicesQueryDto,
    userId: string,
    role: UserRole,
  ): Promise<ListResponse<InvoiceItem>> {
    const { search, status, page, limit } = query;
    const where: Prisma.InvoiceWhereInput = {
      ...(role === UserRole.CUSTOMER && { customerId: userId }),
      ...(status && { status }),
      ...(search && {
        OR: [
          { invoiceNumber: { contains: search, mode: 'insensitive' } },
          {
            booking: {
              is: {
                bookingReference: { contains: search, mode: 'insensitive' },
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

    const [invoices, total] = await this.prismaService.$transaction([
      this.prismaService.invoice.findMany({
        where,
        select: INVOICE_LIST_SELECT,
        orderBy: { issuedAt: 'desc' },
        skip: (page - 1) * limit,
        take: limit,
      }),
      this.prismaService.invoice.count({ where }),
    ]);

    return {
      data: invoices.map((invoice) => this.mapListItem(invoice)),
      meta: { page, limit, total },
    };
  }

  async findOne(
    id: string,
    userId: string,
    role: UserRole,
  ): Promise<InvoiceDetails> {
    const invoice = await this.prismaService.invoice.findFirst({
      where: {
        id,
        ...(role === UserRole.CUSTOMER && { customerId: userId }),
      },
      select: INVOICE_DETAILS_SELECT,
    });

    if (!invoice) {
      throw new NotFoundException(INVOICES_ERROR_MSG.NOT_FOUND);
    }

    return this.mapDetails(invoice);
  }

  async update(id: string, dto: UpdateInvoiceDto): Promise<UpdateInvoice> {
    return this.prismaService.$transaction(async (tx) => {
      const invoice = await tx.invoice.findUnique({
        where: { id },
        select: {
          id: true,
          subtotal: true,
          taxAmount: true,
          discountAmount: true,
          status: true,
          payments: {
            select: { id: true, paymentStatus: true },
          },
        },
      });

      if (!invoice) {
        throw new NotFoundException(INVOICES_ERROR_MSG.NOT_FOUND);
      }

      const hasSettledPayments = invoice.payments.some(
        (payment) =>
          payment.paymentStatus === PaymentStatus.COMPLETED ||
          payment.paymentStatus === PaymentStatus.REFUNDED,
      );
      if (invoice.status !== InvoiceStatus.UNPAID || hasSettledPayments) {
        throw new ConflictException(INVOICES_ERROR_MSG.NOT_EDITABLE);
      }

      const subtotal = dto.subtotal ?? invoice.subtotal;
      const taxAmount = dto.taxAmount ?? invoice.taxAmount;
      const discountAmount = dto.discountAmount ?? invoice.discountAmount;
      const totalAmount = subtotal + taxAmount - discountAmount;

      if (totalAmount < 0) {
        throw new BadRequestException(INVOICES_ERROR_MSG.INVALID_TOTAL);
      }

      await tx.payment.updateMany({
        where: { invoiceId: id, paymentStatus: PaymentStatus.PENDING },
        data: { paymentStatus: PaymentStatus.FAILED },
      });

      const updateResult = await tx.invoice.updateMany({
        where: { id, status: InvoiceStatus.UNPAID },
        data: { subtotal, taxAmount, discountAmount, totalAmount },
      });

      if (updateResult.count !== 1) {
        throw new ConflictException(INVOICES_ERROR_MSG.CHANGED);
      }

      return { id, subtotal, taxAmount, discountAmount, totalAmount };
    });
  }

  async cancel(id: string): Promise<void> {
    await this.prismaService.$transaction(async (tx) => {
      const invoice = await tx.invoice.findUnique({
        where: { id },
        select: {
          id: true,
          status: true,
          payments: { select: { paymentStatus: true } },
        },
      });

      if (!invoice) {
        throw new NotFoundException(INVOICES_ERROR_MSG.NOT_FOUND);
      }

      if (invoice.status === InvoiceStatus.REFUNDED) {
        return;
      }

      if (
        invoice.payments.some(
          (payment) => payment.paymentStatus === PaymentStatus.COMPLETED,
        )
      ) {
        throw new ConflictException(INVOICES_ERROR_MSG.COMPLETED_PAYMENTS);
      }

      if (invoice.status !== InvoiceStatus.UNPAID) {
        throw new ConflictException(INVOICES_ERROR_MSG.CANNOT_CANCEL);
      }

      await tx.payment.updateMany({
        where: { invoiceId: id, paymentStatus: PaymentStatus.PENDING },
        data: { paymentStatus: PaymentStatus.FAILED },
      });

      const updateResult = await tx.invoice.updateMany({
        where: { id, status: InvoiceStatus.UNPAID },
        data: { status: InvoiceStatus.REFUNDED },
      });

      if (updateResult.count !== 1) {
        throw new ConflictException(INVOICES_ERROR_MSG.CHANGED);
      }
    });
  }

  private mapListItem(invoice: InvoiceListRecord): InvoiceItem {
    const paidAmount = invoice.payments.reduce(
      (total, payment) => total + payment.amount,
      0,
    );

    return {
      id: invoice.id,
      invoiceNumber: invoice.invoiceNumber,
      bookingReference: invoice.booking.bookingReference,
      customerName: invoice.customer.fullName,
      totalAmount: invoice.totalAmount,
      paidAmount,
      balanceDue: Math.max(0, invoice.totalAmount - paidAmount),
      status: invoice.status,
      issuedAt: invoice.issuedAt.toISOString(),
    };
  }

  private mapDetails(invoice: InvoiceDetailsRecord): InvoiceDetails {
    const checkIn = invoice.booking.checkInDate;
    const checkOut = invoice.booking.checkOutDate;
    const nights = Math.max(
      0,
      Math.ceil((checkOut.getTime() - checkIn.getTime()) / 86_400_000),
    );
    const roomCharge = invoice.booking.bookingRoom
      ? {
          roomType: invoice.booking.bookingRoom.roomType.name,
          roomNumber:
            invoice.booking.bookingRoom.assignedRoom?.roomNumber ?? null,
          pricePerNight: invoice.booking.bookingRoom.pricePerNight,
          nights,
          total: invoice.booking.bookingRoom.pricePerNight * nights,
        }
      : null;
    const paidAmount = invoice.payments.reduce(
      (total, payment) =>
        payment.paymentStatus === PaymentStatus.COMPLETED
          ? total + payment.amount
          : total,
      0,
    );

    return {
      id: invoice.id,
      invoiceNumber: invoice.invoiceNumber,
      status: invoice.status,
      issuedAt: invoice.issuedAt.toISOString(),
      customer: invoice.customer,
      booking: {
        id: invoice.booking.id,
        bookingReference: invoice.booking.bookingReference,
        status: invoice.booking.status,
        checkInDate: checkIn.toISOString(),
        checkOutDate: checkOut.toISOString(),
        roomCharge,
      },
      charges: {
        subtotal: invoice.subtotal,
        discountAmount: invoice.discountAmount,
        taxAmount: invoice.taxAmount,
        totalAmount: invoice.totalAmount,
      },
      payments: invoice.payments.map((payment) => ({
        ...payment,
        paidAt: payment.paidAt?.toISOString() ?? null,
        createdAt: payment.createdAt.toISOString(),
      })),
      paidAmount,
      balanceDue: Math.max(0, invoice.totalAmount - paidAmount),
    };
  }
}
