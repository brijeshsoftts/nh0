import type { NotificationType } from '../../types/prisma.types';

export type NotificationItem = {
  id: string;
  type: NotificationType;
  title: string;
  message: string;
  referenceType: string | null;
  referenceId: string | null;
  isRead: boolean;
  createdAt: string;
};
