import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { hashPassword } from '../../common/helpers';
import { PrismaService } from '../../prisma/prisma.service';
import { ListResponse } from '../../types/api.types';
import {
  Category,
  Prisma,
  TaskStatus,
  UserRole,
} from '../../types/prisma.types';
import { StatItem } from '../../types/shared.types';

import { CreateStaffDto } from './dto/create-staff.dto';
import { StaffQueryDto } from './dto/staff-query.dto';
import { UpdateStaffDto } from './dto/update-staff.dto';
import { STAFF_ERROR_MSG } from './staff.constants';
import {
  CreateStaff,
  DeleteStaffResult,
  StaffDetails,
  StaffItem,
  UpdateStaffResponse,
} from './staff.types';

const ACTIVE_TASK_STATUSES = [TaskStatus.PENDING, TaskStatus.IN_PROGRESS];

const STAFF_LIST_SELECT = {
  id: true,
  category: true,
  createdAt: true,
  user: {
    select: {
      fullName: true,
      email: true,
      phone: true,
      isActive: true,
      _count: {
        select: {
          housekeepingTasks: {
            where: { status: { in: ACTIVE_TASK_STATUSES } },
          },
        },
      },
    },
  },
} satisfies Prisma.StaffSelect;

const STAFF_DETAILS_SELECT = {
  id: true,
  fatherName: true,
  motherName: true,
  idProofNumber: true,
  qualification: true,
  experience: true,
  category: true,
  emergencyContact: true,
  address: true,
  createdAt: true,
  user: {
    select: {
      id: true,
      fullName: true,
      email: true,
      phone: true,
      isActive: true,
      lastLoginAt: true,
      housekeepingTasks: {
        orderBy: { scheduledDate: 'desc' },
        select: {
          id: true,
          taskType: true,
          status: true,
          scheduledDate: true,
          room: { select: { id: true, roomNumber: true, name: true } },
        },
      },
    },
  },
} satisfies Prisma.StaffSelect;

type StaffListRecord = Prisma.StaffGetPayload<{
  select: typeof STAFF_LIST_SELECT;
}>;
type StaffDetailsRecord = Prisma.StaffGetPayload<{
  select: typeof STAFF_DETAILS_SELECT;
}>;

@Injectable()
export class StaffService {
  constructor(private readonly prismaService: PrismaService) {}

  async getStats(): Promise<StatItem[]> {
    const categories = Object.values(Category);
    const [total, active, inactive, categoryCounts] = await Promise.all([
      this.prismaService.staff.count({
        where: { user: { is: { softDeletedAt: null } } },
      }),
      this.prismaService.staff.count({
        where: { user: { is: { softDeletedAt: null, isActive: true } } },
      }),
      this.prismaService.staff.count({
        where: { user: { is: { softDeletedAt: null, isActive: false } } },
      }),
      this.prismaService.staff.groupBy({
        by: ['category'],
        where: { user: { is: { softDeletedAt: null } } },
        _count: { _all: true },
      }),
    ]);
    const categoryCountMap = new Map(
      categoryCounts.map(({ category, _count }) => [category, _count._all]),
    );
    const topCategory = categories
      .map((category) => ({
        category,
        count: categoryCountMap.get(category) ?? 0,
      }))
      .sort((first, second) => second.count - first.count)[0];

    return [
      {
        id: 'total-staff',
        icon: 'Users',
        title: 'Total Staff',
        value: total.toLocaleString(),
        description: 'Operational staff accounts',
        tone: 'gold',
      },
      {
        id: 'active-staff',
        icon: 'UserCheck',
        title: 'Active',
        value: active.toLocaleString(),
        description: 'Staff accounts currently active',
        tone: 'emerald',
      },
      {
        id: 'inactive-staff',
        icon: 'UserX',
        title: 'Inactive',
        value: inactive.toLocaleString(),
        description: 'Staff accounts currently inactive',
        tone: 'rose',
      },
      {
        id: `staff-${topCategory.category.toLowerCase()}`,
        icon: 'Users',
        title: this.getCategoryLabel(topCategory.category),
        value: topCategory.count.toLocaleString(),
        description: 'Largest staff category',
        link: `staff?category=${topCategory.category}`,
        tone: 'sky',
      },
    ];
  }

