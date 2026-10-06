import { BedType } from '../../types/prisma.types';

export type Image = {
  id: string;
  url: string;
  altText: string | null;
  isPrimary: boolean;
  sortOrder: number;
};

export type RoomTypeBase = {
  id: string;
  name: string;
  maxGuests: number;
  basePrice: number;
  slug: string;
  isActive: boolean;
};

export type CreateRoomType = RoomTypeBase & {
  createdAt: Date;
};

type Amenity = {
  name: string;
  icon: string | null;
};

export type RoomType = {
  id: string;
  name: string;
  slug: string;
  primaryImage: {
    url: string;
    altText: string | null;
  } | null;
  basePrice: number;
  currency: string;
  maxGuests: number;
  adults: number;
  children: number;
  bedType: BedType;
  bedCount: number;
  numberOfRooms: number;
  amenities: Amenity[];
  isActive: boolean;
};

export type RoomTypeDetails = {
  id: string;

  // Images
  images: {
    id: string;
    url: string;
    altText: string | null;
    isPrimary: boolean;
    sortOrder: number;
  }[];

  // Basic information
  name: string;
  slug: string;
  description: string | null;

  // Size & occupancy
  sizeSqFt: number | null;
  maxGuests: number;
  adults: number;
  children: number;

  // Pricing
  basePrice: number;
  currency: string;

  // Bed
  bedType: BedType;
  bedCount: number;

  // Policies
  smokingAllowed: boolean;
  petsAllowed: boolean;

  // Status
  isActive: boolean;

  // Amenities
  amenities: Amenity[];

  // Rooms
  roomCount: number;
  roomStatusSummary: {
    total: number;
    active: number;

    occupancy: {
      available: number;
      occupied: number;
      other: number;
    };

    housekeeping: {
      clean: number;
      dirty: number;
      inspected: number;
      inProgress: number;
      other: number;
    };
  };

  // Audit
  createdAt: Date;
  updatedAt: Date;
};
