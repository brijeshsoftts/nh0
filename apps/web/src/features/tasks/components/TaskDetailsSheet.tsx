import { formatDate } from "date-fns";
import {
  CalendarDays,
  CheckCircle2,
  Clock3,
  DoorOpen,
  UserRound,
} from "lucide-react";

import { TaskStatusBadge, TaskTypeBadge } from "@/components/common/EnumBadges";
import { Separator } from "@/components/ui/separator";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

import type { TaskItem } from "../tasks.types";

interface TaskDetailsSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  task: TaskItem;
}

export function TaskDetailsSheet({
  open,
  onOpenChange,
  task,
}: TaskDetailsSheetProps) {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="right"
        className="flex w-full flex-col gap-0 p-0 sm:max-w-xl"
      >
        <SheetHeader className="border-b px-5 py-4 sm:px-6">
          <div className="flex flex-wrap items-center gap-2">
            <SheetTitle className="text-lg font-semibold tracking-tight">
              Task for room {task.room.roomNumber}
            </SheetTitle>
            <TaskStatusBadge value={task.status} />
          </div>
          <SheetDescription>
            <TaskTypeBadge value={task.taskType} />
          </SheetDescription>
        </SheetHeader>
        <div className="flex-1 space-y-5 overflow-y-auto px-5 py-5 sm:px-6">
          <section aria-label="Assignment" className="space-y-3">
            <h3 className="flex items-center gap-2 text-sm font-semibold">
              <UserRound className="size-4 text-muted-foreground" />
              Assignment
            </h3>
            <Detail label="Housekeeper" value={task.assignee.fullName} />
            <Detail label="Assignee ID" value={task.assignee.id} />
          </section>
          <Separator />
          <section aria-label="Room" className="space-y-3">
            <h3 className="flex items-center gap-2 text-sm font-semibold">
              <DoorOpen className="size-4 text-muted-foreground" />
              Room
            </h3>
            <Detail label="Room number" value={task.room.roomNumber} />
            <Detail label="Room ID" value={task.room.id} />
          </section>
          <Separator />
          <section aria-label="Schedule" className="space-y-3">
            <h3 className="flex items-center gap-2 text-sm font-semibold">
              <CalendarDays className="size-4 text-muted-foreground" />
              Schedule
            </h3>
            <Detail
              label="Scheduled"
              value={formatTaskDate(task.scheduledDate)}
            />
            <Detail
              label="Started"
              value={
                task.startedAt ? formatTaskDate(task.startedAt) : "Not started"
              }
              icon={Clock3}
            />
            <Detail
              label="Completed"
              value={
                task.completedAt
                  ? formatTaskDate(task.completedAt)
                  : "Not completed"
              }
              icon={CheckCircle2}
            />
          </section>
        </div>
      </SheetContent>
    </Sheet>
  );
}

function formatTaskDate(value: string | null) {
  if (!value) return "—";
  const date = new Date(value);
  return Number.isNaN(date.getTime())
    ? "—"
    : formatDate(date, "dd MMM yyyy, h:mm a");
}

function Detail({
  label,
  value,
  icon: Icon,
}: {
  label: string;
  value: string;
  icon?: typeof Clock3;
}) {
  return (
    <div className="flex items-center justify-between gap-4 border-b py-2 last:border-0">
      <span className="flex items-center gap-2 text-sm text-muted-foreground">
        {Icon && <Icon aria-hidden="true" className="size-4" />}
        {label}
      </span>
      <span className="text-right text-sm font-medium break-all">{value}</span>
    </div>
  );
}
