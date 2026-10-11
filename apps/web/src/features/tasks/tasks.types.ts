import type { TaskStatus, TaskType } from "@/types/enum.types";

export type TaskItem = {
  id: string;
  room: {
    id: string;
    roomNumber: string;
  };
  taskType: TaskType;
  status: TaskStatus;
  scheduledDate: string;
  startedAt: string | null;
  completedAt: string | null;
  assignee: {
    id: string;
    fullName: string;
  };
};
