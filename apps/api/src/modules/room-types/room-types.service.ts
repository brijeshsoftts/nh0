import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import slugify from 'slugify';

import { uploadFile } from '../../config';
import { Prisma } from '../../generated/prisma/client';
import { PrismaService } from '../../prisma/prisma.service';
import { ListResponse } from '../../types/api.types';

import { CreateRoomTypeDto } from './dto/create-room-type.dto';
import { RoomTypeQueryDto } from './dto/room-type-query.dto';
import { ROOM_TYPE_ERROR_MSG } from './room-types.constants';
import { CreateRoomType, RoomType, RoomTypeDetails } from './room-types.types';

@Injectable()
export class RoomTypesService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(files, dto: CreateRoomTypeDto): Promise<CreateRoomType> {
    if (!files?.length) {
      throw new BadRequestException('At least one primary image is required');
    }

    const name = dto.name.trim();
    const slug = slugify(name);

    const existingRoomType = await this.prismaService.roomType.findFirst({
      where: {
        OR: [
          { name: { equals: name, mode: 'insensitive' } },
          { slug: { equals: slug, mode: 'insensitive' } },
        ],
      },
      select: {
        id: true,
      },
    });

    if (existingRoomType) {
      throw new ConflictException(ROOM_TYPE_ERROR_MSG.CONFLICT_NAME);
    }

    const uploadedImages = await Promise.all(
      files.map(async (file, index) => {
        const { name: fileName, url } = await uploadFile(file);

        return {
          altText: fileName,
          url,
          isPrimary: index === 0,
          sortOrder: index,
        };
      }),
    );

    return this.prismaService.$transaction(async (tx) => {
      const roomType = await tx.roomType.create({
        data: {
          name,
          slug,
          description: dto.description?.trim(),
          sizeSqFt: dto.sizeSqFt ?? null,
          maxGuests: dto.maxGuests,
          basePrice: dto.basePrice,
          currency: dto.currency,
          bedType: dto.bedType,
          adults: dto.adults,
          children: dto.children,
          bedCount: dto.bedCount,
          smokingAllowed: dto.smokingAllowed,
          petsAllowed: dto.petsAllowed,
          ...(dto.amenities?.length && {
            amenities: {
              connect: dto.amenities.map((id) => ({ id })),
            },
          }),
        },
        select: {
          id: true,
          name: true,
          maxGuests: true,
          basePrice: true,
          slug: true,
          createdAt: true,
          isActive: true,
        },
      });

      await tx.image.createMany({
        data: uploadedImages.map((image) => ({
          ...image,
          roomTypeId: roomType.id,
        })),
      });
      return roomType;
    });
  }

  async findAll(query: RoomTypeQueryDto): Promise<ListResponse<RoomType>> {
    const { search, isActive, maxGuests, page, limit } = query;

    const where: Prisma.RoomTypeWhereInput = {
      isActive: isActive,
      ...(search && {
        OR: [
          { name: { contains: search, mode: 'insensitive' } },
          { slug: { contains: search, mode: 'insensitive' } },
          { description: { contains: search, mode: 'insensitive' } },
        ],
      }),
      ...(maxGuests && {
        maxGuests: {
          gte: maxGuests,
        },
      }),
    };

    const [roomTypes, total] = await this.prismaService.$transaction([
      this.prismaService.roomType.findMany({
        where,
        select: {
          id: true,
          name: true,
          maxGuests: true,
          basePrice: true,
          slug: true,
          isActive: true,
          sizeSqFt: true,
          bedType: true,
          currency: true,
          adults: true,
          children: true,
          bedCount: true,
          amenities: {
            select: {
              name: true,
              icon: true,
            },
            take: 5,
          },
          images: {
            select: {
              url: true,
              altText: true,
            },
            where: { isPrimary: true },
            take: 1,
          },
          _count: {
            select: {
              rooms: true,
            },
          },
        },
      }),

      this.prismaService.roomType.count({
        where,
      }),
    ]);

    const items = roomTypes.map((roomType) => {
      return {
        id: roomType.id,
        name: roomType.name,
        slug: roomType.slug,
        primaryImage: roomType.images[0],
        basePrice: roomType.basePrice,
        currency: roomType.currency,
        maxGuests: roomType.maxGuests,
        adults: roomType.adults,
        children: roomType.children,
        bedType: roomType.bedType,
        bedCount: roomType.bedCount,
        numberOfRooms: roomType._count.rooms,
        amenities: roomType.amenities,
        isActive: roomType.isActive,
      };
    });

    return {
      data: items,
      meta: {
        page,
        limit,
        total,
      },
    };
  }

  async findOne(slug: string): Promise<RoomTypeDetails> {
    const roomType = await this.prismaService.roomType.findUnique({
      where: { slug },
      select: {
        id: true,
        name: true,
        slug: true,
        description: true,
        sizeSqFt: true,
        maxGuests: true,
        basePrice: true,
        bedType: true,
        bedCount: true,
        smokingAllowed: true,
        petsAllowed: true,
        createdAt: true,
        updatedAt: true,
        adults: true,
        children: true,
        currency: true,
        isActive: true,
        images: {
          select: {
            id: true,
            url: true,
            altText: true,
            isPrimary: true,
            sortOrder: true,
          },
        },
        amenities: {
          select: { name: true, icon: true },
        },
        rooms: {
          select: {
            isActive: true,
            occupancyStatus: true,
            housekeepingStatus: true,
          },
        },
      },
    });

    if (!roomType) {
      throw new NotFoundException(ROOM_TYPE_ERROR_MSG.ROOM_TYPE_NOT_FOUND);
    }

    const roomStatusSummary = roomType.rooms.reduce(
      (summary, room) => {
        summary.total += 1;
        summary.active += Number(room.isActive);

        if (room.occupancyStatus === 'VACANT') {
          summary.occupancy.available += 1;
        } else if (room.occupancyStatus === 'OCCUPIED') {
          summary.occupancy.occupied += 1;
        } else {
          summary.occupancy.other += 1;
        }

        if (room.housekeepingStatus === 'CLEAN') {
          summary.housekeeping.clean += 1;
        } else if (room.housekeepingStatus === 'DIRTY') {
          summary.housekeeping.dirty += 1;
        } else {
          summary.housekeeping.inProgress += 1;
        }

        return summary;
      },
      {
        total: 0,
        active: 0,
        occupancy: { available: 0, occupied: 0, other: 0 },
        housekeeping: {
          clean: 0,
          dirty: 0,
          inspected: 0,
          inProgress: 0,
          other: 0,
        },
      },
    );

    return {
      id: roomType.id,
      images: roomType.images,
      name: roomType.name,
      slug: roomType.slug,
      description: roomType.description,
      sizeSqFt: roomType.sizeSqFt,
      maxGuests: roomType.maxGuests,
      adults: roomType.adults,
      children: roomType.children,
      basePrice: roomType.basePrice,
      currency: roomType.currency,
      bedType: roomType.bedType,
      bedCount: roomType.bedCount,
      smokingAllowed: roomType.smokingAllowed,
      petsAllowed: roomType.petsAllowed,
      isActive: roomType.isActive,
      amenities: roomType.amenities,
      roomCount: roomStatusSummary.total,
      roomStatusSummary,
      createdAt: roomType.createdAt,
      updatedAt: roomType.updatedAt,
    };
  }
}
