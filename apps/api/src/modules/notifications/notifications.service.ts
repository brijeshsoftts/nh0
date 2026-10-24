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

@Injectable()
export class NotificationsService {
  constructor(private readonly prismaService: PrismaService) {}

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
      return { notification: { type: { in: bookingAndPaymentTypes } } };
    }

    if (role === UserRole.STAFF && category === Category.RECEPTIONIST) {
      return { notification: { type: { in: bookingAndPaymentTypes } } };
    }

    if (role === UserRole.STAFF && category === Category.HOUSEKEEPER) {
      return {
        notification: {
          type: { in: [NotificationType.HOUSEKEEPING_ASSIGNED] },
        },
      };
    }

    throw new ForbiddenException(NOTIFICATIONS_ERROR_MSG.ACCESS_DENIED);
  }
}
