import type {
  BookingStatus,
  InvoiceStatus,
  PaymentMethod,
  PaymentStatus,
} from "@/types/enum.types";
import type { Gender } from "./components/BookingDetailsSheet";

export interface BookingDetailsCustomer {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  profileImage?: {
    id: string;
    url: string;
    altText: string;
  };
  profile?: {
    idProofNumber: string;
    address: string;
  };
}

export interface BookingDetailsRoom {
  id: string;
  roomNumber: string;
  name?: string;
  floor: number;

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
}

export interface BookingDetailsGuest {
  id: string;
  fullName: string;
  age: number;
  gender: Gender;
  idProofNumber?: string;
}

export interface BookingDetailsPayment {
  id: string;
  paymentReference: string;
  transactionId?: string;

  amount: number;
  paymentMethod: PaymentMethod;
  paymentStatus: PaymentStatus;

  paidAt?: string;
  createdAt: string;

  recordedBy?: {
    id: string;
    fullName: string;
  };
}

export interface BookingDetailsInvoice {
  id: string;
  invoiceNumber: string;

  subtotal: number;
  taxAmount: number;
  discountAmount: number;
  totalAmount: number;

  status: InvoiceStatus;
  issuedAt: string;

  payments: BookingDetailsPayment[];
}

export interface BookingDetails {
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

  customer: BookingDetailsCustomer;

  bookingRooms: BookingDetailsRoom[];

  bookingGuests: BookingDetailsGuest[];

  invoices: BookingDetailsInvoice[];
}
