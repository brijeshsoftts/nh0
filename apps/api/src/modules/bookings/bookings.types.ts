import {
  BookingStatus,
  InvoiceStatus,
  PaymentMethod,
  PaymentStatus,
} from '../../types/prisma.types';

export type BookingListItem = {
  id: string;
  bookingReference: string;
  status: BookingStatus;
  checkInDate: string;
  checkOutDate: string;
  totalGuests: number;
  totalAmount: number;
  bookedAt: string;
  customer: { id: string; fullName: string; email: string; phone: string };
  bookingRooms: {
    id: string;
    assignedRoom: { roomNumber: string } | null;
    roomType: { name: string };
  }[];
  invoice: { status: InvoiceStatus } | null;
};

export type BookingDetailsResponse = {
  id: string;
  bookingReference: string;
  status: BookingStatus;
  checkInDate: string;
  checkOutDate: string;
  totalGuests: number;
  totalAmount: number;
  specialRequest?: string;
  bookedAt: string;
  checkedInAt?: string;
  checkedOutAt?: string;
  cancelledAt?: string;
  createdAt: string;
  updatedAt: string;
  customer: {
    id: string;
    fullName: string;
    email: string;
    phone: string;
    profileImage?: { id: string; url: string; altText: string };
    profile?: { idProofNumber: string; address: string };
  };
  bookingRooms: {
    id: string;
    roomNumber: string;
    name?: string;
    floor: number;
    roomType: {
      id: string;
      name: string;
      slug: string;
      maxGuests: number;
      basePrice: number;
      currency: string;
      bedType: string;
      bedCount: number;
    };
    pricePerNight: number;
  }[];
  bookingGuests: {
    id: string;
    fullName: string;
    age: number;
    gender: string | null;
    idProofNumber?: string;
  }[];
  invoices: {
    id: string;
    invoiceNumber: string;
    subtotal: number;
    taxAmount: number;
    discountAmount: number;
    totalAmount: number;
    status: InvoiceStatus;
    issuedAt: string;
    payments: {
      id: string;
      paymentReference: string;
      transactionId?: string;
      amount: number;
      paymentMethod: PaymentMethod;
      paymentStatus: PaymentStatus;
      paidAt?: string;
      createdAt: string;
      recordedBy?: { id: string; fullName: string };
    }[];
  }[];
};

export type AvailableRoom = {
  id: string;
  roomNumber: string;
  floor: number;
  roomName: string | null;
  roomType: {
    id: string;
    name: string;
    maxGuests: number;
    basePrice: number;
    currency: string;
    bedType: string;
    bedCount: number;
    sizeSqFt: number | null;
    image: { url: string; altText: string | null } | null;
    amenities: { id: string; name: string; icon: string | null }[];
  };
};

export type BookingBase = {
  id: string;
  bookingId: string;
  bookingReference: string;
  paymentMethod: PaymentMethod;
  paymentStatus: PaymentStatus;
};

export type CreateBookingResponse = BookingBase & {
  subtotal: number;
  taxAmount: number;
  amount: number;
  paymentReference: string;
  paymentMessage: string;
};
