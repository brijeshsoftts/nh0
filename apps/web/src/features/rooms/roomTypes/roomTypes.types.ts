import type { BedType } from "@/types/enum.types";

type Amenity = {
  name: string;
  icon: string;
};

export type RoomType = {
  id: string;
  name: string;
  slug: string;
  primaryImage?: {
    url: string;
    altText?: string;
  };
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
    altText?: string;
    isPrimary: boolean;
    sortOrder: number;
  }[];

  // Basic information
  name: string;
  slug: string;
  description?: string;

  // Size & occupancy
  sizeSqFt?: number;
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
