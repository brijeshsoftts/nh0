import {
  ConflictException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { PrismaService } from '../../prisma/prisma.service';
import { ListResponse } from '../../types/api.types';
import {
  Category,
  HousekeepingStatus,
  Prisma,
  TaskStatus,
  UserRole,
} from '../../types/prisma.types';
import { StatItem } from '../../types/shared.types';

import { CreateTaskDto } from './dto/create-task.dto';
import { TasksQueryDto } from './dto/tasks-query.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { TASK_ERROR_MSG } from './tasks.constants';
import { TaskItem } from './tasks.types';

@Injectable()
export class TasksService {
  constructor(private readonly prismaService: PrismaService) {}

  async getStats(userId: string, role: UserRole): Promise<StatItem[]> {
    let assignedTo: string | undefined;

    if (role === UserRole.STAFF) {
      const staff = await this.prismaService.staff.findUnique({
        where: { userId },
        select: { category: true },
      });

      if (staff?.category !== Category.HOUSEKEEPER) {
        throw new ForbiddenException('Access denied');
      }

      assignedTo = userId;
    }

    const where: Prisma.HousekeepingTaskWhereInput = {
      ...(assignedTo && { assignedTo }),
    };

    const [pendingTasks, inProgressTasks, completedTasks] =
      await this.prismaService.$transaction([
        this.prismaService.housekeepingTask.count({
          where: { ...where, status: TaskStatus.PENDING },
        }),
        this.prismaService.housekeepingTask.count({
          where: { ...where, status: TaskStatus.IN_PROGRESS },
        }),
        this.prismaService.housekeepingTask.count({
          where: { ...where, status: TaskStatus.COMPLETED },
        }),
      ]);
    const total = pendingTasks + inProgressTasks + completedTasks;

    return [
      {
        id: 'totalTasks',
        title: 'Total Tasks',
        value: String(total),
        description: 'Tasks scheduled for today',
        icon: 'clipboard-list',
        link: '/tasks',
        tone: 'sky',
      },
      {
        id: 'pendingTasks',
        title: 'Pending Tasks',
        value: String(pendingTasks),
        description: 'Waiting to be started',
        icon: 'clock',
        link: '/tasks?status=pending',
        tone: 'gold',
      },
      {
        id: 'inProgressTasks',
        title: 'In Progress',
        value: String(inProgressTasks),
        description: 'Tasks currently underway',
        icon: 'loader-circle',
        link: '/tasks?status=in_progress',
        tone: 'violet',
      },
      {
        id: 'completedTasks',
        title: 'Completed',
        value: String(completedTasks),
        description: 'Tasks finished today',
        icon: 'circle-check',
        link: '/tasks?status=completed',
        tone: 'emerald',
      },
    ];
  }

  async create(dto: CreateTaskDto): Promise<TaskItem> {
    const [room, staff] = await Promise.all([
      this.prismaService.room.findUnique({
        where: { id: dto.roomId },
        select: { id: true },
      }),
      this.prismaService.staff.findUnique({
        where: { userId: dto.assignedTo },
        select: {
          category: true,
          user: {
            select: {
              isActive: true,
              softDeletedAt: true,
            },
          },
        },
      }),
    ]);

    if (!room) {
      throw new NotFoundException(TASK_ERROR_MSG.ROOM_NOT_FOUND);
    }
    if (
      staff?.category !== Category.HOUSEKEEPER ||
      !staff.user.isActive ||
      staff.user.softDeletedAt
    ) {
      throw new NotFoundException(TASK_ERROR_MSG.HOUSEKEEPER_NOT_FOUND);
    }

    const task = await this.prismaService.$transaction(async (tx) => {
      const createdTask = await tx.housekeepingTask.create({
        data: {
          roomId: dto.roomId,
          assignedTo: dto.assignedTo,
          taskType: dto.taskType,
          scheduledDate: dto.scheduledDate,
        },
        select: {
          id: true,
          taskType: true,
          status: true,
          scheduledDate: true,
          startedAt: true,
          completedAt: true,
          room: { select: { id: true, roomNumber: true } },
          assignee: { select: { id: true, fullName: true } },
        },
      });

      await this.syncRoomHousekeepingStatus(tx, dto.roomId);

      return createdTask;
    });

    return {
      ...task,
      scheduledDate: task.scheduledDate.toISOString(),
      startedAt: task.startedAt?.toISOString() ?? null,
      completedAt: task.completedAt?.toISOString() ?? null,
    };
  }

  async update(id: string, dto: UpdateTaskDto): Promise<TaskItem> {
    const [existingTask, room, staff] = await Promise.all([
      this.prismaService.housekeepingTask.findUnique({
        where: { id },
        select: { id: true },
      }),
      dto.roomId
        ? this.prismaService.room.findUnique({
            where: { id: dto.roomId },
            select: { id: true },
          })
        : null,
      dto.assignedTo
        ? this.prismaService.staff.findUnique({
            where: { userId: dto.assignedTo },
            select: {
              category: true,
              user: {
                select: {
                  isActive: true,
                  softDeletedAt: true,
                },
              },
            },
          })
        : null,
    ]);

    if (!existingTask) {
      throw new NotFoundException(TASK_ERROR_MSG.NOT_FOUND);
    }

    if (dto.roomId && !room) {
      throw new NotFoundException(TASK_ERROR_MSG.ROOM_NOT_FOUND);
    }

    if (
      dto.assignedTo &&
      (staff?.category !== Category.HOUSEKEEPER ||
        !staff.user.isActive ||
        staff.user.softDeletedAt)
    ) {
      throw new NotFoundException(TASK_ERROR_MSG.HOUSEKEEPER_NOT_FOUND);
    }

    const task = await this.prismaService.housekeepingTask.update({
      where: { id },
      data: {
        ...(dto.roomId && { roomId: dto.roomId }),
        ...(dto.assignedTo && { assignedTo: dto.assignedTo }),
        ...(dto.taskType && { taskType: dto.taskType }),
        ...(dto.scheduledDate && { scheduledDate: dto.scheduledDate }),
      },
      select: {
        id: true,
        taskType: true,
        status: true,
        scheduledDate: true,
        startedAt: true,
        completedAt: true,
        room: { select: { id: true, roomNumber: true } },
        assignee: { select: { id: true, fullName: true } },
      },
    });

    return {
      ...task,
      scheduledDate: task.scheduledDate.toISOString(),
      startedAt: task.startedAt?.toISOString() ?? null,
      completedAt: task.completedAt?.toISOString() ?? null,
    };
  }

  async updateStatus(
    id: string,
    status: TaskStatus,
    userId: string,
    role: UserRole,
  ): Promise<TaskItem> {
    if (role === UserRole.STAFF) {
      const staff = await this.prismaService.staff.findUnique({
        where: { userId },
        select: { category: true },
      });

      if (staff?.category !== Category.HOUSEKEEPER) {
        throw new ForbiddenException('Access denied');
      }
    }

    const previousStatus =
      status === TaskStatus.IN_PROGRESS
        ? TaskStatus.PENDING
        : status === TaskStatus.COMPLETED
          ? TaskStatus.IN_PROGRESS
          : undefined;

    if (!previousStatus) {
      throw new ConflictException(TASK_ERROR_MSG.STATUS_TRANSITION_INVALID);
    }

    const now = new Date();
    const task = await this.prismaService.$transaction(async (tx) => {
      const currentTask = await tx.housekeepingTask.findUnique({
        where: { id },
        select: { status: true, assignedTo: true, roomId: true },
      });

      if (!currentTask) {
        throw new NotFoundException(TASK_ERROR_MSG.NOT_FOUND);
      }

      if (role === UserRole.STAFF && currentTask.assignedTo !== userId) {
        throw new ForbiddenException(TASK_ERROR_MSG.HOUSEKEEPER_TASK_FORBIDDEN);
      }

      if (currentTask.status !== previousStatus) {
        throw new ConflictException(TASK_ERROR_MSG.STATUS_TRANSITION_INVALID);
      }

      const result = await tx.housekeepingTask.updateMany({
        where: {
          id,
          status: previousStatus,
          ...(role === UserRole.STAFF && { assignedTo: userId }),
        },
        data: {
          status,
          ...(status === TaskStatus.IN_PROGRESS && { startedAt: now }),
          ...(status === TaskStatus.COMPLETED && { completedAt: now }),
        },
      });

      if (result.count === 0) {
        throw new ConflictException(TASK_ERROR_MSG.STATUS_TRANSITION_INVALID);
      }

      await this.syncRoomHousekeepingStatus(tx, currentTask.roomId);

      const updatedTask = await tx.housekeepingTask.findUnique({
        where: { id },
        select: {
          id: true,
          taskType: true,
          status: true,
          scheduledDate: true,
          startedAt: true,
          completedAt: true,
          room: { select: { id: true, roomNumber: true } },
          assignee: { select: { id: true, fullName: true } },
        },
      });

      if (!updatedTask) {
        throw new NotFoundException(TASK_ERROR_MSG.NOT_FOUND);
      }

      return updatedTask;
    });

    return {
      ...task,
      scheduledDate: task.scheduledDate.toISOString(),
      startedAt: task.startedAt?.toISOString() ?? null,
      completedAt: task.completedAt?.toISOString() ?? null,
    };
  }

  private async syncRoomHousekeepingStatus(
    tx: Prisma.TransactionClient,
    roomId: string,
  ): Promise<void> {
    const activeTasks = await tx.housekeepingTask.findMany({
      where: {
        roomId,
        status: { in: [TaskStatus.PENDING, TaskStatus.IN_PROGRESS] },
      },
      select: { status: true },
    });

    const housekeepingStatus = activeTasks.some(
      (task) => task.status === TaskStatus.IN_PROGRESS,
    )
      ? HousekeepingStatus.CLEANING
      : activeTasks.length > 0
        ? HousekeepingStatus.DIRTY
        : HousekeepingStatus.CLEAN;

    await tx.room.update({
      where: { id: roomId },
      data: { housekeepingStatus },
      select: { id: true },
    });
  }

  async delete(id: string): Promise<void> {
    try {
      await this.prismaService.housekeepingTask.delete({
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
        throw new NotFoundException(TASK_ERROR_MSG.NOT_FOUND);
      }

      throw error;
    }
  }

  async findAll(
    query: TasksQueryDto,
    userId: string,
    role: UserRole,
  ): Promise<ListResponse<TaskItem>> {
    if (role === UserRole.STAFF) {
      const staff = await this.prismaService.staff.findUnique({
        where: { userId },
        select: { category: true },
      });

      if (staff?.category !== Category.HOUSEKEEPER) {
        throw new ForbiddenException('Access denied');
      }
    }

    const where: Prisma.HousekeepingTaskWhereInput = {
      ...(role === UserRole.STAFF && { assignedTo: userId }),
      ...(query.taskType && { taskType: query.taskType }),
      ...(query.status && { status: query.status }),
      ...(query.search && {
        OR: [
          {
            room: {
              is: {
                roomNumber: {
                  contains: query.search,
                  mode: 'insensitive',
                },
              },
            },
          },
          {
            room: {
              is: {
                name: { contains: query.search, mode: 'insensitive' },
              },
            },
          },
          {
            assignee: {
              is: {
                fullName: { contains: query.search, mode: 'insensitive' },
              },
            },
          },
        ],
      }),
    };

    const [tasks, total] = await this.prismaService.$transaction([
      this.prismaService.housekeepingTask.findMany({
        where,
        skip: (query.page - 1) * query.limit,
        take: query.limit,
        orderBy: { scheduledDate: 'asc' },
        select: {
          id: true,
          taskType: true,
          status: true,
          scheduledDate: true,
          startedAt: true,
          completedAt: true,
          room: { select: { id: true, roomNumber: true } },
          assignee: { select: { id: true, fullName: true } },
        },
      }),
      this.prismaService.housekeepingTask.count({ where }),
    ]);

    return {
      data: tasks.map((task) => ({
        ...task,
        scheduledDate: task.scheduledDate.toISOString(),
        startedAt: task.startedAt?.toISOString() ?? null,
        completedAt: task.completedAt?.toISOString() ?? null,
      })),
      meta: { page: query.page, limit: query.limit, total },
    };
  }
}
