import { formatDate } from "date-fns";
import {
  CalendarDays,
  CheckCircle2,
  Clock,
  Ellipsis,
  PlayCircle,
  UserRound,
} from "lucide-react";
import { useState } from "react";

import { TaskStatusBadge, TaskTypeBadge } from "@/components/common/EnumBadges";
import { IconBtn } from "@/components/common/IconBtn";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Skeleton } from "@/components/ui/skeleton";
import { useAuth } from "@/hooks/useAuth";

import { useDeleteTask } from "../tasks.crud";
import type { TaskItem } from "../tasks.types";

import { TaskDialog } from "./TaskDialog";

type TaskCardProps = {
  task: TaskItem;
};

export function TaskCard({ task }: TaskCardProps) {
  const [open, setOpen] = useState(false);
  const deleteTask = useDeleteTask();
  const { user } = useAuth();
  const startedAt =
    task.startedAt && formatDate(task.startedAt, "dd MMM, yyyy");
  const completedAt =
    task.completedAt && formatDate(task.completedAt, "dd MMM, yyyy");

  return (
    <>
      <TaskDialog mode="edit" onOpenChange={setOpen} open={open} task={task} />

      <Card className="group transition-shadow hover:shadow-md">
        <CardHeader className="flex flex-row items-start justify-between gap-3 space-y-0">
          <div className="min-w-0 space-y-2">
            <div className="flex flex-wrap items-center gap-2">
              <CardTitle className="text-lg">
                Room {task.room.roomNumber}
              </CardTitle>

              <TaskStatusBadge value={task.status} />
            </div>

            <CardDescription>
              <TaskTypeBadge value={task.taskType} />
            </CardDescription>
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger>
              <IconBtn
                variant="ghost"
                className="shrink-0"
                aria-label="Task options"
              >
                <Ellipsis className="size-5" />
              </IconBtn>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setOpen(true)}>
                Edit task
              </DropdownMenuItem>

              <DropdownMenuSeparator />

              <DropdownMenuItem
                className="text-destructive focus:text-destructive"
                onClick={() => deleteTask.handleDelete(task.id)}
                disabled={deleteTask.isDeleting}
              >
                Delete task
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </CardHeader>

        <CardContent className="space-y-4">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <CalendarDays className="size-4 shrink-0" />
            <span>
              Scheduled:{" "}
              {task.scheduledDate
                ? formatDate(task.scheduledDate, "dd MMM, yyyy")
                : "-"}
            </span>
          </div>

          {!user?.category && (
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <UserRound className="size-4 shrink-0" />
              <span className="truncate">{task.assignee.fullName}</span>
            </div>
          )}

          <div className="flex flex-col gap-2 border-t pt-3">
            {startedAt && (
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <PlayCircle className="size-4 shrink-0" />
                <span>Started {startedAt}</span>
              </div>
            )}

            {completedAt && (
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <CheckCircle2 className="size-4 shrink-0" />
                <span>Completed {completedAt}</span>
              </div>
            )}

            {!startedAt && !completedAt && (
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <Clock className="size-4 shrink-0" />
                <span>Not started yet</span>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </>
  );
}

export function TaskCardSkeleton() {
  return (
    <Card aria-hidden="true" className="animate-pulse">
      <CardHeader className="flex flex-row items-start justify-between gap-3 space-y-0">
        <div className="min-w-0 flex-1 space-y-3">
          <div className="flex items-center gap-2">
            <Skeleton className="h-6 w-24" />
            <Skeleton className="h-5 w-20 rounded-full" />
          </div>
          <Skeleton className="h-5 w-24 rounded-full" />
        </div>
        <Skeleton className="size-8 rounded-full" />
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="flex items-center gap-2">
          <Skeleton className="size-4 shrink-0 rounded-full" />
          <Skeleton className="h-4 w-36" />
        </div>
        <div className="flex items-center gap-2">
          <Skeleton className="size-4 shrink-0 rounded-full" />
          <Skeleton className="h-4 w-28" />
        </div>
        <div className="flex items-center gap-2 border-t pt-3">
          <Skeleton className="size-4 shrink-0 rounded-full" />
          <Skeleton className="h-3 w-32" />
        </div>
      </CardContent>
    </Card>
  );
}
