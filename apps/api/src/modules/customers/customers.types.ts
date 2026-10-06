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
  profile: {
    url: string;
    altText: string | null;
  } | null;
};

export type CustomerDetails = {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  isActive: boolean;
  createdAt: Date | null;
  updatedAt: Date | null;
  lastLoginAt: Date | null;
  idProofNumber: string;
  address: string;
  profile: {
    url: string;
    altText: string | null;
  } | null;
};

export type SearchCustomer = {
  id: string;
  fullName: string;
  email: string;
  phone: string;
};
