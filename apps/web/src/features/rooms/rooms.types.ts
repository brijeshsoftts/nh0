import type {
  HousekeepingStatus,
  OccupancyStatus,
  TaskStatus,
  TaskType,
} from "@/types/enum.types";

export interface HousekeeperRoom {
  id: string;
  name?: string;
  roomNumber: string;
  floor: number;
  occupancyStatus: OccupancyStatus;
  housekeepingStatus: HousekeepingStatus;
  isActive: boolean;
  taskId: string;
  taskType: TaskType;
  status: TaskStatus;
}
