import { useQuery } from "@tanstack/react-query";

import { apiClient } from "@/lib/apiClient";
import { createCrud } from "@/lib/crud/createCrud";

import type { NotificationItem } from "./notifications.types";

export const notificationsCrud = createCrud()({
  resource: "notifications",
  endpoint: "/notifications",
  label: "Notification",
});

export function useUnreadNotifications() {
  return useQuery({
    queryKey: notificationsCrud.keys.custom("notifications", "unread"),
    queryFn: (): Promise<NotificationItem[]> =>
      apiClient.get("/notifications/unread").then((r) => r.data.data),
  });
}

export const useMarkNotificationAsRead = notificationsCrud.createAction({
  name: "markRead",
  mutationFn: (id: string) =>
    apiClient.patch(`/notifications/${id}/read`, { id }).then((r) => r.data),
  successMessage: "Notification marked as read",
});

export const useMarkAllNotificationsAsRead = notificationsCrud.createAction({
  name: "markAllRead",
  mutationFn: () =>
    apiClient.patch("/notifications/read-all").then((r) => r.data),
  successMessage: "All notifications marked as read",
});
