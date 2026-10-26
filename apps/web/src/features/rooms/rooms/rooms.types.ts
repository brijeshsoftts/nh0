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

export type RoomDetails = {
  id: string;
  name: string | null;
  roomNumber: string;
  roomTypeId: string;
  floor: number;
  description: string | null;
  occupancyStatus: OccupancyStatus;
  housekeepingStatus: HousekeepingStatus;
  isActive: boolean;
  createdAt: string | null;
  updatedAt: string | null;
  roomType: {
    id: string;
    name: string;
    slug: string;
    basePrice: number;
    currency: string;
    isActive: boolean;
    image: {
      id: string;
      url: string;
      altText: string | null;
    } | null;
  };
};
