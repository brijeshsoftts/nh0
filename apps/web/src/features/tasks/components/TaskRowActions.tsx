import {
  CheckCircle2,
  Ellipsis,
  Eye,
  LoaderCircle,
  Pencil,
  PlayCircle,
  UserRoundPlus,
} from "lucide-react";
import { useState } from "react";

import { IconBtn } from "@/components/common/IconBtn";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuth } from "@/hooks/useAuth";

import { useUpdateStatus } from "../tasks.crud";
import type { TaskItem } from "../tasks.types";

import { TaskAssignmentDialog } from "./TaskAssignmentDialog";
import { TaskDetailsSheet } from "./TaskDetailsSheet";
import { TaskDialog } from "./TaskDialog";

export function TaskRowActions({ task }: { task: TaskItem }) {
  const { user } = useAuth();
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [assignmentOpen, setAssignmentOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const updateStatus = useUpdateStatus(task.id);
  const canManage = user?.role === "ADMIN" || user?.role === "MANAGER";
  const isAssignedHousekeeper =
    user?.role === "STAFF" &&
    user.category === "HOUSEKEEPER" &&
    task.assignee.id === user.id;
  const canUpdate = canManage || isAssignedHousekeeper;
  const nextStatus =
    task.status === "PENDING"
      ? "IN_PROGRESS"
      : task.status === "IN_PROGRESS"
        ? "COMPLETED"
        : null;
  const statusLabel =
    nextStatus === "IN_PROGRESS"
      ? "Start Task"
      : nextStatus === "COMPLETED"
        ? "Complete Task"
        : null;
  const isPending = updateStatus.isPending;

  if (!canManage && !isAssignedHousekeeper) return null;

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <IconBtn
            variant="ghost"
            className="shrink-0"
            aria-label={`Task actions for room ${task.room.roomNumber}`}
            disabled={isPending}
          >
            {isPending ? (
              <LoaderCircle className="size-5 animate-spin" />
            ) : (
              <Ellipsis className="size-5" />
            )}
          </IconBtn>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-auto">
          <DropdownMenuItem onClick={() => setDetailsOpen(true)}>
            <Eye />
            View Details
          </DropdownMenuItem>

          {canManage && task.status === "PENDING" && (
            <>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => setAssignmentOpen(true)}>
                <UserRoundPlus />
                Assign Task
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setEditOpen(true)}>
                <Pencil />
                Edit Task
              </DropdownMenuItem>
            </>
          )}

          {canUpdate && nextStatus && statusLabel && (
            <>
              {canManage && task.status === "PENDING" && (
                <DropdownMenuSeparator />
              )}
              <DropdownMenuItem
                disabled={isPending}
                onClick={() => updateStatus.mutate({ status: nextStatus })}
              >
                {isPending ? (
                  <LoaderCircle className="size-4 animate-spin" />
                ) : nextStatus === "IN_PROGRESS" ? (
                  <PlayCircle className="size-4" />
                ) : (
                  <CheckCircle2 className="size-4" />
                )}
                {isPending ? "Saving..." : statusLabel}
              </DropdownMenuItem>
            </>
          )}
        </DropdownMenuContent>
      </DropdownMenu>

      <TaskDetailsSheet
        open={detailsOpen}
        onOpenChange={setDetailsOpen}
        task={task}
      />
      {assignmentOpen && (
        <TaskAssignmentDialog
          open={assignmentOpen}
          onOpenChange={setAssignmentOpen}
          task={task}
        />
      )}
      {editOpen && (
        <TaskDialog
          mode="edit"
          open={editOpen}
          onOpenChange={setEditOpen}
          task={task}
        />
      )}
    </>
  );
}
