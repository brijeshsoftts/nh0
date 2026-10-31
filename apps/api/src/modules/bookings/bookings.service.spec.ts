import type { PrismaService } from '../../prisma/prisma.service';
import { type Prisma, PaymentStatus } from '../../types/prisma.types';
import {
  canReserveRoomForBooking,
  syncRoomOccupancyStatus,
} from '../rooms/room-status-lifecycle';

import { BookingsService } from './bookings.service';
import { CreatePublicBookingDto } from './dto/create-public-booking.dto';

jest.mock('../rooms/room-status-lifecycle', () => ({
  canReserveRoomForBooking: jest.fn().mockResolvedValue(true),
  lockRoom: jest.fn().mockResolvedValue(undefined),
  syncRoomOccupancyStatus: jest.fn().mockResolvedValue(undefined),
}));

jest.mock('../../types/prisma.types', () => ({
  BookingStatus: {
    PENDING: 'PENDING',
    CONFIRMED: 'CONFIRMED',
    CHECKED_IN: 'CHECKED_IN',
  },
  Category: {},
  InvoiceStatus: { UNPAID: 'UNPAID' },
  OccupancyStatus: { OUT_OF_ORDER: 'OUT_OF_ORDER' },
  PaymentMethod: { ONLINE: 'ONLINE' },
  PaymentStatus: { PENDING: 'PENDING' },
  Prisma: {
    PrismaClientKnownRequestError: class PrismaClientKnownRequestError extends Error {},
  },
  TaskStatus: {},
  UserRole: {},
}));

jest.mock('../../config', () => ({
  env: { HOTEL_TIME_ZONE: 'Asia/Kolkata' },
}));

jest.mock('../../prisma/prisma.service', () => ({
  PrismaService: class PrismaService {},
}));

describe('BookingsService public checkout', () => {
  it('does not let pending bookings block room search', async () => {
    const findMany = jest.fn().mockResolvedValue([]);
    const service = new BookingsService({
      room: { findMany },
    } as unknown as PrismaService);

    await service.findAvailableRooms({
      checkInDate: new Date('2030-01-10T00:00:00.000Z'),
      checkOutDate: new Date('2030-01-12T00:00:00.000Z'),
      adults: 1,
      children: 0,
    });

    expect(findMany).toHaveBeenCalledWith(
      expect.objectContaining({
        where: expect.objectContaining({
          NOT: {
            bookingRooms: {
              some: {
                booking: expect.objectContaining({
                  status: { in: ['CONFIRMED', 'CHECKED_IN'] },
                }),
              },
            },
          },
        }),
      }),
    );
  });

  it('creates a pending payment attempt without assigning or occupying a room', async () => {
    const createBookingRoom = jest.fn();
    const createPayment = jest.fn();
    const tx = {
      booking: {
        findUnique: jest.fn().mockResolvedValue(null),
        create: jest.fn().mockResolvedValue({
          id: 'booking-id',
          bookingReference: 'BK-TEST',
          totalAmount: 2360,
        }),
      },
      room: {
        findFirst: jest.fn().mockResolvedValue({
          id: 'room-id',
          roomType: { id: 'room-type-id', maxGuests: 2, basePrice: 1000 },
        }),
      },
      bookingRoom: { create: createBookingRoom },
      bookingGuest: { createMany: jest.fn() },
      invoice: { create: jest.fn().mockResolvedValue({ id: 'invoice-id' }) },
      payment: { create: createPayment },
    } as unknown as Prisma.TransactionClient;
    const prismaService = {
      booking: { findUnique: jest.fn().mockResolvedValue(null) },
      $transaction: jest.fn(
        (callback: (client: Prisma.TransactionClient) => Promise<unknown>) =>
          callback(tx),
      ),
    } as unknown as PrismaService;
    const service = new BookingsService(prismaService);
    const dto = {
      checkoutToken: '00000000-0000-4000-8000-000000000001',
      guestName: 'Test Guest',
      guestEmail: 'guest@example.com',
      guestPhone: '+911234567890',
      roomId: 'room-id',
      checkInDate: new Date('2030-01-10T00:00:00.000Z'),
      checkOutDate: new Date('2030-01-12T00:00:00.000Z'),
      adults: 1,
      children: 0,
      guests: [{ fullName: 'Test Guest' }],
      paymentMethod: 'ONLINE',
    } as CreatePublicBookingDto;

    await service.createPublic(dto);

    expect(createBookingRoom).toHaveBeenCalledWith({
      data: expect.objectContaining({
        bookingId: 'booking-id',
        assignedRoomId: null,
      }),
    });
    expect(createPayment).toHaveBeenCalledWith({
      data: expect.objectContaining({
        paymentStatus: PaymentStatus.PENDING,
      }),
    });
    expect(syncRoomOccupancyStatus).not.toHaveBeenCalled();
    expect(canReserveRoomForBooking).toHaveBeenCalledWith(
      tx,
      expect.objectContaining({ roomId: 'room-id' }),
    );
  });
});
