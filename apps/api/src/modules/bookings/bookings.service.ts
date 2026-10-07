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
import { BookingListItem } from './bookings.types';

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
            bookingRooms: {
              some: {
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
          bookingRooms: {
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
        checkInDate: booking.checkInDate.toISOString(),
        checkOutDate: booking.checkOutDate.toISOString(),
        bookedAt: booking.bookedAt.toISOString(),
      })),
      meta: { page, limit, total },
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
        bookingRooms: {
          some: {
            assignedRoomId: dto.roomId,
          },
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
