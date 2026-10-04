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
  image: {
    id: string;
    url: string;
    alt: string | null;
  } | null;
};
