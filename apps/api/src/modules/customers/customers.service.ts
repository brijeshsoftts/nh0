import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { hashPassword } from '../../common/helpers';
import { uploadFile } from '../../config';
import { PrismaService } from '../../prisma/prisma.service';
import { ListResponse } from '../../types/api.types';
import {
  BookingStatus,
  InvoiceStatus,
  PaymentStatus,
  Prisma,
  UserRole,
} from '../../types/prisma.types';
import { StatItem } from '../../types/shared.types';

import { CreateCustomerDto } from './dto/create-customer.dto';
import { CustomerBookingsQueryDto } from './dto/customer-bookings-query.dto';
import { CustomersQueryDto } from './dto/customers-query.dto';
import type { PaymentsQueryDto } from '../payments/dto/payments-query.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { CUSTOMER_ERROR_MSG } from './customers.constants';
import {
  Customer,
  CustomerBookingItem,
  CustomerDetails,
  CustomerPaymentItem,
  SearchCustomer,
} from './customers.types';

export type CustomerUploadFile = {
  buffer: Buffer;
  originalname: string;
};

export type CustomerFiles = {
  idProof?: CustomerUploadFile[];
  signature?: CustomerUploadFile[];
};

const ACTIVE_BOOKING_STATUSES = [
  BookingStatus.PENDING,
  BookingStatus.CONFIRMED,
  BookingStatus.CHECKED_IN,
];

@Injectable()
export class CustomersService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(files: CustomerFiles, dto: CreateCustomerDto): Promise<void> {
    if (!files.idProof?.[0] || !files.signature?.[0]) {
      throw new BadRequestException(CUSTOMER_ERROR_MSG.DOCUMENTS_REQUIRED);
    }

