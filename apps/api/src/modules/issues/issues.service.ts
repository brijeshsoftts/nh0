import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { PrismaService } from '../../prisma/prisma.service';
import { ListResponse } from '../../types/api.types';
import {
  BookingStatus,
  IssuePriority,
  IssueStatus,
  NotificationType,
  Prisma,
  UserRole,
} from '../../types/prisma.types';
import { StatItem } from '../../types/shared.types';
import { NotificationsService } from '../notifications/notifications.service';
import { lockRoom } from '../rooms/room-status-lifecycle';

import { CreateIssueDto } from './dto/create-issue.dto';
import { IssuesQueryDto } from './dto/issues-query.dto';
import { UpdateIssueDto } from './dto/update-issue.dto';
import { ISSUE_ERROR_MSG } from './issue.constants';
import { CreateIssue, IssueDetails, IssueItem } from './issues.types';

const ISSUE_DETAILS_SELECT = {
  id: true,
  reference: true,
  title: true,
  description: true,
  category: true,
  priority: true,
  status: true,
  reportedAt: true,
  startedAt: true,
  completedAt: true,
  resolvedAt: true,
  createdAt: true,
  updatedAt: true,
  room: {
    select: { id: true, roomNumber: true, name: true, floor: true },
  },
  reporter: { select: { id: true, fullName: true } },
  assignee: { select: { id: true, fullName: true } },
  image: { select: { id: true, url: true, altText: true } },
} satisfies Prisma.IssueSelect;

type IssueDetailsRecord = Prisma.IssueGetPayload<{
  select: typeof ISSUE_DETAILS_SELECT;
}>;

