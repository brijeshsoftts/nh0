import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { PrismaService } from '../../prisma/prisma.service';
import { ListResponse } from '../../types/api.types';
import {
  BookingStatus,
  InvoiceStatus,
  PaymentMethod,
  PaymentStatus,
  UserRole,
} from '../../types/prisma.types';

import { BookingAvailabilityQueryDto } from './dto/available-rooms-query.dto';
import { BookingsQueryDto } from './dto/bookings-query.dto';
import { CreateBookingDto } from './dto/create-booking.dto';
import { BookingDetails, BookingListItem } from './bookings.types';

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

@Injectable()
export class BookingsService {
  constructor(private readonly prismaService: PrismaService) {}

  async findAll(
    query: BookingsQueryDto,
  ): Promise<ListResponse<BookingListItem>> {
    const { search, status, page, limit } = query;
    const where = {
      ...(status && { status }),
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
          checkInDate: true,
          checkOutDate: true,
          totalGuests: true,
          totalAmount: true,
          bookedAt: true,
          customer: {
            select: { id: true, fullName: true, email: true, phone: true },
          },
          bookingRoom: {
            select: {
              id: true,
              assignedRoom: { select: { roomNumber: true } },
              roomType: { select: { name: true } },
            },
          },
          invoice: { select: { status: true } },
        },
      }),
      this.prismaService.booking.count({ where }),
    ]);

    return {
      data: bookings.map((booking) => ({
        ...booking,
        bookingRoom: booking.bookingRoom
          ? {
              id: booking.bookingRoom.id,
              assignedRoom: booking.bookingRoom.assignedRoom,
              roomType: booking.bookingRoom.roomType,
            }
          : null,
        checkInDate: booking.checkInDate.toISOString(),
        checkOutDate: booking.checkOutDate.toISOString(),
        bookedAt: booking.bookedAt.toISOString(),
      })),
      meta: { page, limit, total },
    };
  }

  async updateStatus(
    id: string,
    nextStatus: BookingStatus,
  ): Promise<{ id: string; status: BookingStatus }> {
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
      const booking = await tx.booking.findUnique({
        where: { id },
        select: { id: true, status: true },
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

  async findOne(id: string): Promise<BookingDetails> {
    const booking = await this.prismaService.booking.findUnique({
      where: { id },
      select: {
        id: true,
        bookingReference: true,
        customerId: true,
        checkInDate: true,
        checkOutDate: true,
        totalGuests: true,
        totalAmount: true,
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
        id: booking.customer.id,
        fullName: booking.customer.fullName,
        email: booking.customer.email,
        phone: booking.customer.phone,
        profileImage: booking.customer.profile ?? null,
        profile: customerProfile
          ? {
              idProofNumber: customerProfile.idProofNumber,
              address: customerProfile.address,
            }
          : null,
      },
      creator: {
        id: booking.creator.id,
        fullName: booking.creator.fullName,
        email: booking.creator.email,
        phone: booking.creator.phone,
        profileImage: booking.creator.profile ?? null,
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
                status: {
                  in: [
                    BookingStatus.PENDING,
                    BookingStatus.CONFIRMED,
                    BookingStatus.CHECKED_IN,
                  ],
                },
                checkInDate: { lt: endDate },
                checkOutDate: { gt: startDate },
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

  async create(dto: CreateBookingDto) {
    const checkInDate = new Date(dto.checkInDate);
    const checkOutDate = new Date(dto.checkOutDate);
    const nights = Math.max(
      1,
      Math.ceil((checkOutDate.getTime() - checkInDate.getTime()) / 86400000),
    );

    const customer = await this.prismaService.user.findFirst({
      where: {
        id: dto.customerId,
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

    const overlappingBooking = await this.prismaService.booking.findFirst({
      where: {
        status: {
          in: [
            BookingStatus.PENDING,
            BookingStatus.CONFIRMED,
            BookingStatus.CHECKED_IN,
          ],
        },
        bookingRoom: {
          assignedRoomId: dto.roomId,
        },
        AND: [
          { checkInDate: { lt: checkOutDate } },
          { checkOutDate: { gt: checkInDate } },
        ],
      },
      select: { id: true },
    });

    if (overlappingBooking) {
      throw new ConflictException(
        'This room is no longer available for the selected dates',
      );
    }

    const { subtotal, taxAmount, totalAmount } = calculateBookingTotals({
      roomPricePerNight: room.roomType.basePrice,
      nights,
      taxRate: 0.18,
    });

    const bookingReference = `BK-${Date.now()}-${Math.random().toString(36).slice(2, 6).toUpperCase()}`;
    const paymentReference = `PAY-${Date.now()}-${Math.random().toString(36).slice(2, 7).toUpperCase()}`;

    const result = await this.prismaService.$transaction(async (tx) => {
      const booking = await tx.booking.create({
        data: {
          bookingReference,
          customerId: dto.customerId,
          checkInDate,
          checkOutDate,
          totalGuests,
          totalAmount,
          specialRequest: dto.specialRequest,
          status: BookingStatus.PENDING,
          bookedAt: new Date(),
          createdBy: dto.customerId,
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
          customerId: dto.customerId,
          subtotal,
          taxAmount,
          discountAmount: 0,
          totalAmount,
          status: InvoiceStatus.UNPAID,
          issuedAt: new Date(),
        },
        select: { id: true },
      });

      const paymentStatus =
        dto.paymentMethod === PaymentMethod.CASH
          ? PaymentStatus.COMPLETED
          : PaymentStatus.PENDING;

      const payment = await tx.payment.create({
        data: {
          paymentReference,
          invoiceId: invoice.id,
          bookingId: booking.id,
          customerId: dto.customerId,
          amount: totalAmount,
          paymentMethod: dto.paymentMethod,
          paymentStatus,
          paidAt: dto.paymentMethod === PaymentMethod.CASH ? new Date() : null,
          recordedBy:
            dto.paymentMethod === PaymentMethod.CASH ? dto.customerId : null,
        },
        select: {
          paymentMethod: true,
          paymentStatus: true,
          paymentReference: true,
        },
      });

      return {
        id: booking.id,
        bookingReference: booking.bookingReference,
        paymentMethod: payment.paymentMethod,
        paymentStatus: payment.paymentStatus,
        paymentReference: payment.paymentReference,
        subtotal,
        taxAmount,
        amount: totalAmount,
        paymentMessage:
          payment.paymentStatus === PaymentStatus.COMPLETED
            ? 'Cash payment recorded successfully.'
            : 'Online payment is pending confirmation.',
      };
    });

    return result;
  }
}
