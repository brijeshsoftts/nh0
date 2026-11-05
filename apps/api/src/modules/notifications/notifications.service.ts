import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { PrismaService } from '../../prisma/prisma.service';
import {
  Category,
  NotificationType,
  Prisma,
  UserRole,
} from '../../types/prisma.types';

import { NOTIFICATIONS_ERROR_MSG } from './notifications.constants';
import { NotificationItem } from './notifications.types';

export type CreateNotificationInput = {
  userIds: string[];
  type: NotificationType;
  title: string;
  message: string;
  referenceType: string;
  referenceId: string;
};

@Injectable()
export class NotificationsService {
  constructor(private readonly prismaService: PrismaService) {}

  async createForUsers(
    tx: Prisma.TransactionClient,
    input: CreateNotificationInput,
  ): Promise<void> {
    const userIds = [...new Set(input.userIds)];
    if (userIds.length === 0) return;

    const recipients = await tx.user.findMany({
      where: {
        id: { in: userIds },
        isActive: true,
        softDeletedAt: null,
      },
      select: { id: true },
    });

    await Promise.all(
      recipients.map(({ id }) =>
        tx.notification.create({
          data: {
            userId: id,
            type: input.type,
            title: input.title,
            message: input.message,
            referenceType: input.referenceType,
            referenceId: input.referenceId,
            reads: { create: { userId: id } },
          },
          select: { id: true },
        }),
      ),
    );
  }

  async createForRoles(
    tx: Prisma.TransactionClient,
    input: Omit<CreateNotificationInput, 'userIds'>,
    roles: UserRole[],
    excludedUserIds: string[] = [],
  ): Promise<void> {
    const recipients = await tx.user.findMany({
      where: {
        role: { in: roles },
        isActive: true,
        softDeletedAt: null,
        ...(excludedUserIds.length > 0 && { id: { notIn: excludedUserIds } }),
      },
      select: { id: true },
    });

    await this.createForUsers(tx, {
      ...input,
      userIds: recipients.map(({ id }) => id),
    });
  }

  async findUnread(
    userId: string,
    role: UserRole,
    category?: Category,
  ): Promise<NotificationItem[]> {
    const reads = await this.prismaService.notificationRead.findMany({
      where: {
        ...this.buildAccessWhere(role, category),
        userId,
        isRead: false,
      },
      orderBy: { notification: { createdAt: 'desc' } },
      select: {
        isRead: true,
        notification: {
          select: {
            id: true,
            type: true,
            title: true,
            message: true,
            referenceType: true,
            referenceId: true,
            createdAt: true,
          },
        },
      },
    });

    return reads.map(({ notification, isRead }) => ({
      ...notification,
      isRead,
      createdAt: notification.createdAt.toISOString(),
    }));
  }

  async markAsRead(
    id: string,
    userId: string,
    role: UserRole,
    category?: Category,
  ): Promise<void> {
    const [read] =
      await this.prismaService.notificationRead.updateManyAndReturn({
        where: {
          ...this.buildAccessWhere(role, category),
          notificationId: id,
          userId,
        },
        data: {
          isRead: true,
          readAt: new Date(),
        },
        select: { id: true },
      });

    if (!read) {
      throw new NotFoundException(NOTIFICATIONS_ERROR_MSG.NOT_FOUND);
    }
  }

  async markAllAsRead(
    userId: string,
    role: UserRole,
    category?: Category,
  ): Promise<{ count: number }> {
    const result = await this.prismaService.notificationRead.updateMany({
      where: {
        ...this.buildAccessWhere(role, category),
        userId,
        isRead: false,
      },
      data: {
        isRead: true,
        readAt: new Date(),
      },
    });

    return { count: result.count };
  }

  private buildAccessWhere(
    role: UserRole,
    category?: Category,
  ): Prisma.NotificationReadWhereInput {
    if (role === UserRole.ADMIN || role === UserRole.MANAGER) {
      return {};
    }

    const bookingAndPaymentTypes = [
      NotificationType.BOOKING_CONFIRMED,
      NotificationType.CHECK_IN_REMINDER,
      NotificationType.BOOKING_CANCELLED,
      NotificationType.PAYMENT_RECEIVED,
    ];

    if (role === UserRole.CUSTOMER) {
      return {
        notification: {
          type: {
            in: [...bookingAndPaymentTypes, NotificationType.ISSUE_UPDATED],
          },
        },
      };
    }

    if (role === UserRole.STAFF) {
      const staffTypes = [
        NotificationType.ISSUE_ASSIGNED,
        NotificationType.ISSUE_UPDATED,
        ...(category === Category.RECEPTIONIST ? bookingAndPaymentTypes : []),
        ...(category === Category.HOUSEKEEPER
          ? [NotificationType.HOUSEKEEPING_ASSIGNED]
          : []),
      ];

      if (staffTypes.length > 0) {
        return { notification: { type: { in: staffTypes } } };
      }

      return {
        notification: { type: { in: staffTypes } },
      };
    }

    throw new ForbiddenException(NOTIFICATIONS_ERROR_MSG.ACCESS_DENIED);
  }
}