@Injectable()
export class IssuesService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly notificationsService: NotificationsService,
  ) {}

  async getStats(userId: string, role: UserRole): Promise<StatItem[]> {
    const isCustomer = role === UserRole.CUSTOMER;
    const where: Prisma.IssueWhereInput = isCustomer
      ? { reportedById: userId }
      : {};

    const [total, medium, high, urgent] = await this.prismaService.$transaction(
      [
        this.prismaService.issue.count({ where }),
        this.prismaService.issue.count({
          where: { ...where, priority: IssuePriority.MEDIUM },
        }),
        this.prismaService.issue.count({
          where: { ...where, priority: IssuePriority.HIGH },
        }),
        this.prismaService.issue.count({
          where: { ...where, priority: IssuePriority.URGENT },
        }),
      ],
    );

    return [
      {
        id: 'total-issues',
        title: 'Total Issues',
        value: total.toLocaleString(),
        description: isCustomer ? 'Issues you reported' : 'All reported issues',
        icon: 'ClipboardList',
        link: '/issues',
        tone: 'sky',
      },
      {
        id: 'medium-issues',
        title: 'Medium Priority',
        value: medium.toLocaleString(),
        description: isCustomer
          ? 'Your medium-priority issues'
          : 'Issues with medium priority',
        icon: 'CircleAlert',
        link: '/issues?priority=MEDIUM',
        tone: 'gold',
      },
      {
        id: 'high-issues',
        title: 'High Priority',
        value: high.toLocaleString(),
        description: isCustomer
          ? 'Your high-priority issues'
          : 'Issues with high priority',
        icon: 'TriangleAlert',
        link: '/issues?priority=HIGH',
        tone: 'rose',
      },
      {
        id: 'urgent-issues',
        title: 'Urgent Priority',
        value: urgent.toLocaleString(),
        description: isCustomer
          ? 'Your urgent issues'
          : 'Issues requiring urgent attention',
        icon: 'Siren',
        link: '/issues?priority=URGENT',
        tone: 'violet',
      },
    ];
  }

  async findOne(
    id: string,
    userId: string,
    role: UserRole,
  ): Promise<IssueDetails> {
    const issue = await this.prismaService.issue.findFirst({
      where: {
        id,
        ...(role === UserRole.CUSTOMER && { reportedById: userId }),
      },
      select: ISSUE_DETAILS_SELECT,
    });

    if (!issue) {
      throw new NotFoundException(ISSUE_ERROR_MSG.NOT_FOUND);
    }

    return this.mapIssueDetails(issue);
  }

  async update(
    id: string,
    dto: UpdateIssueDto,
    updatedById: string,
  ): Promise<IssueDetails> {
    return this.prismaService.$transaction(async (tx) => {
      const issueReference = await tx.issue.findUnique({
        where: { id },
        select: { roomId: true },
      });

      if (!issueReference) {
        throw new NotFoundException(ISSUE_ERROR_MSG.NOT_FOUND);
      }

      await lockRoom(tx, issueReference.roomId);

      const issue = await tx.issue.findUnique({
        where: { id },
        select: {
          roomId: true,
          reportedById: true,
          assignedToId: true,
          status: true,
          title: true,
          description: true,
          category: true,
          priority: true,
          startedAt: true,
          completedAt: true,
          resolvedAt: true,
        },
      });

      if (!issue) {
        throw new NotFoundException(ISSUE_ERROR_MSG.NOT_FOUND);
      }

      if (dto.status === issue.status && Object.keys(dto).length === 1) {
        throw new BadRequestException(ISSUE_ERROR_MSG.STATUS_UNCHANGED);
      }

      const changedFields = (
        ['title', 'description', 'category', 'priority', 'status'] as const
      ).filter(
        (field) => dto[field] !== undefined && dto[field] !== issue[field],
      );
      const assignmentChanged =
        dto.assignedToId !== undefined &&
        dto.assignedToId !== issue.assignedToId;

      if (assignmentChanged && dto.assignedToId) {
        const assignee = await tx.staff.findFirst({
          where: {
            userId: dto.assignedToId,
            user: { isActive: true, softDeletedAt: null },
          },
          select: { userId: true },
        });
        if (!assignee) {
          throw new NotFoundException('Issue assignee not found.');
        }
      }

      const timestamp = new Date();
      const result = await tx.issue.updateMany({
        where: { id, roomId: issue.roomId, status: issue.status },
        data: {
          ...dto,
          ...(dto.status === IssueStatus.IN_PROGRESS &&
            !issue.startedAt && { startedAt: timestamp }),
          ...(dto.status === IssueStatus.COMPLETED &&
            !issue.completedAt && { completedAt: timestamp }),
          ...(dto.status === IssueStatus.RESOLVED &&
            !issue.resolvedAt && { resolvedAt: timestamp }),
        },
      });

      if (result.count !== 1) {
        throw new ConflictException(ISSUE_ERROR_MSG.CHANGED);
      }

      const updated = await tx.issue.findUnique({
        where: { id },
        select: ISSUE_DETAILS_SELECT,
      });

      if (!updated) {
        throw new NotFoundException(ISSUE_ERROR_MSG.NOT_FOUND);
      }

      if (changedFields.length > 0 || assignmentChanged) {
        const updater = await tx.user.findUnique({
          where: { id: updatedById },
          select: { fullName: true },
        });
        const updaterName = updater?.fullName ?? 'A staff member';

        if (assignmentChanged && updated.assignee?.id !== updatedById) {
          await this.notificationsService.createForUsers(tx, {
            userIds: updated.assignee ? [updated.assignee.id] : [],
            type: NotificationType.ISSUE_ASSIGNED,
            title: 'Issue assigned to you',
            message: `Issue ${updated.reference}: ${updated.title} (${updated.category}, ${updated.priority}) was assigned to you by ${updaterName}.`,
            referenceType: 'ISSUE',
            referenceId: updated.id,
          });
        }

        const stakeholderIds = [
          updated.reporter.id,
          ...(updated.assignee ? [updated.assignee.id] : []),
        ].filter((userId) => userId !== updatedById);
        if (changedFields.length > 0 && stakeholderIds.length > 0) {
          await this.notificationsService.createForUsers(tx, {
            userIds: stakeholderIds,
            type: NotificationType.ISSUE_UPDATED,
            title: `Issue updated: ${updated.reference}`,
            message: `${updated.title} is ${updated.status} with ${updated.priority} priority. Updated by ${updaterName}: ${changedFields.join(', ')}.`,
            referenceType: 'ISSUE',
            referenceId: updated.id,
          });
        }
      }

      return this.mapIssueDetails(updated);
    });
  }

  async findAll(
    query: IssuesQueryDto,
    userId: string,
    role: UserRole,
  ): Promise<ListResponse<IssueItem>> {
    const where: Prisma.IssueWhereInput = {
      ...(role === UserRole.CUSTOMER && { reportedById: userId }),
      ...(query.status && { status: query.status }),
      ...(query.priority && { priority: query.priority }),
      ...(query.category && { category: query.category }),
      ...(query.search && {
        OR: [
          { reference: { contains: query.search, mode: 'insensitive' } },
          { title: { contains: query.search, mode: 'insensitive' } },
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
        ],
      }),
    };

    const [issues, total] = await this.prismaService.$transaction([
      this.prismaService.issue.findMany({
        where,
        skip: (query.page - 1) * query.limit,
        take: query.limit,
        orderBy: { reportedAt: 'desc' },
        select: {
          id: true,
          reference: true,
          title: true,
          category: true,
          priority: true,
          status: true,
          room: { select: { id: true, roomNumber: true } },
          reporter: { select: { id: true, fullName: true } },
          assignee: { select: { id: true, fullName: true } },
          reportedAt: true,
        },
      }),
      this.prismaService.issue.count({ where }),
    ]);

    return {
      data: issues.map((issue) => ({
        ...issue,
        assignee: issue.assignee ?? undefined,
        reportedAt: issue.reportedAt.toISOString(),
      })),
      meta: { page: query.page, limit: query.limit, total },
    };
  }

  async create(
    reportedById: string,
    role: UserRole,
    dto: CreateIssueDto,
  ): Promise<CreateIssue> {
    let roomId = dto.roomId;

    if (role === UserRole.CUSTOMER) {
      if (roomId) {
        throw new BadRequestException(
          ISSUE_ERROR_MSG.CUSTOMER_ROOM_NOT_ALLOWED,
        );
      }

      const currentStay = await this.prismaService.booking.findFirst({
        where: {
          customerId: reportedById,
          status: BookingStatus.CHECKED_IN,
        },
        orderBy: { checkedInAt: 'desc' },
        select: {
          bookingRoom: {
            select: { assignedRoomId: true },
          },
        },
      });

      roomId = currentStay?.bookingRoom?.assignedRoomId ?? undefined;
      if (!roomId) {
        throw new NotFoundException(ISSUE_ERROR_MSG.CURRENT_STAY_REQUIRED);
      }
    }

    if (!roomId) {
      throw new BadRequestException(ISSUE_ERROR_MSG.ROOM_REQUIRED);
    }

    const [room, image] = await Promise.all([
      this.prismaService.room.findUnique({
        where: { id: roomId },
        select: { id: true },
      }),
      dto.imageId
        ? this.prismaService.image.findUnique({
            where: { id: dto.imageId },
            select: { id: true },
          })
        : null,
    ]);

    if (!room) {
      throw new NotFoundException(ISSUE_ERROR_MSG.ROOM_NOT_FOUND);
    }

    if (dto.imageId && !image) {
      throw new NotFoundException(ISSUE_ERROR_MSG.IMAGE_NOT_FOUND);
    }

    const reference = `ISS-${Date.now()}-${Math.random().toString(36).slice(2, 7).toUpperCase()}`;

    try {
      const issue = await this.prismaService.$transaction(async (tx) => {
        await lockRoom(tx, roomId);
        const issue = await tx.issue.create({
          data: {
            reference,
            roomId,
            reportedById,
            category: dto.category,
            priority: dto.priority,
            title: dto.title,
            description: dto.description,
            imageId: dto.imageId ?? null,
          },
          select: {
            id: true,
            reference: true,
            title: true,
            description: true,
            category: true,
            priority: true,
            status: true,
            room: {
              select: {
                id: true,
                roomNumber: true,
              },
            },
            reporter: {
              select: {
                id: true,
                fullName: true,
              },
            },
            reportedAt: true,
          },
        });

        await this.notificationsService.createForRoles(
          tx,
          {
            type: NotificationType.ISSUE_CREATED,
            title: `New issue: ${issue.reference}`,
            message: `${issue.title} (${issue.category}, ${issue.priority}): ${issue.description.slice(0, 240)}. Reported by ${issue.reporter.fullName}.`,
            referenceType: 'ISSUE',
            referenceId: issue.id,
          },
          [UserRole.ADMIN, UserRole.MANAGER],
          [reportedById],
        );

        return issue;
      });

      return {
        ...issue,
        reportedAt: issue.reportedAt.toISOString(),
      };
    } catch (error) {
      if (
        typeof error === 'object' &&
        error !== null &&
        'code' in error &&
        error.code === 'P2002'
      ) {
        throw new ConflictException(ISSUE_ERROR_MSG.REFERENCE_CONFLICT);
      }

      throw error;
    }
  }

  private mapIssueDetails(issue: IssueDetailsRecord): IssueDetails {
    return {
      ...issue,
      reportedAt: issue.reportedAt.toISOString(),
      startedAt: issue.startedAt?.toISOString() ?? null,
      completedAt: issue.completedAt?.toISOString() ?? null,
      resolvedAt: issue.resolvedAt?.toISOString() ?? null,
      createdAt: issue.createdAt.toISOString(),
      updatedAt: issue.updatedAt.toISOString(),
    };
  }
}
