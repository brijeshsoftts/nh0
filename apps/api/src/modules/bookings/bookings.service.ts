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
  OccupancyStatus,
  PaymentMethod,
  PaymentStatus,
  Prisma,
  TaskStatus,
  UserRole,
} from '../../types/prisma.types';
import { StatItem } from '../../types/shared.types';
import {
  canReserveRoomForBooking,
  lockRoom,
  syncRoomOccupancyStatus,
} from '../rooms/room-status-lifecycle';

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

const PUBLIC_BOOKING_RETRY_SELECT = {
  id: true,
  bookingReference: true,
  customerId: true,
  totalAmount: true,
  checkoutExpiresAt: true,
  guestName: true,
  guestEmail: true,
  guestPhone: true,
  checkInDate: true,
  checkOutDate: true,
  totalGuests: true,
  paymentMethod: true,
  specialRequest: true,
  bookingRoom: { select: { assignedRoomId: true } },
  bookingGuests: {
    select: {
      fullName: true,
      age: true,
      gender: true,
      idProofNumber: true,
    },
  },
} satisfies Prisma.BookingSelect;

type PublicBookingRetryRecord = Prisma.BookingGetPayload<{
  select: typeof PUBLIC_BOOKING_RETRY_SELECT;
}>;

const CUSTOMER_BOOKING_RETRY_SELECT = {
  id: true,
  bookingReference: true,
  customerId: true,
  checkInDate: true,
  checkOutDate: true,
  totalGuests: true,
  totalAmount: true,
  paymentMethod: true,
  specialRequest: true,
  bookingRoom: { select: { assignedRoomId: true } },
  bookingGuests: {
    select: {
      fullName: true,
      age: true,
      gender: true,
      idProofNumber: true,
    },
  },
  invoice: {
    select: {
      subtotal: true,
      taxAmount: true,
      payments: {
        orderBy: { createdAt: 'desc' },
        select: { paymentReference: true, paymentStatus: true },
      },
    },
  },
} satisfies Prisma.BookingSelect;

