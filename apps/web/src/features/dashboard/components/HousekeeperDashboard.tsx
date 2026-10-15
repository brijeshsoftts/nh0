import { useQueryClient } from "@tanstack/react-query";
import { formatDate } from "date-fns";
import { CalendarDays, CheckCircle2, LoaderCircle, Play } from "lucide-react";

import {
  HousekeepingBadge,
  OccupancyBadge,
  TaskStatusBadge,
  TaskTypeBadge,
} from "@/components/common/EnumBadges";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { HouseKeeperRoomDetails } from "@/features/rooms/components/HouseKeeperRoomDetails";
import {
  roomsCrud,
  useHousekeeperCleaningRooms,
} from "@/features/rooms/rooms.crud";
import {
  useHousekeeperTaskQueue,
  useUpdateStatus,
} from "@/features/tasks/tasks.crud";
import type { TaskItem } from "@/features/tasks/tasks.types";
import { useAuth } from "@/hooks/useAuth";

import { dashbaordKeys } from "../dashboard.keys";

import { DashboardStats } from "./DashboardStats";

function QueueHeader({
  id,
  title,
  description,
}: {
  id: string;
  title: string;
  description: string;
}) {
  return (
    <div>
      <h2 id={id} className="text-sm font-semibold text-foreground">
        {title}
      </h2>
      <p className="mt-0.5 text-xs text-muted-foreground">{description}</p>
    </div>
  );
}

function QueueLoading() {
  return (
    <div aria-hidden="true" className="divide-y rounded-lg border bg-card">
      {["first", "second", "third"].map((key) => (
        <div key={key} className="flex items-center gap-4 p-4">
          <Skeleton className="size-9 shrink-0 rounded-md" />
          <div className="min-w-0 flex-1 space-y-2">
            <Skeleton className="h-4 w-36" />
            <Skeleton className="h-3 w-48 max-w-full" />
          </div>
          <Skeleton className="h-8 w-24" />
        </div>
      ))}
    </div>
  );
}

function QueueError({
  message,
  onRetry,
}: {
  message: string;
  onRetry: () => void;
}) {
  return (
    <div
      role="alert"
      className="flex flex-col items-start gap-3 rounded-lg border border-destructive/30 bg-card p-4 sm:flex-row sm:items-center sm:justify-between"
    >
      <p className="text-sm text-muted-foreground">{message}</p>
      <Button type="button" variant="outline" size="sm" onClick={onRetry}>
        Try again
      </Button>
    </div>
  );
}

function EmptyQueue({ message }: { message: string }) {
  return (
    <div className="rounded-lg border border-dashed p-8 text-center text-sm text-muted-foreground">
      {message}
    </div>
  );
}

function TaskQueueRow({ task }: { task: TaskItem }) {
  const queryClient = useQueryClient();
  const updateStatus = useUpdateStatus(task.id);
  const nextStatus = task.status === "PENDING" ? "IN_PROGRESS" : "COMPLETED";
  const actionLabel =
    task.status === "PENDING" ? "Start task" : "Complete task";
  const startOfToday = new Date();
  startOfToday.setHours(0, 0, 0, 0);
  const isOverdue = new Date(task.scheduledDate) < startOfToday;

  const handleStatusUpdate = () => {
    updateStatus.mutate(
      { status: nextStatus },
      {
        onSuccess: async () => {
          await Promise.all([
            queryClient.invalidateQueries({ queryKey: dashbaordKeys.stats }),
            queryClient.invalidateQueries({ queryKey: roomsCrud.keys.all }),
          ]);
        },
      }
    );
  };

  return (
    <li className="flex flex-col gap-3 p-4 sm:flex-row sm:items-center">
      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-2">
          <p className="text-sm font-medium">Room {task.room.roomNumber}</p>
          <TaskTypeBadge value={task.taskType} />
          <TaskStatusBadge value={task.status} />
        </div>
        <p
          className={`mt-1 flex items-center gap-1.5 text-xs ${isOverdue ? "text-destructive" : "text-muted-foreground"}`}
        >
          <CalendarDays className="size-3.5" />
          {isOverdue ? "Overdue · " : "Due "}
          {formatDate(task.scheduledDate, "dd MMM, yyyy")}
        </p>
      </div>

      <div className="flex flex-wrap items-center gap-2 sm:justify-end">
        <Button
          type="button"
          size="sm"
          onClick={handleStatusUpdate}
          disabled={updateStatus.isPending}
        >
          {updateStatus.isPending ? (
            <LoaderCircle className="animate-spin" />
          ) : task.status === "PENDING" ? (
            <Play />
          ) : (
            <CheckCircle2 />
          )}
          {updateStatus.isPending ? "Updating..." : actionLabel}
        </Button>
        <HouseKeeperRoomDetails roomId={task.room.id} buttonLabel="View room" />
      </div>
    </li>
  );
}

function MyTasks() {
  const {
    data: tasks = [],
    isLoading,
    isError,
    refetch,
  } = useHousekeeperTaskQueue();

  return (
    <section className="min-w-0 space-y-3" aria-labelledby="my-tasks-title">
      <QueueHeader
        id="my-tasks-title"
        title="My tasks"
        description="Open tasks ordered by due date and status."
      />

      {isLoading ? (
        <QueueLoading />
      ) : isError ? (
        <QueueError
          message="Could not load your tasks."
          onRetry={() => void refetch()}
        />
      ) : tasks.length === 0 ? (
        <EmptyQueue message="No open tasks are assigned to you." />
      ) : (
        <ul className="divide-y rounded-lg border bg-card">
          {tasks.map((task) => (
            <TaskQueueRow key={task.id} task={task} />
          ))}
        </ul>
      )}
    </section>
  );
}

function CleaningRooms() {
  const {
    data: rooms = [],
    isLoading,
    isError,
    refetch,
  } = useHousekeeperCleaningRooms();

  return (
    <section
      className="min-w-0 space-y-3"
      aria-labelledby="cleaning-rooms-title"
    >
      <QueueHeader
        id="cleaning-rooms-title"
        title="Rooms requiring cleaning"
        description="Dirty rooms within your assigned task scope."
      />

      {isLoading ? (
        <QueueLoading />
      ) : isError ? (
        <QueueError
          message="Could not load rooms requiring cleaning."
          onRetry={() => void refetch()}
        />
      ) : rooms.length === 0 ? (
        <EmptyQueue message="No assigned rooms are waiting for cleaning." />
      ) : (
        <ul className="divide-y rounded-lg border bg-card">
          {rooms.map((room) => (
            <li
              key={room.id}
              className="flex flex-col gap-3 p-4 sm:flex-row sm:items-center"
            >
              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium">Room {room.roomNumber}</p>
                <p className="mt-1 truncate text-xs text-muted-foreground">
                  {room.roomType.name} · Floor {room.floor}
                </p>
                <div className="mt-2 flex flex-wrap gap-2">
                  <HousekeepingBadge value={room.housekeepingStatus} />
                  <OccupancyBadge value={room.occupancyStatus} />
                </div>
              </div>
              <HouseKeeperRoomDetails
                roomId={room.id}
                buttonLabel="View room"
              />
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

export function HousekeeperDashboard() {
  const { user } = useAuth();

  return (
    <>
      <DashboardStats />
      <div className="grid items-start gap-6 xl:grid-cols-2">
        <MyTasks />
        {user?.category === "HOUSEKEEPER" && <CleaningRooms />}
      </div>
    </>
  );
}
