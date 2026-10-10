import type {
  BookingStatus,
  Gender,
  InvoiceStatus,
  PaymentMethod,
  PaymentStatus,
} from "@/types/enum.types";

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

export type BookingListItem = {
  id: string;
  bookingReference: string;
  status: BookingStatus;
  checkInDate: string;
  checkOutDate: string;
  totalGuests: number;
  totalAmount: number;
  bookedAt: string;
  customer: Pick<BookingDetailsCustomer, "id" | "fullName" | "email" | "phone">;
  bookingRoom?: {
    id: string;
    assignedRoom: { roomNumber: string } | null;
    roomType: { name: string };
  };
  invoice: { status: InvoiceStatus } | null;
};

export type BookingDetails = {
  id: string;
  bookingReference: string;
  customerId: string;
  checkInDate: string;
  checkOutDate: string;
  totalGuests: number;
  totalAmount: number;
  specialRequest?: string;
  status: BookingStatus;
  bookedAt: string;
  checkedInAt?: string;
  checkedOutAt?: string;
  cancelledAt?: string;
  createdBy: string;
  createdAt: string;
  updatedAt: string;

  customer: {
    id: string;
    fullName: string;
    email: string;
    phone: string;
    profileImage?: {
      url: string;
      altText?: string;
    };
    profile?: {
      idProofNumber: string;
      address: string;
    };
  };
  creator: {
    id: string;
    fullName: string;
    email: string;
    phone: string;
    profileImage?: {
      url: string;
      altText?: string;
    };
  };
  bookingRoom: {
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
  };
  bookingGuests: {
    id: string;
    fullName: string;
    age: number | null;
    gender?: string;
    idProofNumber?: string;
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
    payments?: {
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
    }[];
  };
};

export type BookingListParams = {
  page: number;
  limit: number;
  search?: string;
  status?: BookingStatus;
};

export type UpdateBookingStatusInput = {
  id: string;
  status: BookingStatus;
};

export type BookingGuestInput = {
  fullName: string;
  age: number;
  gender: Gender;
  idProofNumber?: string;
};

export type AvailableBookingRoom = {
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

export type BookingAvailabilityParams = {
  checkInDate: string;
  checkOutDate: string;
  adults: number;
  children: number;
};

export type CreateBookingInput = BookingAvailabilityParams & {
  customerId: string;
  roomId: string;
  guests: BookingGuestInput[];
  specialRequest?: string;
  paymentMethod: PaymentMethod;
};

export type CreateBookingResult = {
  id: string;
  bookingId: string;
  bookingReference: string;
  paymentMethod: PaymentMethod;
  paymentStatus: PaymentStatus;
  paymentReference: string;
  subtotal: number;
  taxAmount: number;
  amount: number;
  paymentMessage: string;
};
