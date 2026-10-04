import { Injectable, NotFoundException } from '@nestjs/common';

import { PrismaService } from '../../prisma/prisma.service';
import { ListResponse } from '../../types/api.types';
import { BookingStatus } from '../../types/prisma.types';

import { AmenitiesQueryDto } from './dto/amenities-query.dto';
import { AvailableRoomQueryDto } from './dto/available-room-query.dot';
import { AvailableRoomsQueryDto } from './dto/available-rooms-query.dto';
import { PUBLIC_ERROR_MSG } from './public.constants';
import {
  AmenityListItemResponse,
  AvailableRoomListItemResponse,
  AvailableRoomResponse,
} from './public.types';

@Injectable()
export class PublicService {
  constructor(private readonly prismaService: PrismaService) {}

  async findAmenities(
    query: AmenitiesQueryDto,
  ): Promise<ListResponse<AmenityListItemResponse>> {
    const { search, page, limit } = query;
    const where = {
      isActive: true,
      ...(search && {
        OR: [
          { name: { contains: search, mode: 'insensitive' as const } },
          { description: { contains: search, mode: 'insensitive' as const } },
        ],
      }),
    };

    const [data, total] = await this.prismaService.$transaction([
      this.prismaService.amenity.findMany({
        where,
        skip: (page - 1) * limit,
        take: limit,
        orderBy: { name: 'asc' },
        select: {
          id: true,
          name: true,
          description: true,
          icon: true,
          category: true,
        },
      }),
      this.prismaService.amenity.count({ where }),
    ]);

    return {
      data,
      meta: {
        page,
        limit,
        total,
      },
    };
  }

  async findAvailableRoom(
    slug: string,
    query: AvailableRoomQueryDto,
  ): Promise<AvailableRoomResponse> {
    const { checkInDate, checkOutDate } = query;
    const roomType = await this.prismaService.roomType.findFirst({
      where: { slug, isActive: true },
      select: {
        id: true,
        name: true,
        slug: true,
        description: true,
        sizeSqFt: true,
        maxGuests: true,
        adults: true,
        children: true,
        basePrice: true,
        currency: true,
        bedType: true,
        bedCount: true,
        smokingAllowed: true,
        petsAllowed: true,
        images: {
          select: {
            url: true,
            altText: true,
            isPrimary: true,
            sortOrder: true,
          },
          orderBy: { sortOrder: 'asc' },
        },
        amenities: {
          where: { isActive: true },
          select: { id: true, name: true, icon: true },
        },
        rooms: {
          where: { isActive: true },
          select: {
            id: true,
            bookingRooms: {
              where: {
                booking: {
                  status: {
                    in: [
                      BookingStatus.PENDING,
                      BookingStatus.CONFIRMED,
                      BookingStatus.CHECKED_IN,
                    ],
                  },
                  checkInDate: { lt: new Date(checkOutDate) },
                  checkOutDate: { gt: new Date(checkInDate) },
                },
              },
              select: { id: true },
            },
          },
        },
      },
    });

    if (!roomType) {
      throw new NotFoundException(PUBLIC_ERROR_MSG.ROOM_NOT_FOUND);
    }

    return {
      id: roomType.id,
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
      images: roomType.images,
      amenities: roomType.amenities,
      availability: {
        isAvailable: roomType.rooms.some(
          (room) => room.bookingRooms.length === 0,
        ),
      },
    };
  }

  async findAvailableRooms(
    query: AvailableRoomsQueryDto,
  ): Promise<ListResponse<AvailableRoomListItemResponse>> {
    const { checkInDate, checkOutDate, adults, children, page, limit } = query;

    const totalGuests = adults + children;

    const where = {
      isActive: true,
      maxGuests: {
        gte: totalGuests || 1,
      },
      rooms: {
        some: {
          isActive: true,
        },
      },
    };

    const [roomTypes, total] = await this.prismaService.$transaction([
      this.prismaService.roomType.findMany({
        where,
        skip: (page - 1) * limit,
        take: limit,
        orderBy: {
          basePrice: 'asc',
        },
        select: {
          id: true,
          name: true,
          slug: true,
          adults: true,
          children: true,
          bedType: true,
          bedCount: true,
          description: true,
          sizeSqFt: true,
          maxGuests: true,
          basePrice: true,
          rooms: {
            where: {
              isActive: true,
            },
            select: {
              id: true,
              bookingRooms: {
                where: {
                  booking: {
                    status: {
                      in: [
                        BookingStatus.PENDING,
                        BookingStatus.CONFIRMED,
                        BookingStatus.CHECKED_IN,
                      ],
                    },
                    ...(checkInDate &&
                      checkOutDate && {
                        checkInDate: {
                          lt: checkOutDate,
                        },
                        checkOutDate: {
                          gt: checkInDate,
                        },
                      }),
                  },
                },
                select: {
                  id: true,
                },
              },
            },
          },
          images: {
            select: {
              url: true,
              altText: true,
            },
            where: { isPrimary: true },
            take: 1,
          },
          amenities: {
            select: { name: true, icon: true },
            where: { isActive: true },
            take: 4,
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
        description: roomType.description || null,
        sizeSqFt: roomType.sizeSqFt || null,
        maxGuests: roomType.maxGuests,
        adults: roomType.adults,
        children: roomType.children,
        basePrice: roomType.basePrice,
        bedType: roomType.bedType,
        bedCount: roomType.bedCount,
        availableRooms: roomType.rooms.length,
        image: roomType.images[0] ?? null,
        amenities: roomType.amenities ?? [],
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
}
