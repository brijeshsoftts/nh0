import { PaymentMethod, PaymentStatus } from '../../types/prisma.types';

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
