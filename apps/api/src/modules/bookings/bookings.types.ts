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
