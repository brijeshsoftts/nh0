import { createHash } from 'node:crypto';

import {
  BadRequestException,
  ConflictException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

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

import { BookingAvailabilityQueryDto } from './dto/available-rooms-query.dto';
import { BookingsQueryDto } from './dto/bookings-query.dto';
import { CreateBookingDto } from './dto/create-booking.dto';
import { CreatePublicBookingDto } from './dto/create-public-booking.dto';
import {
  BookingDetails,
  BookingListItem,
  CustomerBooking,
  CustomerBookingDetails,
} from './bookings.types';

export type BookingTotalsInput = {
  roomPricePerNight: number;
  nights: number;
  taxRate?: number;
};

export function calculateBookingTotals({
  roomPricePerNight,
  nights,
  taxRate = 0.18,
}: BookingTotalsInput) {
  const subtotal = roomPricePerNight * nights;
  const taxAmount = Math.round(subtotal * taxRate);
  const totalAmount = subtotal + taxAmount;

  return {
    subtotal,
    taxAmount,
    totalAmount,
  };
}

function hotelCalendarDate(date: Date): string {
  const parts = new Intl.DateTimeFormat('en', {
    timeZone: env.HOTEL_TIME_ZONE,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).formatToParts(date);
  const values: Partial<Record<'year' | 'month' | 'day', string>> = {};

  for (const part of parts) {
    if (part.type === 'year' || part.type === 'month' || part.type === 'day') {
      values[part.type] = part.value;
    }
  }

  return `${values.year}-${values.month}-${values.day}`;
}

function bookingCalendarDate(date: Date): string {
  return date.toISOString().slice(0, 10);
}

@Injectable()
export class BookingsService {
  constructor(private readonly prismaService: PrismaService) {}

  async getStats(
    userId: string,
    role: UserRole,
    category?: Category,
  ): Promise<StatItem[]> {
    this.assertBookingAccess(role, category);
    const where: Prisma.BookingWhereInput = {
      ...(role === UserRole.CUSTOMER && { customerId: userId }),
    };

    const [statusGroups, revenue] = await Promise.all([
      this.prismaService.booking.groupBy({
        by: ['status'],
        where,
        _count: { _all: true },
      }),
      this.prismaService.booking.aggregate({
        where: {
          ...where,
          status: {
            notIn: [BookingStatus.CANCELLED],
          },
        },
        _sum: { totalAmount: true },
      }),
    ]);

    const countFor = (status: BookingStatus) =>
      statusGroups.find((group) => group.status === status)?._count._all ?? 0;

    const total = statusGroups.reduce(
      (count, group) => count + group._count._all,
      0,
    );

    const bookingRevenue = revenue._sum.totalAmount ?? 0;
    const formatAmount = (amount: number) =>
      `₹${amount.toLocaleString('en-IN')}`;

    return [
      {
        id: 'total-bookings',
        title: 'Total Bookings',
        value: total.toLocaleString(),
        description:
          role === UserRole.CUSTOMER
            ? 'Your total reservations'
            : 'All-time reservations',
        icon: 'CalendarCheck',
        link: 'bookings',
        tone: 'sky',
      },
      {
        id: 'confirmed-bookings',
        title: 'Confirmed',
        value: countFor(BookingStatus.CONFIRMED).toLocaleString(),
        description: 'Ready for arrival',
        icon: 'CheckCircle',
        link: 'bookings?status=confirmed',
        tone: 'emerald',
      },
      {
        id: 'pending-bookings',
        title: 'Pending',
        value: countFor(BookingStatus.PENDING).toLocaleString(),
        description: 'Awaiting confirmation',
        icon: 'Clock3',
        link: 'bookings?status=pending',
        tone: 'gold',
      },
      {
        id: 'booking-revenue',
        title: 'Booking Revenue',
        value: formatAmount(bookingRevenue),
        description:
          role === UserRole.CUSTOMER
            ? 'Total reservation spend'
            : 'Confirmed & active bookings',
        icon: 'IndianRupee',
        link: 'bookings',
        tone: 'teal',
      },
    ];
  }

  async findAll(
    query: BookingsQueryDto,
    userId: string,
    role: UserRole,
    category?: Category,
  ): Promise<ListResponse<BookingListItem | CustomerBooking>> {
    this.assertBookingAccess(role, category);
    const hotelToday = hotelCalendarDate(new Date());
    const { search, status, paymentMethod, page, limit } = query;
    const where: Prisma.BookingWhereInput = {
      ...(role === UserRole.CUSTOMER && { customerId: userId }),
      ...(status && { status }),
      ...(paymentMethod && { paymentMethod }),
      ...(search && {
        OR: [
          {
            bookingReference: {
              contains: search,
              mode: 'insensitive' as const,
            },
          },
          {
            customer: {
              is: {
                OR: [
                  {
                    fullName: {
                      contains: search,
                      mode: 'insensitive' as const,
                    },
                  },
                  { email: { contains: search, mode: 'insensitive' as const } },
                  { phone: { contains: search, mode: 'insensitive' as const } },
                ],
              },
            },
          },
          {
            bookingRoom: {
              assignedRoom: {
                is: {
                  roomNumber: {
                    contains: search,
                    mode: 'insensitive' as const,
                  },
                },
              },
            },
          },
        ],
      }),
    };

    const [bookings, total] = await this.prismaService.$transaction([
      this.prismaService.booking.findMany({
        where,
        skip: (page - 1) * limit,
        take: limit,
        orderBy: { bookedAt: 'desc' },
        select: {
          id: true,
          bookingReference: true,
          status: true,
          paymentMethod: true,
          checkInDate: true,
          checkOutDate: true,
          totalGuests: true,
          totalAmount: true,
          bookedAt: true,
          guestName: true,
          guestEmail: true,
          guestPhone: true,
          customer: {
            select: { id: true, fullName: true, email: true, phone: true },
          },
          bookingRoom: {
            select: {
              id: true,
              assignedRoom: {
                select: {
                  roomNumber: true,
                  isActive: true,
                  occupancyStatus: true,
                  housekeepingStatus: true,
                },
              },
              roomType: { select: { name: true } },
            },
          },
          invoice: {
            select: {
              id: true,
              status: true,
              totalAmount: true,
              payments: {
                where: { paymentStatus: PaymentStatus.COMPLETED },
                select: { amount: true },
              },
            },
          },
        },
      }),
      this.prismaService.booking.count({ where }),
    ]);

    const data = bookings.map((booking) => {
      if (role === UserRole.CUSTOMER) {
        const roomNumber = booking.bookingRoom?.assignedRoom?.roomNumber;

        return {
          id: booking.id,
          bookingNumber: booking.bookingReference,
          roomType: booking.bookingRoom?.roomType.name ?? '',
          ...(roomNumber ? { roomNumber } : {}),
          checkIn: booking.checkInDate.toISOString(),
          checkOut: booking.checkOutDate.toISOString(),
          totalAmount: booking.totalAmount,
          status: booking.status,
          invoice: booking.invoice
            ? { id: booking.invoice.id, status: booking.invoice.status }
            : null,
        } satisfies CustomerBooking;
      }

      const completedAmount =
        booking.invoice?.payments.reduce(
          (total, payment) => total + payment.amount,
          0,
        ) ?? 0;
      const room = booking.bookingRoom?.assignedRoom;
      const canCheckIn =
        booking.status === BookingStatus.CONFIRMED &&
        booking.invoice?.status === InvoiceStatus.PAID &&
        (booking.invoice.totalAmount ?? 0) > 0 &&
        completedAmount >= (booking.invoice.totalAmount ?? 0) &&
        bookingCalendarDate(booking.checkInDate) === hotelToday &&
        room?.isActive === true &&
        (room.occupancyStatus === 'VACANT' ||
          room.occupancyStatus === 'RESERVED') &&
        room.housekeepingStatus === 'CLEAN';

      return {
        ...booking,
        canCheckIn,
        customer: booking.customer ?? {
          id: booking.id,
          fullName: booking.guestName ?? 'Guest',
          email: booking.guestEmail ?? '',
          phone: booking.guestPhone ?? '',
        },
        bookingRoom: booking.bookingRoom
          ? {
              id: booking.bookingRoom.id,
              assignedRoom: room ? { roomNumber: room.roomNumber } : null,
              roomType: booking.bookingRoom.roomType,
            }
          : null,
        invoice: booking.invoice
          ? { id: booking.invoice.id, status: booking.invoice.status }
          : null,
        checkInDate: booking.checkInDate.toISOString(),
        checkOutDate: booking.checkOutDate.toISOString(),
        bookedAt: booking.bookedAt.toISOString(),
      } satisfies BookingListItem;
    });

    return {
      data,
      meta: { page, limit, total },
    };
  }

  async updateStatus(
    id: string,
    nextStatus: BookingStatus,
    role: UserRole,
    category?: Category,
  ): Promise<{ id: string; status: BookingStatus }> {
    if (
      role !== UserRole.ADMIN &&
      role !== UserRole.MANAGER &&
      !(role === UserRole.STAFF && category === Category.RECEPTIONIST)
    ) {
      throw new ForbiddenException(
        'Booking status updates are restricted to reception staff.',
      );
    }
    const allowedTransitions: Record<BookingStatus, BookingStatus[]> = {
      [BookingStatus.PENDING]: [
        BookingStatus.CONFIRMED,
        BookingStatus.CANCELLED,
        BookingStatus.NO_SHOW,
      ],
      [BookingStatus.CONFIRMED]: [
        BookingStatus.CHECKED_IN,
        BookingStatus.CANCELLED,
        BookingStatus.NO_SHOW,
      ],
      [BookingStatus.CHECKED_IN]: [BookingStatus.CHECKED_OUT],
      [BookingStatus.CHECKED_OUT]: [],
      [BookingStatus.CANCELLED]: [],
      [BookingStatus.NO_SHOW]: [],
    };

    return this.prismaService.$transaction(async (tx) => {
      await tx.$queryRaw`SELECT "id" FROM "Booking" WHERE "id" = ${id} FOR UPDATE`;

      const booking = await tx.booking.findUnique({
        where: { id },
        select: {
          id: true,
          status: true,
          checkInDate: true,
          paymentMethod: true,
          bookingRoom: { select: { assignedRoomId: true } },
          invoice: {
            select: {
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
        throw new NotFoundException('Booking not found');
      }

      if (!allowedTransitions[booking.status].includes(nextStatus)) {
        throw new BadRequestException(
          `Cannot change booking status from ${booking.status} to ${nextStatus}`,
        );
      }

      const timestamp = new Date();

      if (nextStatus === BookingStatus.CONFIRMED) {
        const totalAmount = booking.invoice?.totalAmount ?? 0;
        const paidAmount =
          booking.invoice?.payments.reduce(
            (total, payment) => total + payment.amount,
            0,
          ) ?? 0;

        if (
          !booking.invoice ||
          booking.invoice.status === InvoiceStatus.REFUNDED ||
          booking.invoice.status !== InvoiceStatus.PAID ||
          totalAmount <= 0 ||
          paidAmount < totalAmount ||
          !booking.bookingRoom?.assignedRoomId
        ) {
          throw new BadRequestException(
            'Full payment and an assigned room are required before confirmation.',
          );
        }
      }

      if (nextStatus === BookingStatus.CHECKED_IN) {
        const totalAmount = booking.invoice?.totalAmount ?? 0;
        const paidAmount =
          booking.invoice?.payments.reduce(
            (total, payment) => total + payment.amount,
            0,
          ) ?? 0;

        if (
          totalAmount <= 0 ||
          paidAmount < totalAmount ||
          booking.invoice?.status !== InvoiceStatus.PAID
        ) {
          throw new BadRequestException(
            'Full payment is required before check-in.',
          );
        }

        if (
          bookingCalendarDate(booking.checkInDate) !==
          hotelCalendarDate(timestamp)
        ) {
          throw new BadRequestException(
            'Check-in is only available on the booking check-in date.',
          );
        }

        const assignedRoomId = booking.bookingRoom?.assignedRoomId;
        if (!assignedRoomId) {
          throw new BadRequestException(
            'An assigned room is required to check in.',
          );
        }

        await tx.$queryRaw`SELECT "id" FROM "Room" WHERE "id" = ${assignedRoomId} FOR UPDATE`;
        const room = await tx.room.findUnique({
          where: { id: assignedRoomId },
          select: {
            isActive: true,
            occupancyStatus: true,
            housekeepingStatus: true,
          },
        });

        if (
          !room?.isActive ||
          (room.occupancyStatus !== 'VACANT' &&
            room.occupancyStatus !== 'RESERVED') ||
          room.housekeepingStatus !== 'CLEAN'
        ) {
          throw new BadRequestException(
            'The assigned room is not ready for check-in.',
          );
        }
      }

      const updateResult = await tx.booking.updateMany({
        where: { id, status: booking.status },
        data: {
          status: nextStatus,
          ...(nextStatus === BookingStatus.CHECKED_IN && {
            checkedInAt: timestamp,
          }),
          ...(nextStatus === BookingStatus.CHECKED_OUT && {
            checkedOutAt: timestamp,
          }),
          ...(nextStatus === BookingStatus.CANCELLED && {
            cancelledAt: timestamp,
          }),
        },
      });

      if (updateResult.count !== 1) {
        throw new ConflictException(
          'Booking status changed before this update could be applied',
        );
      }

      return { id, status: nextStatus };
    });
  }

  async findOne(
    id: string,
    userId: string,
    role: UserRole,
    category?: Category,
  ): Promise<BookingDetails | CustomerBookingDetails> {
    this.assertBookingAccess(role, category);
    if (role === UserRole.CUSTOMER) {
      const customerBooking = await this.prismaService.booking.findUnique({
        where: { id, customerId: userId },
        select: {
          id: true,
          bookingReference: true,
          status: true,
          checkInDate: true,
          checkOutDate: true,
          bookedAt: true,
          bookingRoom: {
            select: {
              assignedRoom: { select: { roomNumber: true } },
              roomType: { select: { name: true } },
            },
          },
          bookingGuests: { select: { age: true } },
        },
      });

      if (!customerBooking) {
        throw new NotFoundException('Booking not found');
      }

      const duration = Math.max(
        0,
        Math.ceil(
          (customerBooking.checkOutDate.getTime() -
            customerBooking.checkInDate.getTime()) /
            86400000,
        ),
      );
      const roomNumber = customerBooking.bookingRoom?.assignedRoom?.roomNumber;

      return {
        id: customerBooking.id,
        bookingNumber: customerBooking.bookingReference,
        status: customerBooking.status,
        roomType: customerBooking.bookingRoom?.roomType.name ?? '',
        ...(roomNumber && { roomNumber }),
        checkIn: customerBooking.checkInDate.toISOString(),
        checkOut: customerBooking.checkOutDate.toISOString(),
        duration,
        adults: customerBooking.bookingGuests.filter(
          (guest) => guest.age === null || guest.age >= 18,
        ).length,
        children: customerBooking.bookingGuests.filter(
          (guest) => guest.age !== null && guest.age < 18,
        ).length,
        bookedOn: customerBooking.bookedAt.toISOString(),
      };
    }

    const booking = await this.prismaService.booking.findUnique({
      where: { id },
      select: {
        id: true,
        bookingReference: true,
        customerId: true,
        guestName: true,
        guestEmail: true,
        guestPhone: true,
        checkInDate: true,
        checkOutDate: true,
        totalGuests: true,
        totalAmount: true,
        paymentMethod: true,
        specialRequest: true,
        status: true,
        bookedAt: true,
        checkedInAt: true,
        checkedOutAt: true,
        cancelledAt: true,
        createdBy: true,
        createdAt: true,
        updatedAt: true,
        customer: {
          select: {
            id: true,
            fullName: true,
            email: true,
            phone: true,
            profile: {
              select: {
                url: true,
                altText: true,
              },
            },
            customer: {
              select: {
                idProofNumber: true,
                address: true,
              },
            },
          },
        },
        creator: {
          select: {
            id: true,
            fullName: true,
            email: true,
            phone: true,
            profile: {
              select: {
                url: true,
                altText: true,
              },
            },
          },
        },
        bookingRoom: {
          select: {
            id: true,
            pricePerNight: true,
            assignedRoom: {
              select: {
                id: true,
                roomNumber: true,
                name: true,
                floor: true,
              },
            },
            roomType: {
              select: {
                id: true,
                name: true,
                slug: true,
                maxGuests: true,
                basePrice: true,
                currency: true,
                bedType: true,
                bedCount: true,
              },
            },
          },
        },
        bookingGuests: {
          select: {
            id: true,
            fullName: true,
            age: true,
            gender: true,
            idProofNumber: true,
          },
        },
        invoice: {
          select: {
            id: true,
            invoiceNumber: true,
            subtotal: true,
            taxAmount: true,
            discountAmount: true,
            totalAmount: true,
            status: true,
            issuedAt: true,
            payments: {
              select: {
                id: true,
                paymentReference: true,
                transactionId: true,
                amount: true,
                paymentMethod: true,
                paymentStatus: true,
                paidAt: true,
                createdAt: true,
                recorder: {
                  select: {
                    id: true,
                    fullName: true,
                  },
                },
              },
            },
          },
        },
      },
    });

    if (!booking) {
      throw new NotFoundException('Booking not found');
    }

    const customerProfile = booking.customer?.customer ?? null;

    return {
      ...booking,
      customerId: booking.customerId ?? '',
      createdBy: booking.createdBy ?? '',
      checkInDate: booking.checkInDate.toISOString(),
      checkOutDate: booking.checkOutDate.toISOString(),
      totalGuests: booking.totalGuests,
      totalAmount: booking.totalAmount,
      bookedAt: booking.bookedAt.toISOString(),
      checkedInAt: booking.checkedInAt?.toISOString() ?? null,
      checkedOutAt: booking.checkedOutAt?.toISOString() ?? null,
      cancelledAt: booking.cancelledAt?.toISOString() ?? null,
      createdAt: booking.createdAt.toISOString(),
      updatedAt: booking.updatedAt.toISOString(),
      customer: {
        id: booking.customer?.id ?? booking.id,
        fullName: booking.customer?.fullName ?? booking.guestName ?? 'Guest',
        email: booking.customer?.email ?? booking.guestEmail ?? '',
        phone: booking.customer?.phone ?? booking.guestPhone ?? '',
        profileImage: booking.customer?.profile ?? null,
        profile: customerProfile
          ? {
              idProofNumber: customerProfile.idProofNumber,
              address: customerProfile.address,
            }
          : null,
      },
      creator: {
        id: booking.creator?.id ?? '',
        fullName: booking.creator?.fullName ?? 'Guest checkout',
        email: booking.creator?.email ?? '',
        phone: booking.creator?.phone ?? '',
        profileImage: booking.creator?.profile ?? null,
      },
      bookingRoom: booking.bookingRoom
        ? {
            id: booking.bookingRoom.id,
            roomNumber: booking.bookingRoom.assignedRoom?.roomNumber ?? '',
            name: booking.bookingRoom.assignedRoom?.name ?? null,
            floor: booking.bookingRoom.assignedRoom?.floor ?? 0,
            roomType: booking.bookingRoom.roomType ?? undefined,
            pricePerNight: booking.bookingRoom.pricePerNight,
          }
        : null,
      bookingGuests: booking.bookingGuests ?? [],
      invoice: booking.invoice
        ? {
            ...booking.invoice,
            issuedAt: booking.invoice.issuedAt.toISOString(),
            payments: (booking.invoice.payments ?? []).map((payment) => {
              const { recorder, ...rest } = payment;

              return {
                ...rest,
                recordedBy: recorder ?? null,
                paidAt: payment.paidAt?.toISOString() ?? null,
                createdAt: payment.createdAt.toISOString(),
              };
            }),
          }
        : null,
    };
  }

  async findAvailableRooms(query: BookingAvailabilityQueryDto) {
    const { checkInDate, checkOutDate, adults, children } = query;
    const totalGuests = adults + children;
    const startDate = new Date(checkInDate);
    const endDate = new Date(checkOutDate);

    const rooms = await this.prismaService.room.findMany({
      where: {
        isActive: true,
        roomType: {
          isActive: true,
          maxGuests: { gte: totalGuests },
        },
        NOT: {
          bookingRooms: {
            some: {
              booking: {
                ...this.buildActiveBookingWhere(startDate, endDate),
              },
            },
          },
        },
      },
      orderBy: [{ floor: 'asc' }, { roomNumber: 'asc' }],
      select: {
        id: true,
        roomNumber: true,
        floor: true,
        name: true,
        roomType: {
          select: {
            id: true,
            name: true,
            maxGuests: true,
            basePrice: true,
            currency: true,
            bedType: true,
            bedCount: true,
            sizeSqFt: true,
            images: {
              where: { isPrimary: true },
              take: 1,
              select: { url: true, altText: true },
            },
            amenities: {
              where: { isActive: true },
              take: 4,
              select: { id: true, name: true, icon: true },
            },
          },
        },
      },
    });

    return rooms.map((room) => ({
      id: room.id,
      roomNumber: room.roomNumber,
      floor: room.floor,
      roomName: room.name,
      roomType: {
        id: room.roomType.id,
        name: room.roomType.name,
        maxGuests: room.roomType.maxGuests,
        basePrice: room.roomType.basePrice,
        currency: room.roomType.currency ?? 'INR',
        bedType: room.roomType.bedType,
        bedCount: room.roomType.bedCount,
        sizeSqFt: room.roomType.sizeSqFt,
        image: room.roomType.images[0] ?? null,
        amenities: room.roomType.amenities ?? [],
      },
    }));
  }

  async create(
    createdBy: string,
    role: UserRole,
    category: Category | undefined,
    dto: CreateBookingDto,
  ) {
    if (role === UserRole.STAFF && category !== Category.RECEPTIONIST) {
      throw new ForbiddenException('Only reception staff can create bookings.');
    }

    const customerId = role === UserRole.CUSTOMER ? createdBy : dto.customerId;
    if (!customerId) {
      throw new BadRequestException('Select a customer for this booking.');
    }

    const checkInDate = new Date(dto.checkInDate);
    const checkOutDate = new Date(dto.checkOutDate);
    const nights = Math.max(
      1,
      Math.ceil((checkOutDate.getTime() - checkInDate.getTime()) / 86400000),
    );

    const customer = await this.prismaService.user.findFirst({
      where: {
        id: customerId,
        role: UserRole.CUSTOMER,
        softDeletedAt: null,
      },
      select: { id: true, fullName: true },
    });

    if (!customer) {
      throw new NotFoundException('Customer not found');
    }

    const room = await this.prismaService.room.findUnique({
      where: { id: dto.roomId },
      select: {
        id: true,
        roomNumber: true,
        isActive: true,
        roomType: {
          select: {
            id: true,
            name: true,
            maxGuests: true,
            basePrice: true,
            currency: true,
          },
        },
      },
    });

    if (!room || !room.isActive) {
      throw new NotFoundException('Room not found');
    }

    const totalGuests = dto.adults + dto.children;
    if (totalGuests > room.roomType.maxGuests) {
      throw new BadRequestException(
        `Room capacity exceeded. Maximum allowed guests: ${room.roomType.maxGuests}`,
      );
    }

    if (dto.guests.length !== totalGuests) {
      throw new BadRequestException(
        'Guest count must match the requested adults + children count',
      );
    }

    const { subtotal, taxAmount, totalAmount } = calculateBookingTotals({
      roomPricePerNight: room.roomType.basePrice,
      nights,
      taxRate: 0.18,
    });

    const bookingReference = `BK-${Date.now()}-${Math.random().toString(36).slice(2, 6).toUpperCase()}`;
    const paymentReference = `PAY-${Date.now()}-${Math.random().toString(36).slice(2, 7).toUpperCase()}`;

    const paymentStatus = PaymentStatus.PENDING;
    const invoiceStatus = InvoiceStatus.UNPAID;

    const result = await this.prismaService.$transaction(async (tx) => {
      await tx.$queryRaw`SELECT "id" FROM "Room" WHERE "id" = ${dto.roomId} FOR UPDATE`;

      const overlappingBooking = await tx.booking.findFirst({
        where: {
          bookingRoom: { assignedRoomId: dto.roomId },
          ...this.buildActiveBookingWhere(checkInDate, checkOutDate),
        },
        select: { id: true },
      });

      if (overlappingBooking) {
        throw new ConflictException(
          'This room is no longer available for the selected dates.',
        );
      }

      const booking = await tx.booking.create({
        data: {
          bookingReference,
          customerId,
          checkInDate,
          checkOutDate,
          totalGuests,
          totalAmount,
          paymentMethod: dto.paymentMethod,
          specialRequest: dto.specialRequest,
          status: BookingStatus.PENDING,
          bookedAt: new Date(),
          createdBy,
        },
        select: { id: true, bookingReference: true },
      });

      await tx.bookingRoom.create({
        data: {
          bookingId: booking.id,
          roomTypeId: room.roomType.id,
          assignedRoomId: room.id,
          pricePerNight: room.roomType.basePrice,
        },
      });

      await tx.bookingGuest.createMany({
        data: dto.guests.map((guest) => ({
          bookingId: booking.id,
          fullName: guest.fullName,
          age: guest.age,
          gender: guest.gender,
          idProofNumber: guest.idProofNumber ?? null,
        })),
      });

      const invoice = await tx.invoice.create({
        data: {
          invoiceNumber: `INV-${Date.now()}-${Math.random().toString(36).slice(2, 6).toUpperCase()}`,
          bookingId: booking.id,
          customerId,
          subtotal,
          taxAmount,
          discountAmount: 0,
          totalAmount,
          status: invoiceStatus,
          issuedAt: new Date(),
        },
        select: { id: true },
      });

      const payment = await tx.payment.create({
        data: {
          paymentReference,
          invoiceId: invoice.id,
          bookingId: booking.id,
          customerId,
          amount: totalAmount,
          paymentMethod: dto.paymentMethod,
          paymentStatus,
          paidAt: null,
          recordedBy: null,
        },
        select: {
          paymentMethod: true,
          paymentStatus: true,
          paymentReference: true,
        },
      });

      return {
        id: booking.id,
        bookingId: booking.id,
        bookingReference: booking.bookingReference,
        paymentMethod: dto.paymentMethod,
        paymentStatus: payment?.paymentStatus ?? PaymentStatus.PENDING,
        paymentReference: payment.paymentReference,
        subtotal,
        taxAmount,
        amount: totalAmount,
        paymentMessage: 'Payment is pending.',
      };
    });

    return result;
  }

  private buildActiveBookingWhere(
    checkInDate: Date,
    checkOutDate: Date,
  ): Prisma.BookingWhereInput {
    return {
      OR: [
        {
          status: {
            in: [BookingStatus.CONFIRMED, BookingStatus.CHECKED_IN],
          },
        },
        {
          status: BookingStatus.PENDING,
          OR: [
            { checkoutExpiresAt: null },
            { checkoutExpiresAt: { gt: new Date() } },
            {
              invoice: {
                is: {
                  payments: { some: { paymentStatus: PaymentStatus.PENDING } },
                },
              },
            },
          ],
        },
      ],
      checkInDate: { lt: checkOutDate },
      checkOutDate: { gt: checkInDate },
    };
  }

  async createPublic(dto: CreatePublicBookingDto) {
    const tokenHash = createHash('sha256')
      .update(dto.checkoutToken)
      .digest('hex');
    const existing = await this.findPublicBooking(tokenHash);
    if (existing) {
      return { ...existing, checkoutToken: dto.checkoutToken };
    }

    const checkInDate = new Date(dto.checkInDate);
    const checkOutDate = new Date(dto.checkOutDate);
    const nights = Math.ceil(
      (checkOutDate.getTime() - checkInDate.getTime()) / 86400000,
    );
    const totalGuests = dto.adults + dto.children;
    const now = new Date();

    try {
      const booking = await this.prismaService.$transaction(async (tx) => {
        await tx.$queryRaw`SELECT "id" FROM "Room" WHERE "id" = ${dto.roomId} FOR UPDATE`;

        const room = await tx.room.findFirst({
          where: {
            id: dto.roomId,
            isActive: true,
            roomType: { isActive: true },
          },
          select: {
            id: true,
            roomType: {
              select: { id: true, maxGuests: true, basePrice: true },
            },
          },
        });
        if (!room) throw new NotFoundException('Room is not available.');
        if (totalGuests > room.roomType.maxGuests) {
          throw new BadRequestException('Guest count exceeds room capacity.');
        }

        const overlappingBooking = await tx.booking.findFirst({
          where: {
            bookingRoom: { assignedRoomId: room.id },
            checkInDate: { lt: checkOutDate },
            checkOutDate: { gt: checkInDate },
            OR: [
              {
                status: {
                  in: [BookingStatus.CONFIRMED, BookingStatus.CHECKED_IN],
                },
              },
              {
                status: BookingStatus.PENDING,
                OR: [
                  { checkoutExpiresAt: null },
                  { checkoutExpiresAt: { gt: now } },
                ],
              },
            ],
          },
          select: { id: true },
        });
        if (overlappingBooking) {
          throw new ConflictException(
            'This room is no longer available for the selected dates.',
          );
        }

        const { subtotal, taxAmount, totalAmount } = calculateBookingTotals({
          roomPricePerNight: room.roomType.basePrice,
          nights,
        });
        const bookingReference = `BK-${Date.now()}-${Math.random().toString(36).slice(2, 6).toUpperCase()}`;
        const checkoutExpiresAt =
          dto.paymentMethod === PaymentMethod.ONLINE
            ? new Date(now.getTime() + 15 * 60_000)
            : null;
        const createdBooking = await tx.booking.create({
          data: {
            bookingReference,
            customerId: null,
            guestName: dto.guestName,
            guestEmail: dto.guestEmail,
            guestPhone: dto.guestPhone,
            publicCheckoutTokenHash: tokenHash,
            checkoutExpiresAt,
            checkInDate,
            checkOutDate,
            totalGuests,
            totalAmount,
            paymentMethod: dto.paymentMethod,
            specialRequest: dto.specialRequest || null,
            status:
              dto.paymentMethod === PaymentMethod.CASH
                ? BookingStatus.CONFIRMED
                : BookingStatus.PENDING,
            bookedAt: now,
            createdBy: null,
          },
          select: { id: true, bookingReference: true, totalAmount: true },
        });

        await tx.bookingRoom.create({
          data: {
            bookingId: createdBooking.id,
            roomTypeId: room.roomType.id,
            assignedRoomId: room.id,
            pricePerNight: room.roomType.basePrice,
          },
        });
        await tx.bookingGuest.createMany({
          data: dto.guests.map((guest) => ({
            bookingId: createdBooking.id,
            fullName: guest.fullName,
            age: guest.age,
            gender: guest.gender,
            idProofNumber: guest.idProofNumber ?? null,
          })),
        });
        await tx.invoice.create({
          data: {
            invoiceNumber: `INV-${Date.now()}-${Math.random().toString(36).slice(2, 6).toUpperCase()}`,
            bookingId: createdBooking.id,
            customerId: null,
            subtotal,
            taxAmount,
            discountAmount: 0,
            totalAmount,
            status: InvoiceStatus.UNPAID,
            issuedAt: now,
          },
        });

        return { ...createdBooking, checkoutExpiresAt };
      });

      return { ...booking, checkoutToken: dto.checkoutToken };
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2002'
      ) {
        const duplicate = await this.findPublicBooking(tokenHash);
        if (duplicate) {
          return { ...duplicate, checkoutToken: dto.checkoutToken };
        }
      }
      throw error;
    }
  }

  private findPublicBooking(tokenHash: string) {
    return this.prismaService.booking.findUnique({
      where: { publicCheckoutTokenHash: tokenHash },
      select: {
        id: true,
        bookingReference: true,
        totalAmount: true,
        checkoutExpiresAt: true,
      },
    });
  }

  private assertBookingAccess(role: UserRole, category?: Category): void {
    if (role === UserRole.STAFF && category !== Category.RECEPTIONIST) {
      throw new ForbiddenException(
        'Booking access is restricted to reception staff.',
      );
    }
  }
}
