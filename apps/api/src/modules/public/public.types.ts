import { AmenityCategory, BedType } from '../../types/prisma.types';

export type AmenityListItemResponse = {
  id: string;
  name: string;
  description: string | null;
  icon: string | null;
  category: AmenityCategory;
};

export type AvailableRoomListItemResponse = {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  sizeSqFt: number | null;
  maxGuests: number;
  adults: number;
  children: number;
  basePrice: number;
  bedType: BedType;
  bedCount: number;
  availableRooms: number;
  image: {
    url: string;
    altText: string | null;
  } | null;
  amenities: {
    name: string;
    icon: string | null;
  }[];
};

export type AvailableRoomResponse = {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  sizeSqFt: number | null;
  maxGuests: number;
  adults: number;
  children: number;
  basePrice: number;
  currency: string;
  bedType: BedType;
  bedCount: number;
  smokingAllowed: boolean;
  petsAllowed: boolean;
  images: {
    url: string;
    altText: string | null;
    isPrimary: boolean;
    sortOrder: number;
  }[];
  amenities: {
    id: string;
    name: string;
    icon: string | null;
  }[];
  availability: {
    isAvailable: boolean;
  };
};
