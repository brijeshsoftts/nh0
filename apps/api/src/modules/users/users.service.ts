import {
  ConflictException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { hashPassword } from '../../common/helpers';
import { PrismaService } from '../../prisma/prisma.service';
import { ListResponse } from '../../types/api.types';
import { UserRole } from '../../types/prisma.types';

import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersQueryDto } from './dto/users-query.dto';
import { USER_ERROR_MSG } from './users.constants';
import { CreatedUser, UpdateUser, User, UserProfile } from './users.types';

@Injectable()
export class UsersService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(dto: CreateUserDto): Promise<CreatedUser> {
    const passwordHash = await hashPassword('Admin@1234');

    try {
      return await this.prismaService.user.create({
        data: {
          fullName: dto.fullName.trim(),
          email: dto.email.toLowerCase().trim(),
          phone: dto.phone.trim(),
          passwordHash,
          role: UserRole.MANAGER,
        },
        select: {
          id: true,
          fullName: true,
          email: true,
          phone: true,
          role: true,
          isActive: true,
        },
      });
    } catch (error) {
      if (this.isPrismaError(error, 'P2002')) {
        throw new ConflictException(USER_ERROR_MSG.CONFLICT_EMAIL);
      }
      throw error;
    }
  }

  async findOne(userId: string): Promise<UserProfile> {
    const user = await this.prismaService.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        fullName: true,
        email: true,
        phone: true,
        role: true,
        profile: {
          select: {
            id: true,
            url: true,
            altText: true,
          },
        },
        staff: {
          select: {
            category: true,
          },
        },
      },
    });

    if (!user) {
      throw new NotFoundException(USER_ERROR_MSG.NOT_FOUND);
    }

    return {
      id: user.id,
      fullName: user.fullName,
      email: user.email,
      phone: user.phone,
      role: user.role,
      ...(user.staff?.category && {
        category: user.staff.category,
      }),
      avatar: user.profile,
    };
  }

  async findAll(query: UsersQueryDto): Promise<ListResponse<User>> {
    const { search, isActive, page, limit } = query;

    const [users, total] = await this.prismaService.$transaction([
      this.prismaService.user.findMany({
        where: {
          ...(isActive !== undefined && { isActive }),
          softDeletedAt: null,
          ...(search && {
            OR: [
              {
                fullName: {
                  contains: search,
                  mode: 'insensitive',
                },
              },
              {
                email: {
                  contains: search,
                  mode: 'insensitive',
                },
              },
            ],
          }),
          role: UserRole.MANAGER,
        },
        skip: (page - 1) * limit,
        take: limit,
        orderBy: { createdAt: 'desc' },
        select: {
          id: true,
          fullName: true,
          email: true,
          phone: true,
          role: true,
          isActive: true,
          profile: {
            select: {
              altText: true,
              url: true,
            },
          },
        },
      }),
      this.prismaService.user.count({
        where: {
          softDeletedAt: null,

          ...(isActive !== undefined && { isActive }),
          ...(search && {
            OR: [
              {
                fullName: {
                  contains: search,
                  mode: 'insensitive',
                },
              },
              {
                email: {
                  contains: search,
                  mode: 'insensitive',
                },
              },
            ],
          }),
          role: UserRole.MANAGER,
        },
      }),
    ]);

    return {
      data: users.map((user) => ({
        id: user.id,
        fullName: user.fullName,
        email: user.email,
        phone: user.phone,
        role: user.role,
        isActive: user.isActive,
        avatar: user.profile,
      })),
      meta: {
        page,
        limit,
        total,
      },
    };
  }

  async update(
    id: string,
    dto: UpdateUserDto,
    currentUserRole?: string,
    currentUserId?: string,
  ): Promise<UpdateUser> {
    const isAdmin = currentUserRole === UserRole.ADMIN;
    const isSelf = currentUserId === id;

    if (isAdmin && isSelf) {
      if (!isAdmin && !isSelf) {
        throw new ForbiddenException(USER_ERROR_MSG.FORBIDDEN);
      }
    }

    const existingUser = await this.prismaService.user.findUnique({
      where: { id },
      select: {
        id: true,
        fullName: true,
        email: true,
        phone: true,
        role: true,
      },
    });

    if (!existingUser) {
      throw new NotFoundException(USER_ERROR_MSG.NOT_FOUND);
    }

    if (!isAdmin && dto.role !== undefined) {
      throw new ForbiddenException(USER_ERROR_MSG.FORBIDDEN);
    }

    const updatedUser = await this.prismaService.user.update({
      where: { id },
      data: {
        ...(dto.fullName !== undefined && {
          fullName: dto.fullName.trim(),
        }),
        ...(dto.email !== undefined && {
          email: dto.email.trim().toLowerCase(),
        }),
        ...(dto.phone !== undefined && {
          phone: dto.phone.trim(),
        }),
        ...(dto.role !== undefined && { role: dto.role }),
        ...(dto.isActive !== undefined && { isActive: dto.isActive }),
      },
      select: {
        id: true,
        fullName: true,
        email: true,
        phone: true,
        role: true,
        isActive: true,
      },
    });

    return {
      id: updatedUser.id,
      fullName: updatedUser.fullName,
      email: updatedUser.email,
      phone: updatedUser.phone,
      role: updatedUser.role,
      isActive: updatedUser.isActive,
    };
  }

  private isPrismaError(error: unknown, code: string): boolean {
    return (
      typeof error === 'object' &&
      error !== null &&
      'code' in error &&
      error.code === code
    );
  }
}
