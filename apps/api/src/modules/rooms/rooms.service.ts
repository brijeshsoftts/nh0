import {
  BadRequestException,
  ConflictException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { PrismaService } from '../../prisma/prisma.service';
import { ListResponse } from '../../types/api.types';
import {
  BookingStatus,
  Category,
  HousekeepingStatus,
  IssueStatus,
  OccupancyStatus,
  PaymentStatus,
  Prisma,
  TaskStatus,
  UserRole,
} from '../../types/prisma.types';
import { StatItem } from '../../types/shared.types';

import { CreateRoomDto } from './dto/create-room.dto';
import { RoomsLookupQueryDto } from './dto/rooms-lookup-query.dto';
import { RoomsQueryDto } from './dto/rooms-query.dto';
import { UpdateRoomDto } from './dto/update-room.dto';
import {
  lockRoom,
  releaseRoomOutOfOrder,
  resolveRoomOccupancyStatus,
} from './room-status-lifecycle';
import { ROOM_ERROR_MSG } from './rooms.constants';
import {
  CreateRoomResponse,
  HousekeeperRoomDetails,
  RoomDetailsResponse,
  RoomListItemResponse,
  RoomLookupItem,
} from './rooms.types';

@Injectable()
export class RoomsService {
  constructor(private readonly prismaService: PrismaService) {}

  async getStats(role: UserRole, category?: Category): Promise<StatItem[]> {
    if (role === UserRole.ADMIN || role === UserRole.MANAGER) {
      return this.managementStats();
    }

    if (role === UserRole.STAFF && category === Category.RECEPTIONIST) {
      return this.receptionistStats();
    }

    if (role === UserRole.STAFF && category === Category.HOUSEKEEPER) {
      return this.housekeeperStats();
    }

    throw new ForbiddenException(ROOM_ERROR_MSG.ACCESS_DENIED);
  }

  private async managementStats(): Promise<StatItem[]> {
    const [totalRooms, availableRooms, occupiedRooms, outOfOrderRooms] =
      await this.prismaService.$transaction([
        this.prismaService.room.count({ where: { isActive: true } }),
        this.prismaService.room.count({
          where: {
            isActive: true,
            occupancyStatus: OccupancyStatus.VACANT,
            housekeepingStatus: HousekeepingStatus.CLEAN,
          },
        }),
        this.prismaService.room.count({
          where: {
            isActive: true,
            occupancyStatus: OccupancyStatus.OCCUPIED,
          },
        }),
        this.prismaService.room.count({
          where: {
            isActive: true,
            occupancyStatus: OccupancyStatus.OUT_OF_ORDER,
          },
        }),
      ]);

    return [
      {
        id: 'total-rooms',
        title: 'Active rooms',
        value: String(totalRooms),
        description: 'Rooms currently in service',
        icon: 'BedDouble',
        link: 'rooms?isActive=true',
        tone: 'sky',
      },
      {
        id: 'available-rooms',
        title: 'Available rooms',
        value: String(availableRooms),
        description: 'Vacant, clean rooms ready to book',
        icon: 'DoorOpen',
        link: 'rooms?isActive=true&occupancyStatus=VACANT&housekeepingStatus=CLEAN',
        tone: 'emerald',
      },
      {
        id: 'occupied-rooms',
        title: 'Occupied rooms',
        value: String(occupiedRooms),
        description: 'Rooms with guests in house',
        icon: 'Users',
        link: 'rooms?isActive=true&occupancyStatus=OCCUPIED',
        tone: 'gold',
      },
      {
        id: 'out-of-order-rooms',
        title: 'Out of order',
        value: String(outOfOrderRooms),
        description: 'Rooms unavailable for booking',
        icon: 'Wrench',
        link: 'rooms?isActive=true&occupancyStatus=OUT_OF_ORDER',
        tone: 'rose',
      },
    ];
  }

  private async receptionistStats(): Promise<StatItem[]> {
    const [availableRooms, reservedRooms, occupiedRooms, outOfOrderRooms] =
      await this.prismaService.$transaction([
        this.prismaService.room.count({
          where: {
            isActive: true,
            occupancyStatus: OccupancyStatus.VACANT,
            housekeepingStatus: HousekeepingStatus.CLEAN,
          },
        }),
        this.prismaService.room.count({
          where: {
            isActive: true,
            occupancyStatus: OccupancyStatus.RESERVED,
          },
        }),
        this.prismaService.room.count({
          where: {
            isActive: true,
            occupancyStatus: OccupancyStatus.OCCUPIED,
          },
        }),
        this.prismaService.room.count({
          where: {
            isActive: true,
            occupancyStatus: OccupancyStatus.OUT_OF_ORDER,
          },
        }),
      ]);

    return [
      {
        id: 'available-rooms',
        title: 'Available rooms',
        value: String(availableRooms),
        description: 'Vacant, clean rooms ready to assign',
        icon: 'DoorOpen',
        link: 'rooms?isActive=true&occupancyStatus=VACANT&housekeepingStatus=CLEAN',
        tone: 'emerald',
      },
      {
        id: 'reserved-rooms',
        title: 'Reserved rooms',
        value: String(reservedRooms),
        description: 'Rooms held for upcoming guests',
        icon: 'CalendarCheck',
        link: 'rooms?isActive=true&occupancyStatus=RESERVED',
        tone: 'gold',
      },
      {
        id: 'occupied-rooms',
        title: 'Occupied rooms',
        value: String(occupiedRooms),
        description: 'Rooms with guests in house',
        icon: 'Users',
        link: 'rooms?isActive=true&occupancyStatus=OCCUPIED',
        tone: 'sky',
      },
      {
        id: 'out-of-order-rooms',
        title: 'Out of order',
        value: String(outOfOrderRooms),
        description: 'Rooms unavailable for booking',
        icon: 'Wrench',
        link: 'rooms?isActive=true&occupancyStatus=OUT_OF_ORDER',
        tone: 'rose',
      },
    ];
  }

  private async housekeeperStats(): Promise<StatItem[]> {
    const [dirtyRooms, cleaningRooms, cleanRooms, outOfOrderRooms] =
      await this.prismaService.$transaction([
        this.prismaService.room.count({
          where: {
            isActive: true,
            housekeepingStatus: HousekeepingStatus.DIRTY,
          },
        }),
        this.prismaService.room.count({
          where: {
            isActive: true,
            housekeepingStatus: HousekeepingStatus.CLEANING,
          },
        }),
        this.prismaService.room.count({
          where: {
            isActive: true,
            housekeepingStatus: HousekeepingStatus.CLEAN,
          },
        }),
        this.prismaService.room.count({
          where: {
            isActive: true,
            occupancyStatus: OccupancyStatus.OUT_OF_ORDER,
          },
        }),
      ]);

    return [
      {
        id: 'dirty-rooms',
        title: 'Needs cleaning',
        value: String(dirtyRooms),
        description: 'Active rooms awaiting housekeeping',
        icon: 'WashingMachine',
        link: 'rooms?isActive=true&housekeepingStatus=DIRTY',
        tone: 'rose',
      },
      {
        id: 'cleaning-rooms',
        title: 'Being cleaned',
        value: String(cleaningRooms),
        description: 'Housekeeping currently in progress',
        icon: 'RefreshCw',
        link: 'rooms?isActive=true&housekeepingStatus=CLEANING',
        tone: 'gold',
      },
      {
        id: 'clean-rooms',
        title: 'Clean rooms',
        value: String(cleanRooms),
        description: 'Rooms ready for inspection or use',
        icon: 'CheckCircle',
        link: 'rooms?isActive=true&housekeepingStatus=CLEAN',
        tone: 'emerald',
      },
      {
        id: 'out-of-order-rooms',
        title: 'Out of order',
        value: String(outOfOrderRooms),
        description: 'Rooms unavailable for housekeeping',
        icon: 'Wrench',
        link: 'rooms?isActive=true&occupancyStatus=OUT_OF_ORDER',
        tone: 'rose',
      },
    ];
  }

  async create(dto: CreateRoomDto): Promise<CreateRoomResponse> {
    if (
      dto.occupancyStatus === OccupancyStatus.OCCUPIED ||
      dto.occupancyStatus === OccupancyStatus.RESERVED
    ) {
      throw new BadRequestException(
        'Occupied and reserved room statuses are derived from bookings.',
      );
    }
    if (dto.housekeepingStatus === HousekeepingStatus.CLEANING) {
      throw new BadRequestException(
        'A housekeeping task must be started before marking the room cleaning.',
      );
    }

    const roomType = await this.prismaService.roomType.findUnique({
      where: {
        id: dto.roomTypeId,
      },
      select: {
        id: true,
      },
    });

    if (!roomType) {
      throw new NotFoundException(ROOM_ERROR_MSG.NOT_FOUND);
    }

    const existingRoom = await this.prismaService.room.findUnique({
      where: {
        roomNumber: dto.roomNumber.toString(),
      },
      select: {
        id: true,
      },
    });

    if (existingRoom) {
      throw new ConflictException(ROOM_ERROR_MSG.CONFLICT_ROOM_NUMBER);
    }

    return await this.prismaService.room.create({
      data: {
        name: dto.name,
        roomNumber: dto.roomNumber.toString(),
        roomTypeId: dto.roomTypeId,
        floor: dto.floor,
        description: dto.description,
        occupancyStatus: dto.occupancyStatus,
        housekeepingStatus: dto.housekeepingStatus,
        isActive: dto.isActive,
      },
      select: {
        id: true,
        name: true,
        roomNumber: true,
        floor: true,
        occupancyStatus: true,
        housekeepingStatus: true,
        isActive: true,
        createdAt: true,
      },
    });
  }

  async findAll(
    query: RoomsQueryDto,
    userId: string,
    role: UserRole,
    category?: Category,
  ): Promise<ListResponse<RoomListItemResponse>> {
    if (
      role === UserRole.STAFF &&
      category !== Category.RECEPTIONIST &&
      category !== Category.HOUSEKEEPER
    ) {
      throw new ForbiddenException(ROOM_ERROR_MSG.ACCESS_DENIED);
    }

    const {
      page,
      limit,
      search,
      isActive,
      occupancyStatus,
      housekeepingStatus,
      roomType,
    } = query;

    const where: Prisma.RoomWhereInput = {
      ...(role === UserRole.STAFF &&
        category === Category.HOUSEKEEPER &&
        this.housekeeperRoomWhere(userId)),
      ...(isActive !== undefined && { isActive }),
      ...(search && {
        OR: [
          {
            roomNumber: {
              contains: search,
              mode: 'insensitive' as const,
            },
          },
          {
            name: {
              contains: search,
              mode: 'insensitive' as const,
            },
          },
          {
            description: {
              contains: search,
              mode: 'insensitive' as const,
            },
          },
        ],
      }),
      ...(occupancyStatus && {
        occupancyStatus,
      }),
      ...(housekeepingStatus && {
        housekeepingStatus,
      }),
      ...(roomType && {
        roomTypeId: roomType,
      }),
    };

    const [rooms, total] = await this.prismaService.$transaction([
      this.prismaService.room.findMany({
        where,
        select: {
          id: true,
          name: true,
          roomNumber: true,
          floor: true,
          occupancyStatus: true,
          housekeepingStatus: true,
          isActive: true,
          description: true,
          createdAt: true,
          roomType: {
            select: {
              id: true,
              name: true,
              slug: true,
            },
          },
        },
        orderBy: {
          createdAt: 'desc',
        },
        skip: (page - 1) * limit,
        take: limit,
      }),

      this.prismaService.room.count({
        where,
      }),
    ]);

    return {
      data: rooms,
      meta: {
        page,
        limit,
        total,
      },
    };
  }

  async lookup(query: RoomsLookupQueryDto): Promise<RoomLookupItem[]> {
    const rooms = await this.prismaService.room.findMany({
      where: {
        ...(query.search && {
          OR: [
            { roomNumber: { contains: query.search, mode: 'insensitive' } },
            { name: { contains: query.search, mode: 'insensitive' } },
            { description: { contains: query.search, mode: 'insensitive' } },
          ],
        }),
      },
      select: { id: true, name: true, floor: true, roomNumber: true },
      orderBy: { roomNumber: 'asc' },
      take: query.limit,
    });

    return rooms;
  }

  async findOne(
    id: string,
    userId: string,
    role: UserRole,
    category?: Category,
  ): Promise<RoomDetailsResponse | HousekeeperRoomDetails> {
    if (role === UserRole.STAFF) {
      if (category === Category.HOUSEKEEPER) {
        return this.findHousekeeperRoom(id, userId);
      }

      if (category !== Category.RECEPTIONIST) {
        throw new ForbiddenException(ROOM_ERROR_MSG.ACCESS_DENIED);
      }
    }

    const room = await this.prismaService.room.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
        roomNumber: true,
        roomTypeId: true,
        floor: true,
        description: true,
        occupancyStatus: true,
        housekeepingStatus: true,
        isActive: true,
        createdAt: true,
        updatedAt: true,
        roomType: {
          select: {
            id: true,
            name: true,
            slug: true,
            basePrice: true,
            currency: true,
            isActive: true,
            images: {
              where: {
                isPrimary: true,
              },
              take: 1,
              select: {
                id: true,
                url: true,
                altText: true,
              },
            },
          },
        },
      },
    });

    if (!room) {
      throw new NotFoundException(ROOM_ERROR_MSG.NOT_FOUND);
    }

    return {
      ...room,
      roomType: {
        ...room.roomType,
        image: room.roomType.images[0],
      },
    };
  }

  private async findHousekeeperRoom(
    id: string,
    userId: string,
  ): Promise<HousekeeperRoomDetails> {
    const room = await this.prismaService.room.findFirst({
      where: {
        id,
        ...this.housekeeperRoomWhere(userId),
      },
      select: {
        id: true,
        roomNumber: true,
        floor: true,
        name: true,
        occupancyStatus: true,
        housekeepingStatus: true,
        roomType: {
          select: {
            id: true,
            name: true,
            slug: true,
            description: true,
            sizeSqFt: true,
            maxGuests: true,
            bedType: true,
            bedCount: true,
          },
        },
      },
    });
    if (!room) {
      throw new NotFoundException(ROOM_ERROR_MSG.NOT_FOUND);
    }

    return {
      id: room.id,
      roomNumber: room.roomNumber,
      floor: room.floor,
      roomName: room.name,
      occupancyStatus: room.occupancyStatus,
      housekeepingStatus: room.housekeepingStatus,
      roomType: {
        id: room.roomType.id,
        name: room.roomType.name,
        slug: room.roomType.slug,
        description: room.roomType.description,
        roomSize: room.roomType.sizeSqFt,
        maxGuests: room.roomType.maxGuests,
        bed: {
          type: room.roomType.bedType,
          count: room.roomType.bedCount,
        },
      },
    };
  }

  private housekeeperRoomWhere(userId: string): Prisma.RoomWhereInput {
    return {
      housekeepingTasks: { some: { assignedTo: userId } },
    };
  }

  async update(id: string, dto: UpdateRoomDto): Promise<void> {
    await this.prismaService.$transaction(async (tx) => {
      await lockRoom(tx, id);
      const room = await tx.room.findUnique({
        where: { id },
        select: { id: true, roomNumber: true, occupancyStatus: true },
      });

      if (!room) {
        throw new NotFoundException(ROOM_ERROR_MSG.NOT_FOUND);
      }

      if (dto.roomNumber && dto.roomNumber.toString() !== room.roomNumber) {
        const existingRoom = await tx.room.findUnique({
          where: { roomNumber: dto.roomNumber.toString() },
          select: { id: true },
        });

        if (existingRoom) {
          throw new ConflictException(ROOM_ERROR_MSG.CONFLICT_ROOM_NUMBER);
        }
      }

      if (dto.roomTypeId) {
        const roomType = await tx.roomType.findUnique({
          where: { id: dto.roomTypeId },
          select: { id: true },
        });

        if (!roomType) {
          throw new NotFoundException(ROOM_ERROR_MSG.NOT_FOUND);
        }
      }

      if (
        dto.occupancyStatus &&
        dto.occupancyStatus !== room.occupancyStatus &&
        room.occupancyStatus === OccupancyStatus.OUT_OF_ORDER
      ) {
        throw new ConflictException(
          'Use the release action to return an out-of-order room to service.',
        );
      }

      if (
        dto.occupancyStatus &&
        dto.occupancyStatus !== room.occupancyStatus &&
        dto.occupancyStatus !== OccupancyStatus.OUT_OF_ORDER
      ) {
        const expectedStatus = await resolveRoomOccupancyStatus(tx, id);
        if (dto.occupancyStatus !== expectedStatus) {
          throw new ConflictException(
            `Room occupancy is controlled by active bookings (${expectedStatus}).`,
          );
        }
      }

      if (dto.isActive === false) {
        const now = new Date();
        const activeBooking = await tx.booking.findFirst({
          where: {
            bookingRoom: { assignedRoomId: id },
            checkOutDate: { gt: now },
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
                  {
                    invoice: {
                      is: {
                        payments: {
                          some: { paymentStatus: PaymentStatus.PENDING },
                        },
                      },
                    },
                  },
                ],
              },
            ],
          },
          select: { id: true },
        });

        if (activeBooking) {
          throw new BadRequestException(
            'A room with active bookings cannot be deactivated.',
          );
        }
      }

      if (dto.housekeepingStatus) {
        const activeTasks = await tx.housekeepingTask.findMany({
          where: {
            roomId: id,
            status: { in: [TaskStatus.PENDING, TaskStatus.IN_PROGRESS] },
          },
          select: { status: true },
        });
        const hasInProgressTask = activeTasks.some(
          (task) => task.status === TaskStatus.IN_PROGRESS,
        );
        if (
          dto.housekeepingStatus === HousekeepingStatus.CLEAN &&
          activeTasks.length > 0
        ) {
          throw new BadRequestException(
            'Complete or remove active housekeeping tasks before marking the room clean.',
          );
        }
        if (
          dto.housekeepingStatus === HousekeepingStatus.CLEANING &&
          !hasInProgressTask
        ) {
          throw new BadRequestException(
            'A housekeeping task must be started before marking the room cleaning.',
          );
        }
        if (
          dto.housekeepingStatus === HousekeepingStatus.DIRTY &&
          hasInProgressTask
        ) {
          throw new BadRequestException(
            'A room with active cleaning work cannot be marked dirty.',
          );
        }
      }

      await tx.room.update({
        where: { id },
        data: {
          ...dto,
          roomNumber: undefined,
          ...(dto.roomNumber && { roomNumber: dto.roomNumber.toString() }),
        },
        select: { id: true },
      });
    });
  }

  async releaseOutOfOrder(id: string): Promise<void> {
    await this.prismaService.$transaction(async (tx) => {
      await lockRoom(tx, id);
      const room = await tx.room.findUnique({
        where: { id },
        select: { occupancyStatus: true },
      });

      if (!room) {
        throw new NotFoundException(ROOM_ERROR_MSG.NOT_FOUND);
      }
      if (room.occupancyStatus !== OccupancyStatus.OUT_OF_ORDER) {
        throw new ConflictException('Room is not out of order.');
      }

      const unresolvedIssue = await tx.issue.findFirst({
        where: {
          roomId: id,
          status: { in: [IssueStatus.OPEN, IssueStatus.IN_PROGRESS] },
        },
        select: { id: true },
      });

      if (unresolvedIssue) {
        throw new BadRequestException(
          'Resolve all open or in-progress room issues before returning this room to service.',
        );
      }

      await releaseRoomOutOfOrder(tx, id);
    });
  }

  async delete(id: string): Promise<void> {
    const room = await this.prismaService.room.findUnique({
      where: { id },
      select: { id: true },
    });

    if (!room) {
      throw new NotFoundException(ROOM_ERROR_MSG.NOT_FOUND);
    }

    await this.prismaService.room.delete({
      where: { id },
      select: { id: true },
    });
  }
}
