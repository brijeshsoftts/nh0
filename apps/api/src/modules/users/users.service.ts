import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { hashPassword } from '../../common/helpers';
import { PrismaService } from '../../prisma/prisma.service';
import { ListResponse } from '../../types/api.types';
import { Prisma, UserRole } from '../../types/prisma.types';
import { StatItem } from '../../types/shared.types';

import { CreateUserDto } from './dto/create-user.dto';
import { UpdateMyProfileDto, UpdateUserDto } from './dto/update-user.dto';
import { UsersQueryDto } from './dto/users-query.dto';
import { USER_ERROR_MSG } from './users.constants';
import {
  CreatedUser,
  UpdateUser,
  User,
  UserDetails,
  UserProfile,
} from './users.types';

const USER_DETAIL_SELECT = {
  id: true,
  fullName: true,
  email: true,
  phone: true,
  role: true,
  isActive: true,
  createdAt: true,
  lastLoginAt: true,
  profile: { select: { id: true, url: true, altText: true } },
  staff: {
    select: {
      category: true,
      qualification: true,
      experience: true,
    },
  },
} satisfies Prisma.UserSelect;

type UserDetailRecord = Prisma.UserGetPayload<{
  select: typeof USER_DETAIL_SELECT;
}>;

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
          role: dto.role,
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

  async findMe(userId: string): Promise<UserProfile> {
    const user = await this.prismaService.user.findFirst({
      where: { id: userId, softDeletedAt: null },
      select: USER_DETAIL_SELECT,
    });

    if (!user) {
      throw new NotFoundException(USER_ERROR_MSG.NOT_FOUND);
    }

    return this.mapUserDetails(user);
  }

  async findOne(userId: string): Promise<UserDetails> {
    const user = await this.prismaService.user.findFirst({
      where: {
        id: userId,
        softDeletedAt: null,
        role: { in: [UserRole.MANAGER, UserRole.STAFF] },
      },
      select: USER_DETAIL_SELECT,
    });

    if (!user) {
      throw new NotFoundException(USER_ERROR_MSG.NOT_FOUND);
    }

    return this.mapUserDetails(user);
  }

  async getStats(): Promise<StatItem[]> {
    const managedRoles = [UserRole.MANAGER, UserRole.STAFF];
    const [managerAccounts, staffAccounts, inactiveAccounts] =
      await Promise.all([
        this.prismaService.user.count({
          where: {
            role: UserRole.MANAGER,
            softDeletedAt: null,
          },
        }),
        this.prismaService.user.count({
          where: {
            role: UserRole.STAFF,
            softDeletedAt: null,
          },
        }),
        this.prismaService.user.count({
          where: {
            role: { in: managedRoles },
            isActive: false,
            softDeletedAt: null,
          },
        }),
      ]);

    return [
      {
        id: 'total-accounts',
        icon: 'Users',
        title: 'Total Accounts',
        value: (managerAccounts + staffAccounts).toLocaleString(),
        description: 'Active and inactive manager and staff accounts',
        tone: 'gold',
      },
      {
        id: 'manager-accounts',
        icon: 'UserCheck',
        title: 'Managers',
        value: managerAccounts.toLocaleString(),
        description: 'Manager accounts',
        tone: 'emerald',
      },
      {
        id: 'staff-accounts',
        icon: 'UserPlus',
        title: 'Staff Accounts',
        value: staffAccounts.toLocaleString(),
        description: 'Staff accounts linked to staff profiles',
        tone: 'sky',
      },
      {
        id: 'inactive-accounts',
        icon: 'UserX',
        title: 'Inactive Accounts',
        value: inactiveAccounts.toLocaleString(),
        description: 'Deactivated manager and staff accounts',
        tone: 'rose',
      },
    ];
  }

  async findAll(query: UsersQueryDto): Promise<ListResponse<User>> {
    const { search, role, isActive, page, limit } = query;
    const where: Prisma.UserWhereInput = {
      role: role ?? { in: [UserRole.MANAGER, UserRole.STAFF] },
      softDeletedAt: null,
      ...(isActive !== undefined && { isActive }),
      ...(search && {
        OR: [
          { fullName: { contains: search, mode: 'insensitive' } },
          { email: { contains: search, mode: 'insensitive' } },
        ],
      }),
    };

    const [users, total] = await this.prismaService.$transaction([
      this.prismaService.user.findMany({
        where,
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
      this.prismaService.user.count({ where }),
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

  async updateMyProfile(
    id: string,
    dto: UpdateMyProfileDto,
  ): Promise<UpdateUser> {
    const existingUser = await this.prismaService.user.findFirst({
      where: { id, softDeletedAt: null },
      select: { id: true, email: true },
    });

    if (!existingUser) {
      throw new NotFoundException(USER_ERROR_MSG.NOT_FOUND);
    }

    const email = dto.email?.trim().toLowerCase();
    if (email && email !== existingUser.email) {
      await this.ensureEmailAvailable(email, id);
    }

    try {
      const updatedUser = await this.prismaService.user.update({
        where: { id },
        data: {
          ...(dto.fullName !== undefined && { fullName: dto.fullName.trim() }),
          ...(email && { email }),
          ...(dto.phone !== undefined && { phone: dto.phone.trim() }),
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

      return updatedUser;
    } catch (error) {
      if (this.isPrismaError(error, 'P2002')) {
        throw new ConflictException(USER_ERROR_MSG.CONFLICT_EMAIL);
      }
      throw error;
    }
  }

  async update(id: string, dto: UpdateUserDto): Promise<UpdateUser> {
    const existingUser = await this.prismaService.user.findFirst({
      where: {
        id,
        softDeletedAt: null,
        role: { in: [UserRole.MANAGER, UserRole.STAFF] },
      },
      select: {
        id: true,
        email: true,
        role: true,
        staff: { select: { userId: true } },
      },
    });

    if (!existingUser) {
      throw new NotFoundException(USER_ERROR_MSG.NOT_FOUND);
    }

    const nextRole = dto.role ?? existingUser.role;

    const email = dto.email?.trim().toLowerCase();
    if (email && email !== existingUser.email) {
      await this.ensureEmailAvailable(email, id);
    }

    try {
      return await this.prismaService.$transaction(async (tx) => {
        const updatedUser = await tx.user.update({
          where: { id },
          data: {
            ...(dto.fullName !== undefined && {
              fullName: dto.fullName.trim(),
            }),
            ...(email && { email }),
            ...(dto.phone !== undefined && { phone: dto.phone.trim() }),
            role: nextRole,
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

        return updatedUser;
      });
    } catch (error) {
      if (this.isPrismaError(error, 'P2002')) {
        throw new ConflictException(USER_ERROR_MSG.CONFLICT_EMAIL);
      }
      throw error;
    }
  }

  async updateStatus(id: string, isActive: boolean): Promise<UpdateUser> {
    try {
      return await this.prismaService.$transaction(
        async (tx) => {
          const existingUser = await tx.user.findFirst({
            where: { id, softDeletedAt: null },
            select: { id: true, role: true, isActive: true },
          });

          if (!existingUser || existingUser.role === UserRole.CUSTOMER) {
            throw new NotFoundException(USER_ERROR_MSG.NOT_FOUND);
          }

          if (
            existingUser.role === UserRole.ADMIN &&
            existingUser.isActive &&
            !isActive
          ) {
            const activeAdminCount = await tx.user.count({
              where: {
                role: UserRole.ADMIN,
                isActive: true,
                softDeletedAt: null,
              },
            });

            if (activeAdminCount <= 1) {
              throw new ConflictException(USER_ERROR_MSG.LAST_ACTIVE_ADMIN);
            }
          }

          const updateResult = await tx.user.updateMany({
            where: {
              id,
              isActive: existingUser.isActive,
              softDeletedAt: null,
            },
            data: { isActive },
          });

          if (updateResult.count !== 1) {
            throw new ConflictException(USER_ERROR_MSG.STATUS_CHANGED);
          }

          return tx.user.findUniqueOrThrow({
            where: { id },
            select: {
              id: true,
              fullName: true,
              email: true,
              phone: true,
              role: true,
              isActive: true,
            },
          });
        },
        { isolationLevel: Prisma.TransactionIsolationLevel.Serializable },
      );
    } catch (error) {
      if (this.isPrismaError(error, 'P2034')) {
        throw new ConflictException(USER_ERROR_MSG.LAST_ACTIVE_ADMIN);
      }
      throw error;
    }
  }

  async delete(id: string): Promise<void> {
    try {
      await this.prismaService.$transaction(
        async (tx) => {
          const user = await tx.user.findFirst({
            where: { id, softDeletedAt: null },
            select: { id: true, role: true, isActive: true },
          });

          if (!user) {
            throw new NotFoundException(USER_ERROR_MSG.NOT_FOUND);
          }

          if (user.role !== UserRole.ADMIN && user.isActive) {
            const activeAdminCount = await tx.user.count({
              where: {
                role: UserRole.ADMIN,
                isActive: true,
                softDeletedAt: null,
              },
            });

            if (activeAdminCount <= 1) {
              throw new ConflictException(
                USER_ERROR_MSG.DELETE_LAST_ACTIVE_ADMIN,
              );
            }
          }

          const result = await tx.user.updateMany({
            where: {
              id,
              isActive: user.isActive,
              softDeletedAt: null,
            },
            data: {
              isActive: false,
              softDeletedAt: new Date(),
            },
          });

          if (result.count !== 1) {
            throw new ConflictException(USER_ERROR_MSG.STATUS_CHANGED);
          }
        },
        { isolationLevel: Prisma.TransactionIsolationLevel.Serializable },
      );
    } catch (error) {
      if (this.isPrismaError(error, 'P2034')) {
        throw new ConflictException(USER_ERROR_MSG.STATUS_CHANGED);
      }
      throw error;
    }
  }

  private mapUserDetails(user: UserDetailRecord): UserDetails {
    return {
      id: user.id,
      fullName: user.fullName,
      email: user.email,
      phone: user.phone,
      role: user.role,
      isActive: user.isActive,
      createdAt: user.createdAt.toISOString(),
      lastLoginAt: user.lastLoginAt?.toISOString() ?? null,
      ...(user.staff && { category: user.staff.category }),
      avatar: user.profile,
    };
  }

  private async ensureEmailAvailable(
    email: string,
    currentUserId?: string,
  ): Promise<void> {
    const existingUser = await this.prismaService.user.findUnique({
      where: { email },
      select: { id: true },
    });

    if (existingUser && existingUser.id !== currentUserId) {
      throw new ConflictException(USER_ERROR_MSG.CONFLICT_EMAIL);
    }
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
