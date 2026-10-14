import { formatDate } from "date-fns";
import { Check } from "lucide-react";
import { useMemo, useState } from "react";

import { InputField } from "@/components/common/InputField";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from "@/components/ui/combobox";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Spinner } from "@/components/ui/spinner";
import { useDebounce } from "@/hooks/useDebounce";

import {
  useCreateTask,
  useLookupHousekeepers,
  useLookupRooms,
  useUpdateTask,
} from "../tasks.crud";
import type {
  HousekeeperLookupItem,
  RoomLookupItem,
  TaskItem,
} from "../tasks.types";

/* -------------------------------------------------------------------------- */
/* Types (nested, mirrors Prisma relations). Move to tasks.types.ts if needed. */
/* -------------------------------------------------------------------------- */

const TASK_TYPES = ["CLEANING", "DEEP_CLEAN", "TURNDOWN"] as const;
const TASK_STATUSES = ["PENDING", "IN_PROGRESS", "COMPLETED"] as const;

export type TaskType = (typeof TASK_TYPES)[number];
export type TaskStatus = (typeof TASK_STATUSES)[number];

export type HousekeepingTask = {
  id: string;
  taskType: TaskType;
  status: TaskStatus;
  scheduledDate: string; // ISO
  startedAt: string | null;
  completedAt: string | null;
  createdAt: string;
  updatedAt: string;
  room: { id: string; roomNumber: string; floor: number };
  assignee: { id: string; fullName: string };
};

export type TaskRoomOption = { id: string; roomNumber: string; floor: number };
export type TaskHousekeeperOption = { id: string; fullName: string };

export type TaskDialogMode = "create" | "edit" | "view";

/* -------------------------------------------------------------------------- */
/* Schema (move to task.schema.ts if you prefer)                               */
/* -------------------------------------------------------------------------- */

/* -------------------------------------------------------------------------- */
/* Helpers                                                                     */
/* -------------------------------------------------------------------------- */

const TASK_TYPE_LABEL: Record<TaskType, string> = {
  CLEANING: "Cleaning",
  DEEP_CLEAN: "Deep clean",
  TURNDOWN: "Turndown",
};

const STATUS_LABEL: Record<TaskStatus, string> = {
  PENDING: "Pending",
  IN_PROGRESS: "In progress",
  COMPLETED: "Completed",
};

const STATUS_VARIANT: Record<TaskStatus, "secondary" | "default" | "outline"> =
  {
    PENDING: "secondary",
    IN_PROGRESS: "default",
    COMPLETED: "outline",
  };

const TITLE: Record<TaskDialogMode, string> = {
  create: "New housekeeping task",
  edit: "Edit task",
  view: "Task details",
};

const SUBMIT_LABEL = { create: "Create task", edit: "Save changes" } as const;

const todayInputValue = () => new Date().toISOString().slice(0, 10);

const getDefaultValues = (
  task?: HousekeepingTask | null,
  defaultRoomId?: string
): TaskFormValues => ({
  roomId: task?.room.id ?? defaultRoomId ?? "",
  assignedTo: task?.assignee.id ?? "",
  taskType: task?.taskType ?? "CLEANING",
  scheduledDate: task ? task.scheduledDate.slice(0, 10) : todayInputValue(),
});

const formatDateTime = (value: string | null) =>
  value
    ? new Date(value).toLocaleString("en-IN", {
        dateStyle: "medium",
        timeStyle: "short",
      })
    : "-";

/* -------------------------------------------------------------------------- */
/* Component                                                                   */
/* -------------------------------------------------------------------------- */

type TaskDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  mode: TaskDialogMode;
  /** Required for `edit` and `view`. */
  task?: TaskItem | null;
  /** View mode only: shows an "Edit task" button for PENDING tasks. */
  onEdit?: () => void;
};