type CustomerBookingRetryRecord = Prisma.BookingGetPayload<{
  select: typeof CUSTOMER_BOOKING_RETRY_SELECT;
}>;

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
    const { search, status, invoiceStatus, paymentMethod, page, limit } = query;
    const where: Prisma.BookingWhereInput = {
      ...(role === UserRole.CUSTOMER && { customerId: userId }),
      ...(status && { status }),
      ...(paymentMethod && { paymentMethod }),
      ...(invoiceStatus && { invoice: { is: { status: invoiceStatus } } }),
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
            guestName: {
              contains: search,
              mode: 'insensitive' as const,
            },
          },
          {
            guestEmail: {
              contains: search,
              mode: 'insensitive' as const,
            },
          },
          {
            guestPhone: {
              contains: search,
              mode: 'insensitive' as const,
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
                  housekeepingTasks: {
                    where: {
                      status: {
                        in: [TaskStatus.PENDING, TaskStatus.IN_PROGRESS],
                      },
                    },
                    select: { id: true },
                    take: 1,
                  },
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
        room.housekeepingStatus === 'CLEAN' &&
        room.housekeepingTasks.length === 0;
      const canMarkNoShow =
        booking.status === BookingStatus.CONFIRMED &&
        bookingCalendarDate(booking.checkInDate) <= hotelToday;

      return {
        ...booking,
        canCheckIn,
        canMarkNoShow,
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
          checkOutDate: true,
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

        const assignedRoomId = booking.bookingRoom?.assignedRoomId;
        if (
          !assignedRoomId ||
          !(await canReserveRoomForBooking(tx, {
            roomId: assignedRoomId,
            bookingId: booking.id,
            checkInDate: booking.checkInDate,
            checkOutDate: booking.checkOutDate,
          }))
        ) {
          throw new ConflictException(
            'The assigned room is unavailable for this booking.',
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

        const canReserve = await canReserveRoomForBooking(tx, {
          roomId: assignedRoomId,
          bookingId: booking.id,
          checkInDate: booking.checkInDate,
          checkOutDate: booking.checkOutDate,
        });
        const room = await tx.room.findUnique({
          where: { id: assignedRoomId },
          select: {
            isActive: true,
            occupancyStatus: true,
            housekeepingStatus: true,
          },
        });

        if (
          !canReserve ||
          !room?.isActive ||
          room.occupancyStatus === OccupancyStatus.OUT_OF_ORDER ||
          (room.occupancyStatus !== 'VACANT' &&
            room.occupancyStatus !== 'RESERVED') ||
          room.housekeepingStatus !== 'CLEAN'
        ) {
          throw new BadRequestException(
            'The assigned room is not ready for check-in.',
          );
        }
      }

      if (
        nextStatus === BookingStatus.NO_SHOW &&
        bookingCalendarDate(booking.checkInDate) > hotelCalendarDate(timestamp)
      ) {
        throw new BadRequestException(
          'A booking cannot be marked no-show before its check-in date.',
        );
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

      const assignedRoomId = booking.bookingRoom?.assignedRoomId;
      if (assignedRoomId) {
        if (
          nextStatus === BookingStatus.CONFIRMED ||
          nextStatus === BookingStatus.CHECKED_IN ||
          nextStatus === BookingStatus.CHECKED_OUT ||
          nextStatus === BookingStatus.CANCELLED ||
          nextStatus === BookingStatus.NO_SHOW
        ) {
          await syncRoomOccupancyStatus(tx, assignedRoomId);
        }

        if (
          nextStatus === BookingStatus.CHECKED_IN ||
          nextStatus === BookingStatus.CHECKED_OUT
        ) {
          await tx.room.updateMany({
            where: { id: assignedRoomId },
            data: { housekeepingStatus: 'DIRTY' },
          });
        }
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
                housekeeperAssigns: {
                  where: { isActive: true },
                  orderBy: { updatedAt: 'desc' },
                  select: {
                    housekeeper: {
                      select: {
                        id: true,
                        fullName: true,
                        email: true,
                        phone: true,
                      },
                    },
                  },
                },
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
            assignedRoom: booking.bookingRoom.assignedRoom
              ? {
                  id: booking.bookingRoom.assignedRoom.id,
                  roomNumber: booking.bookingRoom.assignedRoom.roomNumber,
                  name: booking.bookingRoom.assignedRoom.name,
                  floor: booking.bookingRoom.assignedRoom.floor,
                  housekeepers:
                    booking.bookingRoom.assignedRoom.housekeeperAssigns.map(
                      ({ housekeeper }) => housekeeper,
                    ),
                }
              : null,
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
        occupancyStatus: { not: OccupancyStatus.OUT_OF_ORDER },
        housekeepingStatus: 'CLEAN',
        housekeepingTasks: {
          none: {
            OR: [
              { status: TaskStatus.IN_PROGRESS },
              {
                status: TaskStatus.PENDING,
                scheduledDate: { gte: startDate, lt: endDate },
              },
            ],
          },
        },
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

    if (dto.checkoutToken && role !== UserRole.CUSTOMER) {
      throw new BadRequestException(
        'Checkout tokens are only accepted for authenticated customer bookings.',
      );
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

    const checkoutTokenHash =
      role === UserRole.CUSTOMER && dto.checkoutToken
        ? createHash('sha256').update(dto.checkoutToken).digest('hex')
        : undefined;
    if (checkoutTokenHash) {
      const existingBooking = await this.prismaService.booking.findUnique({
        where: { publicCheckoutTokenHash: checkoutTokenHash },
        select: CUSTOMER_BOOKING_RETRY_SELECT,
      });
      if (existingBooking) {
        this.assertCustomerBookingRetryMatches(
          existingBooking,
          customer.id,
          dto,
        );
        return this.mapCustomerBookingRetry(existingBooking, dto.paymentMethod);
      }
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

    const createTransaction = () =>
      this.prismaService.$transaction(async (tx) => {
        await lockRoom(tx, dto.roomId);

        const roomIsBookable = await canReserveRoomForBooking(tx, {
          roomId: dto.roomId,
          checkInDate,
          checkOutDate,
        });
        if (!roomIsBookable) {
          throw new ConflictException(
            'This room is unavailable or not clean for the selected dates.',
          );
        }

        if (checkoutTokenHash) {
          const existingBooking = await tx.booking.findUnique({
            where: { publicCheckoutTokenHash: checkoutTokenHash },
            select: CUSTOMER_BOOKING_RETRY_SELECT,
          });
          if (existingBooking) {
            this.assertCustomerBookingRetryMatches(
              existingBooking,
              customer.id,
              dto,
            );
            return this.mapCustomerBookingRetry(
              existingBooking,
              dto.paymentMethod,
            );
          }
        }

        const bookedAt = new Date();
        const checkoutExpiresAt =
          role === UserRole.CUSTOMER &&
          dto.paymentMethod === PaymentMethod.ONLINE
            ? new Date(bookedAt.getTime() + 15 * 60_000)
            : null;
        const booking = await tx.booking.create({
          data: {
            bookingReference,
            customerId,
            publicCheckoutTokenHash: checkoutTokenHash,
            checkoutExpiresAt,
            checkInDate,
            checkOutDate,
            totalGuests,
            totalAmount,
            paymentMethod: dto.paymentMethod,
            specialRequest: dto.specialRequest,
            status: BookingStatus.PENDING,
            bookedAt,
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
        await syncRoomOccupancyStatus(tx, room.id);

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
            issuedAt: bookedAt,
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

    let result: Awaited<ReturnType<typeof createTransaction>>;
    try {
      result = await createTransaction();
    } catch (error) {
      if (
        checkoutTokenHash &&
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2002'
      ) {
        const duplicate = await this.prismaService.booking.findUnique({
          where: { publicCheckoutTokenHash: checkoutTokenHash },
          select: CUSTOMER_BOOKING_RETRY_SELECT,
        });
        if (duplicate) {
          this.assertCustomerBookingRetryMatches(duplicate, customer.id, dto);
          return this.mapCustomerBookingRetry(duplicate, dto.paymentMethod);
        }
      }
      throw error;
    }

    return result;
  }

  private assertCustomerBookingRetryMatches(
    booking: CustomerBookingRetryRecord,
    customerId: string,
    dto: CreateBookingDto,
  ): void {
    const normalizeGuests = (
      guests: readonly {
        fullName: string;
        age: number | null;
        gender: string | null;
        idProofNumber: string | null;
      }[],
    ) =>
      guests
        .map((guest) =>
          JSON.stringify([
            guest.fullName,
            guest.age,
            guest.gender,
            guest.idProofNumber,
          ]),
        )
        .sort()
        .join('|');

    if (
      booking.customerId !== customerId ||
      booking.paymentMethod !== dto.paymentMethod ||
      booking.checkInDate.getTime() !== dto.checkInDate.getTime() ||
      booking.checkOutDate.getTime() !== dto.checkOutDate.getTime() ||
      booking.totalGuests !== dto.adults + dto.children ||
      booking.specialRequest !== (dto.specialRequest || null) ||
      booking.bookingRoom?.assignedRoomId !== dto.roomId ||
      normalizeGuests(booking.bookingGuests) !==
        normalizeGuests(
          dto.guests.map((guest) => ({
            ...guest,
            idProofNumber: guest.idProofNumber ?? null,
          })),
        )
    ) {
      throw new ConflictException(
        'This checkout token is already associated with a different booking request.',
      );
    }
  }

  private mapCustomerBookingRetry(
    booking: CustomerBookingRetryRecord,
    paymentMethod: PaymentMethod,
  ) {
    const payment = booking.invoice?.payments[0];

    return {
      id: booking.id,
      bookingId: booking.id,
      bookingReference: booking.bookingReference,
      paymentMethod: booking.paymentMethod ?? paymentMethod,
      paymentStatus: payment?.paymentStatus ?? PaymentStatus.PENDING,
      paymentReference: payment?.paymentReference ?? null,
      subtotal: booking.invoice?.subtotal ?? 0,
      taxAmount: booking.invoice?.taxAmount ?? 0,
      amount: booking.totalAmount,
      paymentMessage: 'Payment is pending.',
    };
  }

  private buildActiveBookingWhere(
    checkInDate: Date,
    checkOutDate: Date,
  ): Prisma.BookingWhereInput {
    return {
      status: { in: [BookingStatus.CONFIRMED, BookingStatus.CHECKED_IN] },
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
      this.assertPublicBookingRetryMatches(existing, dto);
      return {
        id: existing.id,
        bookingReference: existing.bookingReference,
        totalAmount: existing.totalAmount,
        checkoutExpiresAt: existing.checkoutExpiresAt,
        checkoutToken: dto.checkoutToken,
      };
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
        await lockRoom(tx, dto.roomId);

        const existingBooking = await tx.booking.findUnique({
          where: { publicCheckoutTokenHash: tokenHash },
          select: PUBLIC_BOOKING_RETRY_SELECT,
        });
        if (existingBooking) {
          this.assertPublicBookingRetryMatches(existingBooking, dto);
          return {
            id: existingBooking.id,
            bookingReference: existingBooking.bookingReference,
            totalAmount: existingBooking.totalAmount,
            checkoutExpiresAt: existingBooking.checkoutExpiresAt,
          };
        }

        const roomIsBookable = await canReserveRoomForBooking(tx, {
          roomId: dto.roomId,
          checkInDate,
          checkOutDate,
        });
        if (!roomIsBookable) {
          throw new ConflictException(
            'This room is unavailable or not clean for the selected dates.',
          );
        }

        const room = await tx.room.findFirst({
          where: {
            id: dto.roomId,
            isActive: true,
            occupancyStatus: { not: OccupancyStatus.OUT_OF_ORDER },
            housekeepingStatus: 'CLEAN',
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

        const { subtotal, taxAmount, totalAmount } = calculateBookingTotals({
          roomPricePerNight: room.roomType.basePrice,
          nights,
        });
        const bookingReference = `BK-${Date.now()}-${Math.random().toString(36).slice(2, 6).toUpperCase()}`;
        const checkoutExpiresAt = new Date(now.getTime() + 15 * 60_000);
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
            status: BookingStatus.PENDING,
            bookedAt: now,
            createdBy: null,
          },
          select: { id: true, bookingReference: true, totalAmount: true },
        });

        await tx.bookingRoom.create({
          data: {
            bookingId: createdBooking.id,
            roomTypeId: room.roomType.id,
            assignedRoomId: null,
            pricePerNight: room.roomType.basePrice,
          },
        });
        await tx.bookingGuest.createMany({
          data: dto.guests.map((guest) => ({
            bookingId: createdBooking.id,
            fullName: guest.fullName,
            age: null,
            gender: null,
            idProofNumber: null,
          })),
        });
        const invoice = await tx.invoice.create({
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
          select: { id: true },
        });

        await tx.payment.create({
          data: {
            paymentReference: `PAY-${Date.now()}-${Math.random().toString(36).slice(2, 7).toUpperCase()}`,
            invoiceId: invoice.id,
            bookingId: createdBooking.id,
            amount: totalAmount,
            paymentMethod: PaymentMethod.ONLINE,
            paymentStatus: PaymentStatus.PENDING,
            currency: 'INR',
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
          this.assertPublicBookingRetryMatches(duplicate, dto);
          return {
            id: duplicate.id,
            bookingReference: duplicate.bookingReference,
            totalAmount: duplicate.totalAmount,
            checkoutExpiresAt: duplicate.checkoutExpiresAt,
            checkoutToken: dto.checkoutToken,
          };
        }
      }
      throw error;
    }
  }

  private findPublicBooking(tokenHash: string) {
    return this.prismaService.booking.findUnique({
      where: { publicCheckoutTokenHash: tokenHash },
      select: PUBLIC_BOOKING_RETRY_SELECT,
    });
  }

  private assertPublicBookingRetryMatches(
    booking: PublicBookingRetryRecord,
    dto: CreatePublicBookingDto,
  ): void {
    const normalizeGuests = (guests: readonly { fullName: string }[]) =>
      guests
        .map((guest) => guest.fullName.trim())
        .sort()
        .join('|');

    if (
      booking.customerId !== null ||
      booking.paymentMethod !== PaymentMethod.ONLINE ||
      booking.guestName !== dto.guestName ||
      booking.guestEmail !== dto.guestEmail ||
      booking.guestPhone !== dto.guestPhone ||
      booking.checkInDate.getTime() !== dto.checkInDate.getTime() ||
      booking.checkOutDate.getTime() !== dto.checkOutDate.getTime() ||
      booking.totalGuests !== dto.adults + dto.children ||
      booking.specialRequest !== (dto.specialRequest || null) ||
      booking.bookingRoom?.assignedRoomId !== dto.roomId ||
      normalizeGuests(booking.bookingGuests) !== normalizeGuests(dto.guests)
    ) {
      throw new ConflictException(
        'This checkout token is already associated with a different booking request.',
      );
    }
  }

  private assertBookingAccess(role: UserRole, category?: Category): void {
    if (role === UserRole.STAFF && category !== Category.RECEPTIONIST) {
      throw new ForbiddenException(
        'Booking access is restricted to reception staff.',
      );
    }
  }
}