  async findAll(query: StaffQueryDto): Promise<ListResponse<StaffItem>> {
    const { search, category, isActive, taskAssignment, page, limit } = query;
    const where: Prisma.StaffWhereInput = {
      ...(category && { category }),
      user: {
        is: {
          softDeletedAt: null,
          ...(isActive !== undefined && { isActive }),
          ...(search && {
            OR: [
              { fullName: { contains: search, mode: 'insensitive' } },
              { phone: { contains: search, mode: 'insensitive' } },
              { email: { contains: search, mode: 'insensitive' } },
            ],
          }),
          ...(taskAssignment === 'ASSIGNED' && {
            housekeepingTasks: {
              some: { status: { in: ACTIVE_TASK_STATUSES } },
            },
          }),
          ...(taskAssignment === 'UNASSIGNED' && {
            housekeepingTasks: {
              none: { status: { in: ACTIVE_TASK_STATUSES } },
            },
          }),
        },
      },
    };

    const [staff, total] = await this.prismaService.$transaction([
      this.prismaService.staff.findMany({
        where,
        select: STAFF_LIST_SELECT,
        orderBy: { createdAt: 'desc' },
        skip: (page - 1) * limit,
        take: limit,
      }),
      this.prismaService.staff.count({ where }),
    ]);

    return {
      data: staff.map((member) => this.mapListItem(member)),
      meta: { page, limit, total },
    };
  }

  async findOne(id: string): Promise<StaffDetails> {
    const staff = await this.prismaService.staff.findFirst({
      where: { id, user: { is: { softDeletedAt: null } } },
      select: STAFF_DETAILS_SELECT,
    });

    if (!staff) {
      throw new NotFoundException(STAFF_ERROR_MSG.NOT_FOUND);
    }

    return this.mapDetails(staff);
  }

  async create(dto: CreateStaffDto): Promise<CreateStaff> {
    const passwordHash = await hashPassword('Admin@1234');

    try {
      const user = await this.prismaService.user.create({
        data: {
          fullName: dto.fullName.trim(),
          email: dto.email.trim().toLowerCase(),
          phone: dto.phone.trim(),
          passwordHash,
          role: UserRole.STAFF,
          staff: {
            create: {
              fatherName: dto.fatherName,
              motherName: dto.motherName,
              idProofNumber: dto.idProofNumber,
              qualification: dto.qualification,
              experience: dto.experience,
              category: dto.category,
              emergencyContact: dto.emergencyContact,
              address: dto.address,
            },
          },
        },
        select: {
          id: true,
          fullName: true,
          email: true,
          phone: true,
          isActive: true,
          staff: { select: { id: true, category: true } },
        },
      });

      return {
        id: user.id,
        staffId: user.staff?.id ?? null,
        userId: user.id,
        fullName: user.fullName,
        email: user.email,
        phone: user.phone,
        category: user.staff?.category ?? null,
        isActive: user.isActive,
      };
    } catch (error) {
      if (this.isPrismaError(error, 'P2002')) {
        throw new ConflictException(STAFF_ERROR_MSG.EMAIL_CONFLICT);
      }
      throw error;
    }
  }

  async update(id: string, dto: UpdateStaffDto): Promise<UpdateStaffResponse> {
    const existingStaff = await this.prismaService.staff.findFirst({
      where: { id, user: { is: { softDeletedAt: null } } },
      select: { id: true, userId: true },
    });

    if (!existingStaff) {
      throw new NotFoundException(STAFF_ERROR_MSG.NOT_FOUND);
    }

    const email = dto.email?.trim().toLowerCase();
    try {
      const updated = await this.prismaService.$transaction(async (tx) => {
        const [user, staff] = await Promise.all([
          tx.user.update({
            where: { id: existingStaff.userId },
            data: {
              ...(dto.fullName !== undefined && {
                fullName: dto.fullName.trim(),
              }),
              ...(email && { email }),
              ...(dto.phone !== undefined && { phone: dto.phone.trim() }),
            },
            select: {
              id: true,
              fullName: true,
              email: true,
              phone: true,
              isActive: true,
            },
          }),
          tx.staff.update({
            where: { id },
            data: {
              ...(dto.fatherName !== undefined && {
                fatherName: dto.fatherName,
              }),
              ...(dto.motherName !== undefined && {
                motherName: dto.motherName,
              }),
              ...(dto.idProofNumber !== undefined && {
                idProofNumber: dto.idProofNumber,
              }),
              ...(dto.qualification !== undefined && {
                qualification: dto.qualification,
              }),
              ...(dto.experience !== undefined && {
                experience: dto.experience,
              }),
              ...(dto.category !== undefined && { category: dto.category }),
              ...(dto.emergencyContact !== undefined && {
                emergencyContact: dto.emergencyContact,
              }),
              ...(dto.address !== undefined && { address: dto.address }),
            },
            select: { id: true, category: true },
          }),
        ]);

        return { user, staff };
      });

      return {
        id: updated.staff.id,
        staffId: updated.staff.id,
        userId: updated.user.id,
        fullName: updated.user.fullName,
        email: updated.user.email,
        phone: updated.user.phone,
        category: updated.staff.category,
        isActive: updated.user.isActive,
      };
    } catch (error) {
      if (this.isPrismaError(error, 'P2002')) {
        throw new ConflictException(STAFF_ERROR_MSG.EMAIL_CONFLICT);
      }
      if (this.isPrismaError(error, 'P2025')) {
        throw new NotFoundException(STAFF_ERROR_MSG.NOT_FOUND);
      }
      throw error;
    }
  }