export function TaskDialog({
  open,
  onOpenChange,
  mode,
  task,
  onEdit,
}: TaskDialogProps) {
  const createTask = useCreateTask();
  const updateTask = useUpdateTask(task?.id ?? "");

  const activeForm = mode === "create" ? createTask : updateTask;
  const isPending = activeForm.mutation.isPending;

  const isLocked = mode === "edit" && !!task && task.status !== "PENDING";
  const isReadOnly = mode === "view" || isLocked;
  const fieldsDisabled = isPending || isReadOnly;

  const handleOpenChange = (next: boolean) => {
    if (isPending) return;
    onOpenChange(next);
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="gap-0 p-0 sm:max-w-md">
        <DialogHeader className="px-6 pt-6 pb-4">
          <div className="flex items-center gap-2">
            <DialogTitle>{TITLE[mode]}</DialogTitle>
            {task && mode !== "create" && (
              <Badge variant={STATUS_VARIANT[task.status]}>
                {STATUS_LABEL[task.status]}
              </Badge>
            )}
          </div>
          <DialogDescription>
            {mode === "create" && "Assign a room to a housekeeper for a date."}
            {mode === "edit" &&
              !isLocked &&
              "Update the room, housekeeper, type or date."}
            {isLocked &&
              "This task has started, so it can no longer be edited."}
            {mode === "view" && "Task progress and assignment."}
          </DialogDescription>
        </DialogHeader>

        <form
          onSubmit={activeForm.form.handleSubmit(activeForm.submit)}
          className="space-y-4 px-6 pb-6"
        >
          <HousekeeperSelect
            error={
              activeForm.form.formState.errors.assignedTo?.message?.toString() ||
              ""
            }
            onSelect={(e: string) => {
              activeForm.form.setValue("assignedTo", e);
            }}
          />
          <RoomSelect
            error={
              activeForm.form.formState.errors.roomId?.message?.toString() || ""
            }
            onSelect={(e) => {
              activeForm.form.setValue("roomId", e);
            }}
          />

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <TaskTypeSelect
              error={
                activeForm.form.formState.errors.taskType?.message?.toString() ||
                ""
              }
              onSelect={(e) => {
                activeForm.form.setValue("taskType", e);
              }}
            />
            <InputField
              label="Scheduled date"
              type="date"
              {...activeForm.form.register("scheduledDate", {
                value:
                  task?.scheduledDate &&
                  formatDate(task.scheduledDate, "yyyy-MM-dd"),
              })}
              error={activeForm.form.formState.errors.scheduledDate?.message?.toString()}
              disabled={fieldsDisabled}
              className="mt-1 h-10"
            />
          </div>

          {task && mode !== "create" && (
            <dl className="grid grid-cols-2 gap-4 rounded-md border border-border/60 p-3 text-sm">
              <div>
                <dt className="text-muted-foreground">Started</dt>
                <dd>{formatDateTime(task.startedAt)}</dd>
              </div>
              <div>
                <dt className="text-muted-foreground">Completed</dt>
                <dd>{formatDateTime(task.completedAt)}</dd>
              </div>
            </dl>
          )}

          <DialogFooter className="-mx-6 border-t border-border/60 bg-muted/20 px-6 py-4">
            <DialogClose>
              <Button type="button" variant="ghost" disabled={isPending}>
                {isReadOnly ? "Close" : "Cancel"}
              </Button>
            </DialogClose>

            {mode === "view" && onEdit && task?.status === "PENDING" && (
              <Button type="button" onClick={onEdit}>
                Edit task
              </Button>
            )}

            {!isReadOnly && (
              <Button type="submit" disabled={isPending} className="min-w-28">
                {isPending ? (
                  <Spinner />
                ) : (
                  <>
                    <Check className="size-4" />
                    <span>{SUBMIT_LABEL[mode as "create" | "edit"]}</span>
                  </>
                )}
              </Button>
            )}
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

function HousekeeperSelect({
  onSelect,
  error,
}: {
  onSelect: any;
  error: string;
}) {
  const [search, setSearch] = useState("");

  const query = useDebounce(search, 500);

  const { data } = useLookupHousekeepers({
    search: query,
    limit: 10,
    category: "housekeeper",
  });

  return (
    <div className="space-y-2">
      <Label>Select a housekeeper</Label>
      <Combobox items={data}>
        <ComboboxInput
          placeholder="Select a housekeeper"
          onChange={(e) => setSearch(e.target.value)}
        />

        <ComboboxContent>
          <ComboboxEmpty>No items found.</ComboboxEmpty>

          <ComboboxList>
            {(item: HousekeeperLookupItem) => (
              <ComboboxItem
                key={item.id}
                value={item.fullName}
                onClick={() => onSelect(item.id)}
              >
                {item.fullName}
              </ComboboxItem>
            )}
          </ComboboxList>
        </ComboboxContent>
      </Combobox>
      {error && <p className="text-sm text-red-500">{error}</p>}
    </div>
  );
}

function RoomSelect({
  onSelect,
  error,
}: {
  onSelect: (option: any) => void;
  error: string;
}) {
  const [search, setSearch] = useState("");

  const query = useDebounce(search, 500);

  const { data } = useLookupRooms({ search: query, limit: 10 });

  return (
    <div className="space-y-2">
      <Label>Select a room</Label>
      <Combobox items={data}>
        <ComboboxInput
          placeholder="Select a room"
          onChange={(e) => setSearch(e.target.value)}
        />

        <ComboboxContent>
          <ComboboxEmpty>No items found.</ComboboxEmpty>

          <ComboboxList>
            {(item: RoomLookupItem) => (
              <ComboboxItem
                key={item.id}
                value={`${item.name} - #${item.floor}`}
                onClick={() => onSelect(item.id)}
              >
                {item.name} - #{item.floor}
              </ComboboxItem>
            )}
          </ComboboxList>
        </ComboboxContent>
      </Combobox>
      {error && <p className="text-sm text-red-500">{error}</p>}
    </div>
  );
}

function TaskTypeSelect({
  onSelect,
  error,
}: {
  onSelect: (option: any) => void;
  error: string;
}) {
  const taskTypeOptions = useMemo(
    () =>
      TASK_TYPES.map((t) => ({
        label: TASK_TYPE_LABEL[t],
        value: t,
      })),
    []
  );

  return (
    <div className="space-y-2">
      <Label>Task types</Label>
      <Combobox items={taskTypeOptions}>
        <ComboboxInput placeholder="Select a task type" className={"h-10"} />
        <ComboboxContent>
          <ComboboxEmpty>No items found.</ComboboxEmpty>

          <ComboboxList>
            {(item) => (
              <ComboboxItem
                key={item.value}
                value={item.label}
                onClick={() => onSelect(item.value)}
              >
                {item.label}
              </ComboboxItem>
            )}
          </ComboboxList>
        </ComboboxContent>
      </Combobox>
      {error && <p className="text-sm text-red-500">{error}</p>}
    </div>
  );
}
