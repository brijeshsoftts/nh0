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
import {
  CreateRoomTypeResponse,
  RoomTypeDetailsResponse,
  RoomTypeListItemResponse,
} from './room-types.types';

@Injectable()
export class RoomTypesService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(files, dto: CreateRoomTypeDto): Promise<CreateRoomTypeResponse> {
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

  async findAll(
    query: RoomTypeQueryDto,
  ): Promise<ListResponse<RoomTypeListItemResponse>> {
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
          images: {
            select: {
              id: true,
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
        maxGuests: roomType.maxGuests,
        basePrice: roomType.basePrice,
        slug: roomType.slug,
        isActive: roomType.isActive,
        sizeSqFt: roomType.sizeSqFt || null,
        bedType: roomType.bedType,
        totalRooms: roomType._count.rooms,
        image: roomType.images[0] ?? null,
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

  async findOne(id: string): Promise<RoomTypeDetailsResponse> {
    const roomType = await this.prismaService.roomType.findUnique({
      where: { id },
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
          },
        },
        amenities: {
          select: { id: true, name: true, icon: true },
        },
        _count: {
          select: {
            rooms: true,
          },
        },
      },
    });

    if (!roomType) {
      throw new NotFoundException(ROOM_TYPE_ERROR_MSG.ROOM_TYPE_NOT_FOUND);
    }

    return {
      ...roomType,
      images: roomType.images,
      amenities: roomType.amenities,
      totalRooms: roomType._count.rooms,
      _count: undefined,
    };
  }
}
