import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { PrismaService } from '../../prisma/prisma.service';
import { ListResponse } from '../../types/api.types';
import { BookingStatus, Prisma, UserRole } from '../../types/prisma.types';

import { CreateIssueDto } from './dto/create-issue.dto';
import { IssuesQueryDto } from './dto/issues-query.dto';
import { ISSUE_ERROR_MSG } from './issue.constants';
import { CreateIssue, IssueItem } from './issues.types';

@Injectable()
export class IssuesService {
  constructor(private readonly prismaService: PrismaService) {}

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
      const issue = await this.prismaService.issue.create({
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
}
