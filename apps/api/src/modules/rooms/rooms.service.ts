import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { PrismaService } from '../../prisma/prisma.service';
import { ListResponse } from '../../types/api.types';

import { CreateRoomDto } from './dto/create-room.dto';
import { RoomsQueryDto } from './dto/rooms-query.dto';
import { UpdateRoomDto } from './dto/update-room.dto';
import { ROOM_ERROR_MSG } from './rooms.constants';
import {
  CreateRoomResponse,
  RoomDetailsResponse,
  RoomListItemResponse,
} from './rooms.types';

@Injectable()
export class RoomsService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(dto: CreateRoomDto): Promise<CreateRoomResponse> {
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
  ): Promise<ListResponse<RoomListItemResponse>> {
    const {
      page,
      limit,
      search,
      occupancyStatus,
      housekeepingStatus,
      roomType,
    } = query;

    const where = {
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

  async findOne(id: string): Promise<RoomDetailsResponse> {
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

  async update(id: string, dto: UpdateRoomDto): Promise<void> {
    const room = await this.prismaService.room.findUnique({
      where: { id },
      select: {
        id: true,
        roomNumber: true,
      },
    });

    if (!room) {
      throw new NotFoundException(ROOM_ERROR_MSG.NOT_FOUND);
    }

    if (dto.roomNumber && dto.roomNumber.toString() !== room.roomNumber) {
      const existingRoom = await this.prismaService.room.findUnique({
        where: { roomNumber: dto.roomNumber.toString() },
        select: { id: true },
      });

      if (existingRoom) {
        throw new ConflictException(ROOM_ERROR_MSG.CONFLICT_ROOM_NUMBER);
      }
    }

    if (dto.roomTypeId) {
      const roomType = await this.prismaService.roomType.findUnique({
        where: { id: dto.roomTypeId },
        select: { id: true },
      });

      if (!roomType) {
        throw new NotFoundException(ROOM_ERROR_MSG.NOT_FOUND);
      }
    }

    await this.prismaService.room.update({
      where: { id },
      data: {
        ...dto,
        roomNumber: undefined,
        ...(dto.roomNumber && { roomNumber: dto.roomNumber.toString() }),
      },
      select: {
        id: true,
      },
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
