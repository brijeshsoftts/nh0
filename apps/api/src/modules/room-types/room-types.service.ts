import {
  BadRequestException,
  ConflictException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import slugify from 'slugify';
import type {} from 'multer';

import { MAX_FILES } from '../../common/constants';
import { deleteFile, uploadFile } from '../../config';
import { Prisma } from '../../generated/prisma/client';
import { PrismaService } from '../../prisma/prisma.service';
import { ListResponse } from '../../types/api.types';
import { BookingStatus, UserRole } from '../../types/prisma.types';

import { CreateRoomTypeDto } from './dto/create-room-type.dto';
import { RoomTypeQueryDto } from './dto/room-type-query.dto';
import { UpdateRoomTypeDto } from './dto/update-room-type.dto';
import { ROOM_TYPE_ERROR_MSG } from './room-types.constants';
import {
  BrowseRoom,
  CreateRoomType,
  RoomType,
  RoomTypeDetails,
} from './room-types.types';

@Injectable()
export class RoomTypesService {
  private readonly logger = new Logger(RoomTypesService.name);

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

  async update(
    id: string,
    dto: UpdateRoomTypeDto,
    files: Express.Multer.File[] = [],
  ): Promise<void> {
    const roomType = await this.prismaService.roomType.findUnique({
      where: { id },
      select: {
        id: true,
        images: {
          select: {
            id: true,
            url: true,
            altText: true,
            isPrimary: true,
            sortOrder: true,
          },
          orderBy: { sortOrder: 'asc' },
        },
      },
    });

    if (!roomType) {
      throw new NotFoundException(ROOM_TYPE_ERROR_MSG.ROOM_TYPE_NOT_FOUND);
    }

    const retainedIds = new Set(dto.retainedImageIds);
    const retainedImages = roomType.images.filter((image) =>
      retainedIds.has(image.id),
    );

    if (
      retainedImages.length !== retainedIds.size ||
      retainedIds.size + files.length < 1
    ) {
      throw new BadRequestException(
        retainedIds.size + files.length < 1
          ? ROOM_TYPE_ERROR_MSG.IMAGE_REQUIRED
          : ROOM_TYPE_ERROR_MSG.INVALID_IMAGE_SELECTION,
      );
    }

    if (retainedIds.size + files.length > MAX_FILES) {
      throw new BadRequestException(ROOM_TYPE_ERROR_MSG.IMAGE_LIMIT);
    }

    const [primaryType, primaryValue] = dto.primaryImage.split(':');
    const primaryFileIndex = Number(primaryValue);
    const hasValidPrimary =
      (primaryType === 'existing' && retainedIds.has(primaryValue)) ||
      (primaryType === 'new' &&
        Number.isInteger(primaryFileIndex) &&
        primaryFileIndex >= 0 &&
        primaryFileIndex < files.length);

    if (!hasValidPrimary) {
      throw new BadRequestException(
        ROOM_TYPE_ERROR_MSG.INVALID_IMAGE_SELECTION,
      );
    }

    const name = dto.name.trim();
    const slug = slugify(name);
    const conflictingRoomType = await this.prismaService.roomType.findFirst({
      where: {
        id: { not: id },
        OR: [
          { name: { equals: name, mode: 'insensitive' } },
          { slug: { equals: slug, mode: 'insensitive' } },
        ],
      },
      select: { id: true },
    });

    if (conflictingRoomType) {
      throw new ConflictException(ROOM_TYPE_ERROR_MSG.CONFLICT_NAME);
    }

    const uploadedImages: {
      url: string;
      altText: string;
      isPrimary: boolean;
      sortOrder: number;
    }[] = [];

    try {
      for (const [index, file] of files.entries()) {
        const uploaded = await uploadFile(file);
        uploadedImages.push({
          url: uploaded.url,
          altText: uploaded.name,
          isPrimary: primaryType === 'new' && primaryFileIndex === index,
          sortOrder: retainedImages.length + index,
        });
      }

      await this.prismaService.$transaction(async (transaction) => {
        await transaction.roomType.update({
          where: { id },
          data: {
            name,
            slug,
            description: dto.description?.trim() || null,
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
            isActive: dto.isActive,
            amenities: {
              set: dto.amenities.map((amenityId) => ({ id: amenityId })),
            },
          },
          select: { id: true },
        });

        const removedImages = roomType.images.filter(
          (image) => !retainedIds.has(image.id),
        );

        if (removedImages.length > 0) {
          await transaction.image.deleteMany({
            where: {
              roomTypeId: id,
              id: { in: removedImages.map((image) => image.id) },
            },
          });
        }

        await transaction.image.updateMany({
          where: { roomTypeId: id },
          data: { isPrimary: false },
        });

        for (const [index, image] of retainedImages.entries()) {
          await transaction.image.update({
            where: { id: image.id },
            data: {
              isPrimary:
                primaryType === 'existing' && primaryValue === image.id,
              sortOrder: index,
            },
          });
        }

        if (uploadedImages.length > 0) {
          await transaction.image.createMany({
            data: uploadedImages.map((image) => ({
              ...image,
              roomTypeId: id,
            })),
          });
        }
      });
    } catch (error) {
      await Promise.allSettled(
        uploadedImages.map((image) => deleteFile(image.url)),
      );

      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new ConflictException(ROOM_TYPE_ERROR_MSG.CONFLICT_NAME);
        }
        if (error.code === 'P2025') {
          throw new NotFoundException(ROOM_TYPE_ERROR_MSG.ROOM_TYPE_NOT_FOUND);
        }
      }

      throw error;
    }

    const removedImages = roomType.images.filter(
      (image) => !retainedIds.has(image.id),
    );
    const cleanupResults = await Promise.allSettled(
      removedImages.map((image) => deleteFile(image.url)),
    );

    cleanupResults.forEach((result) => {
      if (result.status === 'rejected') {
        this.logger.warn('Could not remove a replaced room type image.');
      }
    });
  }

  async findAll(
    query: RoomTypeQueryDto,
    role: UserRole,
  ): Promise<ListResponse<RoomType | BrowseRoom>> {
    if (role === UserRole.CUSTOMER) {
      return this.browse(query);
    }

    const { page, limit } = query;
    const where = this.buildRoomTypeWhere(query, role);

    const [roomTypes, total] = await this.prismaService.$transaction([
      this.prismaService.roomType.findMany({
        where,
        skip: (page - 1) * limit,
        take: limit,
        select: {
          id: true,
          name: true,
          description: true,
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
              id: true,
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
        description: roomType.description,
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

  async browse(query: RoomTypeQueryDto): Promise<ListResponse<BrowseRoom>> {
    const { page, limit } = query;
    const activeBookingWhere = this.buildActiveBookingWhere(query);
    const where = this.buildRoomTypeWhere(query, UserRole.CUSTOMER);

    const [roomTypes, total] = await this.prismaService.$transaction([
      this.prismaService.roomType.findMany({
        where,
        skip: (page - 1) * limit,
        take: limit,
        orderBy: { basePrice: 'asc' },
        select: {
          id: true,
          name: true,
          slug: true,
          description: true,
          maxGuests: true,
          basePrice: true,
          currency: true,
          bedType: true,
          bedCount: true,
          images: {
            where: { isPrimary: true },
            take: 1,
            select: { url: true },
          },
          rooms: {
            where: { isActive: true },
            select: {
              id: true,
              bookingRooms: {
                where: { booking: activeBookingWhere },
                select: { id: true },
              },
            },
          },
        },
      }),
      this.prismaService.roomType.count({ where }),
    ]);

    return {
      data: roomTypes.map((roomType) => {
        const bedType = roomType.bedType
          .toLowerCase()
          .replaceAll('_', ' ')
          .replace(/\b\w/g, (character) => character.toUpperCase());

        return {
          id: roomType.id,
          slug: roomType.slug,
          name: roomType.name,
          image: roomType.images[0]?.url ?? '',
          bedConfiguration: `${roomType.bedCount} ${bedType} bed${roomType.bedCount === 1 ? '' : 's'}`,
          maxOccupancy: roomType.maxGuests,
          availableRooms: roomType.rooms.filter(
            (room) => room.bookingRooms.length === 0,
          ).length,
          pricePerNight: roomType.basePrice,
          currency: roomType.currency,
          ...(roomType.description && { description: roomType.description }),
        };
      }),
      meta: { page, limit, total },
    };
  }

  private buildRoomTypeWhere(
    query: RoomTypeQueryDto,
    role: UserRole,
  ): Prisma.RoomTypeWhereInput {
    const {
      search,
      isActive,
      maxGuests,
      adults,
      children,
      slug,
      minPrice,
      maxPrice,
      isAvailable,
    } = query;
    const minimumCapacity = Math.max(
      maxGuests ?? 0,
      (adults ?? 0) + (children ?? 0),
    );
    const activeBookingWhere = this.buildActiveBookingWhere(query);
    const availableRoomWhere: Prisma.RoomWhereInput = {
      isActive: true,
      NOT: {
        bookingRooms: {
          some: { booking: activeBookingWhere },
        },
      },
    };

    return {
      isActive: role === UserRole.CUSTOMER ? true : isActive,
      ...(search && {
        OR: [
          { name: { contains: search, mode: 'insensitive' } },
          { slug: { contains: search, mode: 'insensitive' } },
          { description: { contains: search, mode: 'insensitive' } },
        ],
      }),
      ...(slug && { slug }),
      ...((maxGuests !== undefined ||
        adults !== undefined ||
        children !== undefined) && {
        maxGuests: { gte: minimumCapacity },
      }),
      ...((minPrice !== undefined || maxPrice !== undefined) && {
        basePrice: {
          ...(minPrice !== undefined && { gte: minPrice }),
          ...(maxPrice !== undefined && { lte: maxPrice }),
        },
      }),
      ...(isAvailable !== undefined && {
        rooms: isAvailable
          ? { some: availableRoomWhere }
          : { none: availableRoomWhere },
      }),
    };
  }

  private buildActiveBookingWhere(
    query: RoomTypeQueryDto,
  ): Prisma.BookingWhereInput {
    const startDate = query.checkInDate
      ? new Date(query.checkInDate)
      : new Date();
    const endDate = query.checkOutDate
      ? new Date(query.checkOutDate)
      : startDate;

    return {
      status: {
        in: [
          BookingStatus.PENDING,
          BookingStatus.CONFIRMED,
          BookingStatus.CHECKED_IN,
        ],
      },
      checkInDate: { lt: endDate },
      checkOutDate: { gt: startDate },
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
          select: { id: true, name: true, icon: true },
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
