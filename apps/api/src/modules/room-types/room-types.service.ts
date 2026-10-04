import {
  BadRequestException,
  ConflictException,
  Injectable,
} from '@nestjs/common';
import slugify from 'slugify';

import { uploadFile } from '../../config';
import { PrismaService } from '../../prisma/prisma.service';

import { CreateRoomTypeDto } from './dto/create-room-type.dto';
import { ROOM_TYPE_ERROR_MSG } from './room-types.constants';
import { CreateRoomTypeResponse } from './room-types.types';

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
          maxGuests: dto.maxGuests,
          basePrice: dto.basePrice,
          bedType: dto.bedType,
          adults: dto.adults,
          children: dto.children,
          bedCount: dto.bedCount,
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
}