    try {
      const [idProof, signature] = await Promise.all([
        uploadFile(files.idProof[0]),
        uploadFile(files.signature[0]),
      ]);
      const passwordHash = await hashPassword('Admin@1234');

      await this.prismaService.user.create({
        data: {
          fullName: dto.fullName,
          email: dto.email,
          phone: dto.phone,
          passwordHash,
          role: UserRole.CUSTOMER,
          customer: {
            create: {
              idProofNumber: dto.idProofNumber,
              address: dto.address,
              idProofImage: {
                create: { url: idProof.url, altText: idProof.name },
              },
              signatureImage: {
                create: { url: signature.url, altText: signature.name },
              },
            },
          },
        },
        select: { id: true },
      });
    } catch (error) {
      if (this.isPrismaError(error, 'P2002')) {
        throw new ConflictException(CUSTOMER_ERROR_MSG.CONFLICT_EMAIL);
      }
      throw error;
    }
  }

  async getAll(query: CustomersQueryDto): Promise<ListResponse<Customer>> {
    const { search, isActive, page, limit } = query;
    const where = {
      role: UserRole.CUSTOMER,
      softDeletedAt: null,
      ...(isActive !== undefined && { isActive }),
      ...(search && {
        OR: [
          { fullName: { contains: search, mode: 'insensitive' as const } },
          { email: { contains: search, mode: 'insensitive' as const } },
          { phone: { contains: search, mode: 'insensitive' as const } },
        ],
      }),
    };

    const [customers, total] = await this.prismaService.$transaction([
      this.prismaService.user.findMany({
        where,
        skip: (page - 1) * limit,
        take: limit,
        orderBy: { createdAt: 'desc' },
        select: {
          id: true,
          fullName: true,
          email: true,
          phone: true,
          isActive: true,
          lastLoginAt: true,
          profile: { select: { url: true, altText: true } },
          _count: {
            select: {
              bookings: {
                where: { status: { in: ACTIVE_BOOKING_STATUSES } },
              },
            },
          },
        },
      }),
      this.prismaService.user.count({ where }),
    ]);

    const bookingsByCustomer = customers.length
      ? await this.prismaService.booking.groupBy({
          by: ['customerId'],
          where: { customerId: { in: customers.map(({ id }) => id) } },
          _count: { _all: true },
          _sum: { totalAmount: true },
        })
      : [];
    const bookingStats = new Map(
      bookingsByCustomer.map((booking) => [booking.customerId, booking]),
    );

    return {
      data: customers.map((customer): Customer => {
        const stats = bookingStats.get(customer.id);

        return {
          id: customer.id,
          name: customer.fullName,
          email: customer.email,
          phone: customer.phone,
          totalBookings: stats?._count._all ?? 0,
          activeBooking: customer._count.bookings > 0,
          totalSpent: stats?._sum.totalAmount ?? 0,
          ...(customer.lastLoginAt && {
            lastLogin: customer.lastLoginAt.toISOString(),
          }),
          isActive: customer.isActive,
          profile: customer.profile,
        };
      }),
      meta: { page, limit, total },
    };
  }

  async getOne(id: string): Promise<CustomerDetails> {
    const customer = await this.prismaService.user.findFirst({
      where: { id, role: UserRole.CUSTOMER, softDeletedAt: null },
      select: {
        id: true,
        fullName: true,
        email: true,
        phone: true,
        isActive: true,
        createdAt: true,
        updatedAt: true,
        lastLoginAt: true,
        profile: { select: { url: true, altText: true } },
        customer: {
          select: {
            idProofNumber: true,
            address: true,
            idProofImage: {
              select: {
                url: true,
                altText: true,
              },
            },
            signatureImage: {
              select: {
                url: true,
                altText: true,
              },
            },
          },
        },
      },
    });

    if (!customer) {
      throw new NotFoundException(CUSTOMER_ERROR_MSG.NOT_FOUND);
    }
    if (!customer.customer) {
      throw new NotFoundException(CUSTOMER_ERROR_MSG.PROFILE_NOT_FOUND);
    }

    return {
      id: customer.id,
      fullName: customer.fullName,
      email: customer.email,
      phone: customer.phone,
      isActive: customer.isActive,
      createdAt: customer.createdAt,
      updatedAt: customer.updatedAt,
      lastLoginAt: customer.lastLoginAt,
      idProofNumber: customer.customer.idProofNumber,
      address: customer.customer.address,
      idProof: customer.customer.idProofImage,
      signature: customer.customer.signatureImage,
      profile: customer.profile,
    };
  }

  async getBookings(
    id: string,
    query: CustomerBookingsQueryDto,
  ): Promise<ListResponse<CustomerBookingItem>> {
    const customer = await this.prismaService.user.findFirst({
      where: { id, role: UserRole.CUSTOMER, softDeletedAt: null },
      select: { id: true },
    });

    if (!customer) {
      throw new NotFoundException(CUSTOMER_ERROR_MSG.NOT_FOUND);
    }

    const where: Prisma.BookingWhereInput = { customerId: customer.id };
    const [bookings, total] = await this.prismaService.$transaction([
      this.prismaService.booking.findMany({
        where,
        skip: (query.page - 1) * query.limit,
        take: query.limit,
        orderBy: { bookedAt: 'desc' },
        select: {
          id: true,
          bookingReference: true,
          status: true,
          checkInDate: true,
          checkOutDate: true,
          totalGuests: true,
          totalAmount: true,
          bookingRoom: {
            select: {
              assignedRoom: {
                select: { roomNumber: true, name: true },
              },
              roomType: { select: { name: true } },
            },
          },
          invoice: {
            select: {
              id: true,
              invoiceNumber: true,
              status: true,
              totalAmount: true,
              payments: {
                orderBy: { createdAt: 'desc' },
                take: 1,
                select: { paymentStatus: true },
              },
            },
          },
        },
      }),
      this.prismaService.booking.count({ where }),
    ]);

    const invoiceIds = bookings.flatMap((booking) =>
      booking.invoice ? [booking.invoice.id] : [],
    );
    const paidTotals = invoiceIds.length
      ? await this.prismaService.payment.groupBy({
          by: ['invoiceId'],
          where: {
            invoiceId: { in: invoiceIds },
            paymentStatus: PaymentStatus.COMPLETED,
          },
          _sum: { amount: true },
        })
      : [];
    const paidByInvoice = new Map(
      paidTotals.map((payment) => [
        payment.invoiceId,
        payment._sum.amount ?? 0,
      ]),
    );

    return {
      data: bookings.map((booking) => {
        const invoice = booking.invoice;
        const paidAmount = invoice ? (paidByInvoice.get(invoice.id) ?? 0) : 0;

        return {
          id: booking.id,
          bookingReference: booking.bookingReference,
          status: booking.status,
          checkInDate: booking.checkInDate.toISOString(),
          checkOutDate: booking.checkOutDate.toISOString(),
          totalGuests: booking.totalGuests,
          totalAmount: booking.totalAmount,
          bookingRoom: booking.bookingRoom
            ? {
                roomNumber:
                  booking.bookingRoom.assignedRoom?.roomNumber ?? null,
                roomName: booking.bookingRoom.assignedRoom?.name ?? null,
                roomTypeName: booking.bookingRoom.roomType.name,
              }
            : null,
          invoice: invoice
            ? {
                invoiceNumber: invoice.invoiceNumber,
                status: invoice.status,
                totalAmount: invoice.totalAmount,
                paidAmount,
                balanceDue: Math.max(invoice.totalAmount - paidAmount, 0),
                latestPaymentStatus: invoice.payments[0]?.paymentStatus ?? null,
              }
            : null,
        };
      }),
      meta: { page: query.page, limit: query.limit, total },
    };
  }

  async getPayments(
    id: string,
    query: PaymentsQueryDto,
  ): Promise<ListResponse<CustomerPaymentItem>> {
    const customer = await this.prismaService.user.findFirst({
      where: { id, role: UserRole.CUSTOMER, softDeletedAt: null },
      select: { id: true, fullName: true },
    });

    if (!customer) {
      throw new NotFoundException(CUSTOMER_ERROR_MSG.NOT_FOUND);
    }

    const where: Prisma.PaymentWhereInput = {
      invoice: {
        is: {
          booking: { is: { customerId: customer.id } },
        },
      },
      ...(query.status && { paymentStatus: query.status }),
      ...(query.paymentMethod && { paymentMethod: query.paymentMethod }),
      ...(query.search && {
        OR: [
          { paymentReference: { contains: query.search, mode: 'insensitive' } },
          { transactionId: { contains: query.search, mode: 'insensitive' } },
          {
            invoice: {
              is: {
                invoiceNumber: { contains: query.search, mode: 'insensitive' },
              },
            },
          },
          {
            invoice: {
              is: {
                booking: {
                  is: {
                    bookingReference: {
                      contains: query.search,
                      mode: 'insensitive',
                    },
                  },
                },
              },
            },
          },
        ],
      }),
    };

    const [payments, total] = await this.prismaService.$transaction([
      this.prismaService.payment.findMany({
        where,
        skip: (query.page - 1) * query.limit,
        take: query.limit,
        orderBy: [{ createdAt: 'desc' }, { id: 'desc' }],
        select: {
          id: true,
          bookingId: true,
          paymentReference: true,
          transactionId: true,
          amount: true,
          currency: true,
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
          recorder: { select: { fullName: true } },
        },
      }),
      this.prismaService.payment.count({ where }),
    ]);

    return {
      data: payments.map((payment) => ({
        id: payment.id,
        bookingId: payment.bookingId,
        paymentReference: payment.paymentReference,
        transactionId: payment.transactionId,
        invoiceNumber: payment.invoice.invoiceNumber,
        bookingReference: payment.invoice.booking.bookingReference,
        customerName: customer.fullName,
        amount: payment.amount,
        currency: payment.currency,
        paymentMethod: payment.paymentMethod,
        paymentStatus: payment.paymentStatus,
        paidAt: payment.paidAt?.toISOString() ?? null,
        recordedByName: payment.recorder?.fullName ?? null,
        createdAt: payment.createdAt.toISOString(),
      })),
      meta: { page: query.page, limit: query.limit, total },
    };
  }

  async update(
    id: string,
    dto: UpdateCustomerDto,
    files: CustomerFiles = {},
  ): Promise<void> {
    const customer = await this.prismaService.user.findFirst({
      where: { id, role: UserRole.CUSTOMER, softDeletedAt: null },
      select: { id: true, customer: { select: { id: true } } },
    });

    if (!customer) {
      throw new NotFoundException(CUSTOMER_ERROR_MSG.NOT_FOUND);
    }
    if (!customer.customer) {
      throw new NotFoundException(CUSTOMER_ERROR_MSG.PROFILE_NOT_FOUND);
    }

    try {
      const [idProof, signature] = await Promise.all([
        files.idProof?.[0] ? uploadFile(files.idProof[0]) : undefined,
        files.signature?.[0] ? uploadFile(files.signature[0]) : undefined,
      ]);

      await this.prismaService.$transaction(async (tx) => {
        const [idProofImage, signatureImage] = await Promise.all([
          idProof
            ? tx.image.create({
                data: { url: idProof.url, altText: idProof.name },
                select: { id: true },
              })
            : undefined,
          signature
            ? tx.image.create({
                data: { url: signature.url, altText: signature.name },
                select: { id: true },
              })
            : undefined,
        ]);

        await tx.user.update({
          where: { id },
          data: {
            ...(dto.fullName !== undefined && { fullName: dto.fullName }),
            ...(dto.email !== undefined && { email: dto.email }),
            ...(dto.phone !== undefined && { phone: dto.phone }),
            customer: {
              update: {
                ...(dto.idProofNumber !== undefined && {
                  idProofNumber: dto.idProofNumber,
                }),
                ...(dto.address !== undefined && { address: dto.address }),
                ...(idProofImage && {
                  idProofImage: { connect: { id: idProofImage.id } },
                }),
                ...(signatureImage && {
                  signatureImage: { connect: { id: signatureImage.id } },
                }),
              },
            },
          },
          select: { id: true },
        });
      });
    } catch (error) {
      if (this.isPrismaError(error, 'P2002')) {
        throw new ConflictException(CUSTOMER_ERROR_MSG.CONFLICT_EMAIL);
      }
      if (this.isPrismaError(error, 'P2025')) {
        throw new NotFoundException(CUSTOMER_ERROR_MSG.NOT_FOUND);
      }
      throw error;
    }
  }

  async updateStatus(
    id: string,
    isActive: boolean,
  ): Promise<{ id: string; isActive: boolean }> {
    const customer = await this.prismaService.user.findFirst({
      where: { id, role: UserRole.CUSTOMER, softDeletedAt: null },
      select: { id: true, isActive: true },
    });

    if (!customer) {
      throw new NotFoundException(CUSTOMER_ERROR_MSG.NOT_FOUND);
    }

    const updated = await this.prismaService.user.update({
      where: { id },
      data: { isActive },
      select: { id: true, isActive: true },
    });

    return updated;
  }

  async delete(id: string): Promise<void> {
    const result = await this.prismaService.user.updateMany({
      where: { id, role: UserRole.CUSTOMER, softDeletedAt: null },
      data: { isActive: false, softDeletedAt: new Date() },
    });

    if (result.count === 0) {
      throw new NotFoundException(CUSTOMER_ERROR_MSG.NOT_FOUND);
    }
  }

  async getStats(): Promise<StatItem[]> {
    const customerFilter = {
      role: UserRole.CUSTOMER,
      softDeletedAt: null,
    };
    const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
    const [total, active, withActiveBooking, newCustomers] = await Promise.all([
      this.prismaService.user.count({ where: customerFilter }),
      this.prismaService.user.count({
        where: { ...customerFilter, isActive: true },
      }),
      this.prismaService.user.count({
        where: {
          ...customerFilter,
          bookings: { some: { status: { in: ACTIVE_BOOKING_STATUSES } } },
        },
      }),
      this.prismaService.user.count({
        where: {
          ...customerFilter,
          createdAt: { gte: thirtyDaysAgo },
        },
      }),
    ]);

    return [
      {
        id: 'total-customer',
        icon: 'Users',
        title: 'Total Customers',
        value: total.toLocaleString(),
        description: 'Registered customer accounts',
        tone: 'gold',
      },
      {
        id: 'active-customer',
        icon: 'UserCheck',
        title: 'Active Customers',
        value: active.toLocaleString(),
        description: 'Accounts currently active',
        tone: 'emerald',
      },
      {
        id: 'customers-with-active-bookings',
        icon: 'CalendarCheck',
        title: 'With Active Bookings',
        value: withActiveBooking.toLocaleString(),
        description: 'Pending, confirmed, or checked in',
        tone: 'sky',
      },
      {
        id: 'new-customer',
        icon: 'UserPlus',
        title: 'New This Month',
        value: newCustomers.toLocaleString(),
        description: 'Joined in the last 30 days',
        tone: 'violet',
      },
    ];
  }

  async search(q?: string): Promise<SearchCustomer[]> {
    const search = q?.trim();

    return this.prismaService.user.findMany({
      where: {
        role: UserRole.CUSTOMER,
        softDeletedAt: null,
        ...(search && {
          OR: [
            { fullName: { contains: search, mode: 'insensitive' } },
            { email: { contains: search, mode: 'insensitive' } },
            { phone: { contains: search, mode: 'insensitive' } },
          ],
        }),
      },
      select: { id: true, fullName: true, email: true, phone: true },
      take: 20,
      orderBy: { fullName: 'asc' },
    });
  }

  private isPrismaError(error: unknown, code: string): boolean {
    return (
      typeof error === 'object' &&
      error !== null &&
      'code' in error &&
      error.code === code
    );
  }
}
