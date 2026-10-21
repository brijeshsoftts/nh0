import type { LucideIcon } from "lucide-react";

export type NavItem = {
  label: string;
  to: string;
};

export type SocialLink = {
  label: string;
  href: string;
  icon: LucideIcon;
};

export type AmenityHighlight = {
  title: string;
  description: string;
  icon: LucideIcon;
};

export type Testimonial = {
  id: string;
  guestName: string;
  guestLocation: string;
  stay: string;
  rating: number;
  quote: string;
};

export type AvailableRoomListItem = {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  sizeSqFt: number | null;
  maxGuests: number;
  adults: number;
  children: number;
  basePrice: number;
  bedType: string;
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

export type AvailableRoomsParams = {
  checkInDate?: string;
  checkOutDate?: string;
  adults?: number;
  children?: number;
  page?: number;
  limit?: number;
};

export type AvailableRoomDetails = {
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
  bedType: string;
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
    icon?: string;
  }[];
  availability: { isAvailable: boolean };
};
