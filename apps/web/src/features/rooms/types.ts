import type {
  BedType,
  HousekeepingStatus,
  OccupancyStatus,
} from "@/types/enum.types";

// Housekeper types
export interface HousekeeperRoom {
  id: string;
  roomNumber: string;
  floor: number;
  roomType: {
    id: string;
    name: string;
  };
  occupancyStatus: OccupancyStatus;
  housekeepingStatus: HousekeepingStatus;
}

export interface HousekeeperRoomDetails {
  roomNumber: string;
  floor: number;
  roomName: string | null;
  occupancyStatus: OccupancyStatus;
  housekeepingStatus: HousekeepingStatus;
  roomType: {
    description: string | null;
    roomSize: number | null;
    maxGuests: number;
    bed: {
      type: BedType;
      count: number;
    };
  };
}
