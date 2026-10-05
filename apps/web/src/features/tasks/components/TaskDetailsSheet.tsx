import {
  CalendarDays,
  CheckCircle2,
  Clock3,
  DoorOpen,
  Mail,
  Phone,
  Play,
  UserRound,
  UserRoundCheck,
} from "lucide-react";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  HousekeepingBadge,
  TaskStatusBadge,
} from "@/components/common/EnumBadges";
import { formatDate } from "date-fns/format";
import { TASK_DETAILS } from "../tasks.mock";

interface TaskDetailsSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  taskId: string;
}

function Section({
  icon: Icon,
  title,
  children,
}: {
  icon: React.ElementType;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="space-y-3">
      <div className="flex items-center gap-2">
        <div className="flex size-7 items-center justify-center rounded-md bg-muted">
          <Icon className="size-3.5 text-muted-foreground" />
        </div>

        <h3 className="text-sm font-semibold">{title}</h3>
      </div>

      {children}
    </section>
  );
}

function DetailRow({
  label,
  value,
}: {
  label: string;
  value: React.ReactNode;
}) {
  return (
    <div className="flex items-center justify-between gap-4 py-2">
      <span className="text-sm text-muted-foreground">{label}</span>

      <span className="text-right text-sm font-medium">{value}</span>
    </div>
  );
}

