import { BedType } from '../../types/prisma.types';

export type Image = {
  id: string;
  url: string;
  altText: string | null;
  isPrimary: boolean;
  sortOrder: number;
};

export type Amenity = {
  id: string;
  name: string;
  icon: string | null;
};

export type RoomTypeBase = {
  id: string;
  name: string;
  maxGuests: number;
  basePrice: number;
  slug: string;
  isActive: boolean;
};

export type CreateRoomTypeResponse = RoomTypeBase & {
  createdAt: Date;
};

export type RoomTypeListItemResponse = RoomTypeBase & {
  sizeSqFt: number | null;
  bedType: BedType;
  basePrice: number;
  totalRooms: number;
  image: {
    id: string;
    url: string;
    altText: string | null;
  } | null;
};

export type RoomTypeDetailsResponse = RoomTypeBase & {
  description: string | null;
  sizeSqFt: number | null;
  adults: number;
  children: number;
  currency: string;
  bedType: BedType;
  bedCount: number;
  smokingAllowed: boolean;
  petsAllowed: boolean;
  createdAt: Date | null;
  updatedAt: Date | null;
  totalRooms: number;
  images: {
    id: string;
    url: string;
    altText: string | null;
  }[];
  amenities: {
    id: string;
    name: string;
    icon: string | null;
  }[];
  _count: undefined;
};
