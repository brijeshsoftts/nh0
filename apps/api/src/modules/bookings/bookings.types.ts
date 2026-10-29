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
  paymentMethod: PaymentMethod | null;
  bookedAt: string;
  customer: {
    id: string;
    fullName: string;
    email: string;
    phone: string;
  };
  bookingRoom: {
    id: string;
    assignedRoom: { roomNumber: string } | null;
    roomType: { name: string };
  } | null;
  invoice: { id: string; status: InvoiceStatus } | null;
  canCheckIn: boolean;
  canMarkNoShow: boolean;
};

export type BookingDetails = {
  id: string;
  bookingReference: string;
  customerId: string;
  checkInDate: string;
  checkOutDate: string;
  totalGuests: number;
  totalAmount: number;
  paymentMethod: PaymentMethod | null;
  specialRequest: string | null;
  status: BookingStatus;
  bookedAt: string;
  checkedInAt: string | null;
  checkedOutAt: string | null;
  cancelledAt: string | null;
  createdBy: string;
  createdAt: string;
  updatedAt: string;

  customer: {
    id: string;
    fullName: string;
    email: string;
    phone: string;
    profileImage: {
      url: string;
      altText: string | null;
    } | null;
    profile: {
      idProofNumber: string;
      address: string;
    } | null;
  };
  creator: {
    id: string;
    fullName: string;
    email: string;
    phone: string;
    profileImage: {
      url: string;
      altText: string | null;
    } | null;
  };
  bookingRoom: {
    id: string;
    assignedRoom: {
      id: string;
      roomNumber: string;
      name: string | null;
      floor: number;
      housekeepers: {
        id: string;
        fullName: string;
        email: string;
        phone: string;
      }[];
    } | null;
    roomType?: {
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
  } | null;
  bookingGuests: {
    id: string;
    fullName: string;
    age: number | null;
    gender: string | null;
    idProofNumber: string | null;
  }[];

  invoice: {
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
      transactionId: string | null;
      amount: number;
      paymentMethod: PaymentMethod;
      paymentStatus: PaymentStatus;
      paidAt: string | null;
      createdAt: string;
      recordedBy: {
        id: string;
        fullName: string;
      } | null;
    }[];
  } | null;
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
  } | null;
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

// CUSTOMER TYPES
export interface CustomerBooking {
  id: string;
  bookingNumber: string;
  roomType: string;
  roomNumber?: string;
  checkIn: string;
  checkOut: string;
  totalAmount: number;
  status: BookingStatus;
  invoice: { id: string; status: InvoiceStatus } | null;
}

export interface CustomerBookingDetails {
  id: string;
  bookingNumber: string;
  status: BookingStatus;
  roomType: string;
  roomNumber?: string;
  checkIn: string;
  checkOut: string;
  duration: number;
  adults: number;
  children: number;
  bookedOn: string;
}