  async updateStatus(id: string, isActive: boolean): Promise<void> {
    const staff = await this.prismaService.staff.findFirst({
      where: { id, user: { is: { softDeletedAt: null } } },
      select: { userId: true },
    });

    if (!staff) {
      throw new NotFoundException(STAFF_ERROR_MSG.NOT_FOUND);
    }

    await this.prismaService.user.update({
      where: { id: staff.userId },
      data: { isActive },
      select: { id: true },
    });
  }

  async delete(id: string): Promise<DeleteStaffResult> {
    const staff = await this.prismaService.staff.findFirst({
      where: { id, user: { is: { softDeletedAt: null } } },
      select: {
        userId: true,
        user: {
          select: {
            customer: { select: { id: true } },
            _count: {
              select: {
                bookings: true,
                createdBookings: true,
                housekeepingTasks: true,
                housekeeperAssignments: true,
                assignedAssignments: true,
                invoices: true,
                paymentsAsCustomer: true,
                paymentsRecorded: true,
                reportedIssues: true,
                assignedIssues: true,
                reviews: true,
                notifications: true,
                auditLogs: true,
              },
            },
          },
        },
      },
    });

    if (!staff) {
      throw new NotFoundException(STAFF_ERROR_MSG.NOT_FOUND);
    }

    const hasHistory =
      staff.user.customer !== null ||
      Object.values(staff.user._count).some((count) => count > 0);

    if (hasHistory) {
      await this.prismaService.user.update({
        where: { id: staff.userId },
        data: { isActive: false },
        select: { id: true },
      });
      return 'DEACTIVATED';
    }

    try {
      await this.prismaService.user.delete({
        where: { id: staff.userId },
        select: { id: true },
      });
      return 'DELETED';
    } catch (error) {
      if (this.isPrismaError(error, 'P2003')) {
        await this.prismaService.user.update({
          where: { id: staff.userId },
          data: { isActive: false },
          select: { id: true },
        });
        return 'DEACTIVATED';
      }
      throw error;
    }
  }

  private mapListItem(staff: StaffListRecord): StaffItem {
    return {
      id: staff.id,
      staffId: staff.id,
      fullName: staff.user.fullName,
      email: staff.user.email,
      phone: staff.user.phone,
      category: staff.category,
      isActive: staff.user.isActive,
      assignedTasks: staff.user._count.housekeepingTasks,
      createdAt: staff.createdAt.toISOString(),
    };
  }

  private mapDetails(staff: StaffDetailsRecord): StaffDetails {
    return {
      id: staff.id,
      staffId: staff.id,
      category: staff.category,
      fatherName: staff.fatherName,
      motherName: staff.motherName,
      idProofNumber: staff.idProofNumber,
      qualification: staff.qualification,
      experience: staff.experience,
      emergencyContact: staff.emergencyContact,
      address: staff.address,
      createdAt: staff.createdAt.toISOString(),
      user: {
        id: staff.user.id,
        fullName: staff.user.fullName,
        email: staff.user.email,
        phone: staff.user.phone,
        isActive: staff.user.isActive,
        lastLoginAt: staff.user.lastLoginAt?.toISOString() ?? null,
      },
      assignedTasks: staff.user.housekeepingTasks.map((task) => ({
        ...task,
        scheduledDate: task.scheduledDate.toISOString(),
      })),
    };
  }

  private getCategoryLabel(category: Category): string {
    return {
      [Category.RECEPTIONIST]: 'Receptionists',
      [Category.HOUSEKEEPER]: 'Housekeepers',
    }[category];
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
