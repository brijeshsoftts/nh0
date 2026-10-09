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
import { BookingStatus, UserRole } from '../../types/prisma.types';
import { StatItem } from '../../types/shared.types';

import { CreateCustomerDto } from './dto/create-customer.dto';
import { CustomersQueryDto } from './dto/customers-query.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { CUSTOMER_ERROR_MSG } from './customers.constants';
import { Customer, CustomerDetails, SearchCustomer } from './customers.types';

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
