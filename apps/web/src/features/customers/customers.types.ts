import type {
  BookingStatus,
  InvoiceStatus,
  PaymentStatus,
} from "@/types/enum.types";

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

export type CustomerBookingItem = {
  id: string;
  bookingReference: string;
  status: BookingStatus;
  checkInDate: string;
  checkOutDate: string;
  totalGuests: number;
  totalAmount: number;
  bookingRoom: {
    roomNumber: string | null;
    roomName: string | null;
    roomTypeName: string;
  } | null;
  invoice: {
    invoiceNumber: string;
    status: InvoiceStatus;
    totalAmount: number;
    paidAmount: number;
    balanceDue: number;
    latestPaymentStatus: PaymentStatus | null;
  } | null;
};
