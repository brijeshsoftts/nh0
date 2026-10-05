import type {
  HousekeepingStatus,
  OccupancyStatus,
  TaskStatus,
  TaskType,
} from "@/types/enum.types";

export interface TaskDetailsRoom {
  id: string;
  roomNumber: string;
  name?: string;
  floor: number;
  description?: string;

  occupancyStatus: OccupancyStatus;
  housekeepingStatus: HousekeepingStatus;

  roomType: {
    id: string;
    name: string;
  };
}

export interface TaskDetailsAssignee {
  id: string;
  fullName: string;
  email: string;
  phone: string;
}

export interface TaskDetailsAssignment {
  id: string;
  isActive: boolean;
  createdAt: string;

  housekeeper: {
    id: string;
    fullName: string;
  };

  assignedBy: {
    id: string;
    fullName: string;
  };
}

export interface TaskDetails {
  id: string;

  taskType: TaskType;
  status: TaskStatus;

  scheduledDate: string;

  startedAt?: string;
  completedAt?: string;

  createdAt: string;
  updatedAt: string;

  room: TaskDetailsRoom;

  assignee: TaskDetailsAssignee;

  assignment?: TaskDetailsAssignment;
}
