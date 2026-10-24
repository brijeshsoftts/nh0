import { Bell, CheckCheck, Clock, Loader2, RefreshCw } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

import {
  useMarkAllNotificationsAsRead,
  useMarkNotificationAsRead,
  useUnreadNotifications,
} from "../notifications.crud";
import type { NotificationItem } from "../notifications.types";

function formatNotificationDate(date: string): string {
  const timestamp = new Date(date);

  if (Number.isNaN(timestamp.getTime())) {
    return "Recently";
  }

  const diff = Date.now() - timestamp.getTime();

  if (diff < 0) {
    return timestamp.toLocaleDateString();
  }

  const minutes = Math.floor(diff / 60_000);

  if (minutes < 1) return "Just now";
  if (minutes < 60) return `${minutes}m ago`;

  const hours = Math.floor(minutes / 60);

  if (hours < 24) return `${hours}h ago`;

  const days = Math.floor(hours / 24);

  if (days < 7) return `${days}d ago`;

  return timestamp.toLocaleDateString(undefined, {
    day: "numeric",
    month: "short",
    year:
      timestamp.getFullYear() !== new Date().getFullYear()
        ? "numeric"
        : undefined,
  });
}

function NotificationLoading() {
  return (
    <div className="space-y-4 p-4" aria-label="Loading notifications">
      {Array.from({ length: 3 }, (_, index) => (
        <div key={index} className="flex gap-3">
          <Skeleton className="size-9 shrink-0 rounded-full" />
          <div className="flex-1 space-y-2">
            <Skeleton className="h-4 w-2/3" />
            <Skeleton className="h-3 w-full" />
            <Skeleton className="h-3 w-20" />
          </div>
        </div>
      ))}
    </div>
  );
}

export function NotificationsPopover() {
  const {
    data: notifications = [],
    isLoading,
    isError,

    refetch,
  } = useUnreadNotifications();

  const { mutateAsync: markAllAsRead, isPending: isMarkingAll } =
    useMarkAllNotificationsAsRead();

  const { mutateAsync: markNotificationAsRead, isPending: isMarking } =
    useMarkNotificationAsRead();

  const handleMarkAsRead = (id: string) => {
    markNotificationAsRead(id);
  };

  const handleMarkAllAsRead = () => {
    markAllAsRead();
  };

  const handleRefetch = () => {
    refetch();
  };

  return (
    <Popover>
      <PopoverTrigger>
        <Button
          type="button"
          variant="ghost"
          size="lg"
          className="relative h-10 w-10 shrink-0 rounded-full"
          aria-label={
            notifications?.length > 0
              ? `Notifications, ${notifications?.length} unread`
              : "Notifications"
          }
        >
          <Bell className="size-5" aria-hidden="true" />

          {notifications?.length > 0 && (
            <span className="absolute -top-0.5 -right-0.5 flex min-w-4 items-center justify-center rounded-full bg-destructive px-1 text-[10px] leading-4 font-semibold text-background">
              {notifications?.length > 99 ? "99+" : notifications?.length}
            </span>
          )}
        </Button>
      </PopoverTrigger>

      <PopoverContent
        align="end"
        sideOffset={8}
        className="w-[min(24rem,calc(100vw-1rem))] gap-0 overflow-hidden p-0"
      >
        <div className="flex items-center justify-between gap-3 p-4">
          <div className="min-w-0">
            <h2 className="text-sm font-semibold">Notifications</h2>
            <p className="text-xs text-muted-foreground">
              {notifications?.length === 0
                ? "You're all caught up"
                : `${notifications.length} unread notification${notifications?.length === 1 ? "" : "s"}`}
            </p>
          </div>

          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="shrink-0 gap-1.5 px-2 text-xs"
            onClick={handleMarkAllAsRead}
            disabled={
              isLoading ||
              isError ||
              isMarkingAll ||
              notifications?.length === 0
            }
          >
            {isMarkingAll ? (
              <Loader2 className="size-3.5 animate-spin" />
            ) : (
              <CheckCheck className="size-3.5" />
            )}
            Mark all read
          </Button>
        </div>

        <Separator className="my-0! py-0!" />

        {isLoading ? (
          <NotificationLoading />
        ) : isError ? (
          <div className="flex flex-col items-center gap-2 px-5 py-10 text-center">
            <Bell className="size-8 text-muted-foreground" />
            <p className="text-sm font-medium">Couldn't load notifications</p>
            <p className="text-xs text-muted-foreground">
              Check your connection and try again.
            </p>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={handleRefetch}
              className="mt-1 gap-2"
            >
              <RefreshCw className="size-3.5" />
              Try again
            </Button>
          </div>
        ) : notifications?.length === 0 ? (
          <div className="flex flex-col items-center gap-2 px-5 py-10 text-center">
            <div className="flex size-11 items-center justify-center rounded-full bg-muted">
              <CheckCheck
                className="size-5 text-muted-foreground"
                aria-hidden="true"
              />
            </div>
            <p className="text-sm font-medium">You're all caught up</p>
            <p className="text-xs text-muted-foreground">
              New notifications will appear here.
            </p>
          </div>
        ) : (
          <ScrollArea className="h-[min(26rem,60dvh)] w-[calc(100%-1rem)] md:w-auto">
            <div>
              {notifications?.map((notification: NotificationItem) => {
                return (
                  <div
                    key={notification.id}
                    className={cn(
                      "group group relative flex gap-3 border-b p-4 transition-colors last:border-b-0 hover:bg-muted hover:text-muted-foreground"
                    )}
                  >
                    <div
                      className={cn(
                        "grop-hover:text-muted-foreground mt-0.5 flex size-9 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary"
                      )}
                    >
                      <Bell className="size-4" aria-hidden="true" />
                    </div>

                    <div className="min-w-0 flex-1">
                      <button
                        type="button"
                        className="block w-full rounded-sm text-left focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
                      >
                        <span className="flex items-start gap-2">
                          <span className="min-w-0 flex-1 text-sm font-medium break-words group-hover:text-foreground">
                            {notification.title}
                          </span>
                        </span>

                        <span className="mt-1 block text-xs leading-5 break-words text-muted-foreground">
                          {notification.message}
                        </span>
                      </button>

                      <div className="mt-2 flex items-center gap-1.5 text-[11px] text-muted-foreground">
                        <Clock className="size-3" aria-hidden="true" />
                        <time dateTime={notification.createdAt}>
                          {formatNotificationDate(notification.createdAt)}
                        </time>
                      </div>
                    </div>

                    {!notification.isRead && (
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="size-8 shrink-0 self-center opacity-100 sm:opacity-0 sm:group-focus-within:opacity-100 sm:group-hover:opacity-100"
                        aria-label={`Mark "${notification.title}" as read`}
                        title="Mark as read"
                        disabled={isMarking}
                        onClick={() => handleMarkAsRead(notification.id)}
                      >
                        {isMarking ? (
                          <Loader2 className="size-4 animate-spin" />
                        ) : (
                          <CheckCheck className="size-4" />
                        )}
                      </Button>
                    )}
                  </div>
                );
              })}
            </div>
          </ScrollArea>
        )}
      </PopoverContent>
    </Popover>
  );
}
