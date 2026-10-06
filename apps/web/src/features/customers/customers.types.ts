export type Customer = {
  id: string;
  name: string;
  email: string;
  phone: string;
  totalBookings: number;
  activeBooking: boolean;
  totalSpent: number;
  lastLogin?: string;
  isActive: boolean;
  profile?: {
    url: string;
    altText?: string;
  };
};

export type CustomerDetails = {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  isActive: boolean;
  createdAt?: Date | string;
  updatedAt?: Date | string;
  lastLoginAt?: Date | string;
  idProofNumber?: string;
  address?: string;
  idProof?: {
    url: string;
    altText: string | null;
  } | null;
  signature?: {
    url: string;
    altText: string | null;
  } | null;
  profile?: {
    url: string;
    altText?: string;
  };
};

export type SearchCustomer = {
  id: string;
  fullName: string;
  email: string;
  phone: string;
};