export function TaskDetailsSheet({
  open,
  onOpenChange,
  taskId,
}: TaskDetailsSheetProps) {
  if (!taskId) return null;
  const task = TASK_DETAILS;
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="right"
        className="flex w-full min-w-80 flex-col gap-0 p-0 sm:min-w-120"
      >
        {/* Header */}
        <SheetHeader className="border-b px-5 py-4 sm:px-6">
          <div className="flex items-start justify-between gap-4">
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                <SheetTitle className="text-lg font-semibold tracking-tight">
                  Task #{task.id.slice(-6).toUpperCase()}
                </SheetTitle>

                <TaskStatusBadge value={task.status} />
              </div>

              <SheetDescription className="mt-1">
                {task.taskType.replace("_", " ")}
              </SheetDescription>
            </div>
          </div>

          {/* Actions */}
          <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-3">
            {task.status === "PENDING" && (
              <Button size="sm">
                <Play className="size-3.5" />
                Start Task
              </Button>
            )}

            {task.status === "IN_PROGRESS" && (
              <Button size="sm">
                <CheckCircle2 className="size-3.5" />
                Complete
              </Button>
            )}

            {task.status !== "COMPLETED" && task.status !== "IN_PROGRESS" && (
              <Button size="sm" variant="outline">
                Cancel
              </Button>
            )}
          </div>
        </SheetHeader>

        {/* Content */}
        <div className="flex-1 overflow-y-auto">
          <div className="space-y-6 px-5 py-5 sm:px-6">
            {/* Schedule */}
            <Section icon={CalendarDays} title="Schedule">
              <div className="rounded-lg border p-3">
                <DetailRow
                  label="Scheduled"
                  value={formatDate(task.scheduledDate, "dd MMM, yyyy")}
                />

                <Separator />

                <DetailRow
                  label="Started"
                  value={
                    task.startedAt && formatDate(task.startedAt, "dd MMM, yyyy")
                  }
                />

                <DetailRow
                  label="Completed"
                  value={
                    task.completedAt &&
                    formatDate(task.completedAt, "dd MMM, yyyy")
                  }
                />
              </div>
            </Section>

            <Separator />

            {/* Room */}
            <Section icon={DoorOpen} title="Room">
              <div className="rounded-lg border p-3">
                <div className="flex items-center gap-3">
                  <div className="flex size-10 items-center justify-center rounded-md bg-muted">
                    <DoorOpen className="size-5 text-muted-foreground" />
                  </div>

                  <div className="min-w-0">
                    <p className="text-sm font-semibold">
                      Room {task.room.roomNumber}
                    </p>

                    <p className="text-xs text-muted-foreground">
                      {task.room.roomType.name}
                    </p>
                  </div>
                </div>

                <div className="mt-4 grid grid-cols-2 gap-2">
                  <div className="rounded-md bg-muted/50 px-3 py-2">
                    <p className="text-xs text-muted-foreground">Floor</p>

                    <p className="mt-1 text-sm font-semibold">
                      {task.room.floor}
                    </p>
                  </div>

                  <div className="rounded-md bg-muted/50 px-3 py-2">
                    <p className="text-xs text-muted-foreground">Occupancy</p>

                    <p className="mt-1 text-sm font-semibold">
                      {task.room.occupancyStatus.replace("_", " ")}
                    </p>
                  </div>
                </div>

                <div className="mt-2 flex items-center justify-between rounded-md border px-3 py-2">
                  <span className="text-sm text-muted-foreground">
                    Housekeeping
                  </span>

                  <HousekeepingBadge value={task.room.housekeepingStatus} />
                </div>
              </div>
            </Section>

            <Separator />

            {/* Assignee */}
            <Section icon={UserRound} title="Assigned Housekeeper">
              <div className="rounded-lg border p-3">
                <div className="flex items-center gap-3">
                  <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-muted">
                    <UserRound className="size-5 text-muted-foreground" />
                  </div>

                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold">
                      {task.assignee.fullName}
                    </p>

                    <p className="truncate text-xs text-muted-foreground">
                      Housekeeper
                    </p>
                  </div>
                </div>

                <div className="mt-3 space-y-2 border-t pt-3">
                  <div className="flex items-center gap-2 text-sm">
                    <Mail className="size-3.5 text-muted-foreground" />

                    <span className="truncate">{task.assignee.email}</span>
                  </div>

                  <div className="flex items-center gap-2 text-sm">
                    <Phone className="size-3.5 text-muted-foreground" />

                    <span>{task.assignee.phone}</span>
                  </div>
                </div>
              </div>
            </Section>

            <Separator />

            {/* Assignment */}
            {task.assignment && (
              <>
                <Section icon={UserRoundCheck} title="Assignment">
                  <div className="rounded-lg border p-3">
                    <DetailRow
                      label="Assigned by"
                      value={task.assignment.assignedBy.fullName}
                    />

                    <DetailRow
                      label="Assigned on"
                      value={formatDate(
                        task.assignment.createdAt,
                        "dd MMM, yyyy"
                      )}
                    />

                    <Separator />

                    <div className="flex items-center justify-between py-2">
                      <span className="text-sm text-muted-foreground">
                        Assignment status
                      </span>

                      <Badge
                        variant={
                          task.assignment.isActive ? "secondary" : "outline"
                        }
                      >
                        {task.assignment.isActive ? "ACTIVE" : "INACTIVE"}
                      </Badge>
                    </div>
                  </div>
                </Section>

                <Separator />
              </>
            )}

            {/* Timeline */}
            <Section icon={Clock3} title="Task Timeline">
              <div className="rounded-lg border">
                <div className="space-y-0">
                  <TimelineItem
                    title="Task created"
                    date={task.createdAt}
                    active
                  />

                  <TimelineItem
                    title="Scheduled"
                    date={task.scheduledDate}
                    active
                  />

                  <TimelineItem
                    title="Task started"
                    date={task.startedAt}
                    active={!!task.startedAt}
                  />

                  <TimelineItem
                    title="Task completed"
                    date={task.completedAt}
                    active={!!task.completedAt}
                    last
                  />
                </div>
              </div>
            </Section>

            <Separator />

            {/* Metadata */}
            <Section icon={Clock3} title="Details">
              <div className="rounded-lg border p-3">
                <DetailRow
                  label="Created"
                  value={formatDate(task.createdAt, "dd MMM, yyyy")}
                />

                <DetailRow
                  label="Last updated"
                  value={formatDate(task.updatedAt, "dd MMM, yyyy")}
                />
              </div>
            </Section>
          </div>
        </div>

        {/* Footer */}
        <div className="border-t bg-background px-5 py-3 sm:px-6">
          <Button
            className="w-full"
            variant="outline"
            onClick={() => onOpenChange(false)}
          >
            Close
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}

function TimelineItem({
  title,
  date,
  active,
  last = false,
}: {
  title: string;
  date?: string;
  active: boolean;
  last?: boolean;
}) {
  return (
    <div className="flex gap-3 px-3 py-3">
      <div className="flex flex-col items-center">
        <div
          className={[
            "flex size-6 shrink-0 items-center justify-center rounded-full",
            active ? "bg-primary text-primary-foreground" : "bg-muted",
          ].join(" ")}
        >
          {active && <CheckCircle2 className="size-3.5" />}
        </div>

        {!last && <div className="mt-1 h-full min-h-5 w-px bg-border" />}
      </div>

      <div className="min-w-0 pb-1">
        <p
          className={
            active ? "text-sm font-medium" : "text-sm text-muted-foreground"
          }
        >
          {title}
        </p>

        {date && (
          <p className="mt-0.5 text-xs text-muted-foreground">
            {formatDate(date, "dd MMM, yyyy")}
          </p>
        )}
      </div>
    </div>
  );
}
