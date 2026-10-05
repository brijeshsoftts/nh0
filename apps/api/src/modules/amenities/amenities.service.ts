import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { PrismaService } from '../../prisma/prisma.service';
import { ListResponse } from '../../types/api.types';

import { CreateAmenityDto } from './dto/create-amenity.dto';
import { FindAmenitiesQueryDto } from './dto/find-amenities-query.dto';
import { UpdateAmenityDto } from './dto/update-amenity.dto';
import { AMENITIES_ERROR_MSG } from './amenities.constants';
import { Amenity } from './amenities.types';

@Injectable()
export class AmenitiesService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(dto: CreateAmenityDto): Promise<void> {
    try {
      await this.prismaService.amenity.create({
        data: dto,
        select: {
          id: true,
        },
      });
    } catch (error) {
      if (
        typeof error === 'object' &&
        error !== null &&
        'code' in error &&
        error.code === 'P2002'
      ) {
        throw new ConflictException(AMENITIES_ERROR_MSG.NAME_ALREADY_EXISTS);
      }
      throw error;
    }
  }

  async findAll(query: FindAmenitiesQueryDto): Promise<ListResponse<Amenity>> {
    const { search, page, limit } = query;
    const where = {
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
          isActive: true,
          createdAt: true,
          updatedAt: true,
        },
      }),
      this.prismaService.amenity.count({ where }),
    ]);

    return {
      data,
      meta: { page, limit, total },
    };
  }

  async update(id: string, dto: UpdateAmenityDto): Promise<void> {
    try {
      await this.prismaService.amenity.update({
        where: { id },
        data: dto,
        select: {
          id: true,
          name: true,
          description: true,
          icon: true,
          category: true,
          isActive: true,
          createdAt: true,
          updatedAt: true,
        },
      });
    } catch (error) {
      if (
        typeof error === 'object' &&
        error !== null &&
        'code' in error &&
        error.code === 'P2002'
      ) {
        throw new ConflictException(AMENITIES_ERROR_MSG.NAME_ALREADY_EXISTS);
      }
      if (
        typeof error === 'object' &&
        error !== null &&
        'code' in error &&
        error.code === 'P2025'
      ) {
        throw new NotFoundException(AMENITIES_ERROR_MSG.NOT_FOUND);
      }
      throw error;
    }
  }

  async delete(id: string): Promise<void> {
    try {
      await this.prismaService.amenity.delete({
        where: { id },
        select: { id: true },
      });
    } catch (error) {
      if (
        typeof error === 'object' &&
        error !== null &&
        'code' in error &&
        error.code === 'P2025'
      ) {
        throw new NotFoundException(AMENITIES_ERROR_MSG.NOT_FOUND);
      }
      throw error;
    }
  }
}
