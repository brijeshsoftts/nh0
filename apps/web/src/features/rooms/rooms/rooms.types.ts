import type { HousekeepingStatus, OccupancyStatus } from "@/types/enum.types";

export type Room = {
  id: string;
  name: string;
  roomNumber: string;
  floor: string;
  occupancyStatus: OccupancyStatus;
  housekeepingStatus: HousekeepingStatus;
  description?: string;
  isActive: boolean;
  roomType: {
    id: string;
    name: string;
  };
};
