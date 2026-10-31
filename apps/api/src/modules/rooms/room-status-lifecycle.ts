import { ConflictException, NotFoundException } from '@nestjs/common';

import {
  BookingStatus,
  HousekeepingStatus,
  OccupancyStatus,
  Prisma,
  TaskStatus,
} from '../../types/prisma.types';

export async function lockRoom(
  tx: Prisma.TransactionClient,
  roomId: string,
): Promise<void> {
  await tx.$queryRaw`SELECT "id" FROM "Room" WHERE "id" = ${roomId} FOR UPDATE`;
}

export async function canReserveRoomForBooking(
  tx: Prisma.TransactionClient,
  input: {
    roomId: string;
    bookingId?: string;
    checkInDate: Date;
    checkOutDate: Date;
  },
): Promise<boolean> {
  await lockRoom(tx, input.roomId);

  const room = await tx.room.findUnique({
    where: { id: input.roomId },
    select: {
      isActive: true,
      occupancyStatus: true,
      housekeepingStatus: true,
    },
  });

  if (
    !room?.isActive ||
    room.occupancyStatus === OccupancyStatus.OUT_OF_ORDER ||
    room.housekeepingStatus !== HousekeepingStatus.CLEAN
  ) {
    return false;
  }

  const activeTask = await tx.housekeepingTask.findFirst({
    where: {
      roomId: input.roomId,
      OR: [
        { status: TaskStatus.IN_PROGRESS },
        {
          status: TaskStatus.PENDING,
          scheduledDate: {
            gte: input.checkInDate,
            lt: input.checkOutDate,
          },
        },
      ],
    },
    select: { id: true },
  });
  if (activeTask) {
    return false;
  }

  const overlappingBooking = await tx.booking.findFirst({
    where: {
      ...(input.bookingId && { id: { not: input.bookingId } }),
      bookingRoom: { assignedRoomId: input.roomId },
      checkInDate: { lt: input.checkOutDate },
      checkOutDate: { gt: input.checkInDate },
      status: { in: [BookingStatus.CONFIRMED, BookingStatus.CHECKED_IN] },
    },
    select: { id: true },
  });

  return !overlappingBooking;
}

export async function resolveRoomOccupancyStatus(
  tx: Prisma.TransactionClient,
  roomId: string,
  releaseOutOfOrder = false,
): Promise<OccupancyStatus> {
  const room = await tx.room.findUnique({
    where: { id: roomId },
    select: { occupancyStatus: true },
  });

  if (!room) {
    throw new NotFoundException('Room not found');
  }

  if (
    room.occupancyStatus === OccupancyStatus.OUT_OF_ORDER &&
    !releaseOutOfOrder
  ) {
    return OccupancyStatus.OUT_OF_ORDER;
  }

  const checkedInBooking = await tx.booking.findFirst({
    where: {
      bookingRoom: { assignedRoomId: roomId },
      status: BookingStatus.CHECKED_IN,
    },
    select: { id: true },
  });

  if (checkedInBooking) {
    return OccupancyStatus.OCCUPIED;
  }

  const now = new Date();
  const reservation = await tx.booking.findFirst({
    where: {
      bookingRoom: { assignedRoomId: roomId },
      checkOutDate: { gt: now },
      status: BookingStatus.CONFIRMED,
    },
    select: { id: true },
  });

  return reservation ? OccupancyStatus.RESERVED : OccupancyStatus.VACANT;
}

export async function syncRoomOccupancyStatus(
  tx: Prisma.TransactionClient,
  roomId: string,
): Promise<OccupancyStatus> {
  await lockRoom(tx, roomId);
  const occupancyStatus = await resolveRoomOccupancyStatus(tx, roomId);

  if (occupancyStatus !== OccupancyStatus.OUT_OF_ORDER) {
    await tx.room.updateMany({
      where: {
        id: roomId,
        occupancyStatus: { not: OccupancyStatus.OUT_OF_ORDER },
      },
      data: { occupancyStatus },
    });
  }

  return occupancyStatus;
}

export async function confirmPaidBooking(
  tx: Prisma.TransactionClient,
  bookingId: string,
): Promise<boolean> {
  const booking = await tx.booking.findUnique({
    where: { id: bookingId },
    select: {
      id: true,
      status: true,
      publicCheckoutTokenHash: true,
      checkInDate: true,
      checkOutDate: true,
      bookingRoom: { select: { assignedRoomId: true, roomTypeId: true } },
    },
  });

  if (!booking || booking.status !== BookingStatus.PENDING) {
    return false;
  }

  let roomId = booking.bookingRoom?.assignedRoomId ?? null;

  if (!roomId && booking.bookingRoom) {
    const candidates = await tx.room.findMany({
      where: {
        roomTypeId: booking.bookingRoom.roomTypeId,
        isActive: true,
        occupancyStatus: { not: OccupancyStatus.OUT_OF_ORDER },
        housekeepingStatus: HousekeepingStatus.CLEAN,
      },
      orderBy: { roomNumber: 'asc' },
      select: { id: true },
    });

    for (const candidate of candidates) {
      const available = await canReserveRoomForBooking(tx, {
        roomId: candidate.id,
        bookingId,
        checkInDate: booking.checkInDate,
        checkOutDate: booking.checkOutDate,
      });
      if (!available) continue;

      const assignment = await tx.bookingRoom.updateMany({
        where: { bookingId, assignedRoomId: null },
        data: { assignedRoomId: candidate.id },
      });
      if (assignment.count === 1) {
        roomId = candidate.id;
        break;
      }
    }
  }

  const roomCanBeReserved = roomId
    ? await canReserveRoomForBooking(tx, {
        roomId,
        bookingId,
        checkInDate: booking.checkInDate,
        checkOutDate: booking.checkOutDate,
      })
    : false;

  if (!roomId || !roomCanBeReserved) {
    if (booking.publicCheckoutTokenHash && roomId) {
      await tx.bookingRoom.updateMany({
        where: { bookingId, assignedRoomId: roomId },
        data: { assignedRoomId: null },
      });
    }
    await tx.booking.updateMany({
      where: { id: bookingId, status: BookingStatus.PENDING },
      data: { checkoutExpiresAt: null },
    });
    return false;
  }

  const result = await tx.booking.updateMany({
    where: { id: bookingId, status: BookingStatus.PENDING },
    data: {
      status: BookingStatus.CONFIRMED,
      checkoutExpiresAt: null,
    },
  });

  if (result.count !== 1) {
    return false;
  }

  await syncRoomOccupancyStatus(tx, roomId);
  return true;
}

export async function releaseRoomOutOfOrder(
  tx: Prisma.TransactionClient,
  roomId: string,
): Promise<OccupancyStatus> {
  const occupancyStatus = await resolveRoomOccupancyStatus(tx, roomId, true);

  const result = await tx.room.updateMany({
    where: { id: roomId, occupancyStatus: OccupancyStatus.OUT_OF_ORDER },
    data: { occupancyStatus },
  });

  if (result.count !== 1) {
    throw new ConflictException('Room is not out of order');
  }

  return occupancyStatus;
}
