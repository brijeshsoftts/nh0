import {
  BedType,
  HousekeepingStatus,
  OccupancyStatus,
} from '../../types/prisma.types';

export type RoomBase = {
  id: string;
  name: string | null;
  roomNumber: string;
  floor: number;
  occupancyStatus: OccupancyStatus;
  housekeepingStatus: HousekeepingStatus;
  isActive: boolean;
};

export type RoomLookupItem = {
  id: string;
  name: string | null;
  floor: number;
};

export type CreateRoomResponse = RoomBase & {
  createdAt: Date | null;
};

export type RoomListItemResponse = RoomBase & {
  description: string | null;
  createdAt: Date | null;
  roomType: {
    id: string;
    name: string;
    slug: string;
  };
};

export type RoomDetailsResponse = {
  description: string | null;
  createdAt: Date | null;
  updatedAt: Date | null;
  roomType: {
    id: string;
    name: string;
    slug: string;
    isActive: boolean;
    image: {
      id: string;
      url: string;
      altText: string | null;
    } | null;
  };
};

export type HousekeeperRoomDetails = {
  id: string;
  roomNumber: string;
  floor: number;
  roomName: string | null;
  occupancyStatus: OccupancyStatus;
  housekeepingStatus: HousekeepingStatus;
  roomType: {
    id: string;
    name: string;
    slug: string;
    description: string | null;
    roomSize: number | null;
    maxGuests: number;
    bed: {
      type: BedType;
      count: number;
    };
  };
};
