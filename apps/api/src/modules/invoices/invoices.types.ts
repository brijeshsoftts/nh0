import {
  BookingStatus,
  InvoiceStatus,
  PaymentMethod,
  PaymentStatus,
} from '../../types/prisma.types';

export type InvoiceItem = {
  id: string;
  invoiceNumber: string;
  bookingReference: string;
  customerName: string;
  totalAmount: number;
  paidAmount: number;
  balanceDue: number;
  status: InvoiceStatus;
  issuedAt: string;
};

export type InvoiceDetails = {
  id: string;
  invoiceNumber: string;
  status: InvoiceStatus;
  issuedAt: string;
  customer: {
    id: string;
    fullName: string;
    email: string;
    phone: string;
  };
  booking: {
    id: string;
    bookingReference: string;
    status: BookingStatus;
    checkInDate: string;
    checkOutDate: string;
    roomCharge: {
      roomType: string;
      roomNumber: string | null;
      pricePerNight: number;
      nights: number;
      total: number;
    } | null;
  };
  charges: {
    subtotal: number;
    discountAmount: number;
    taxAmount: number;
    totalAmount: number;
  };
  payments: {
    id: string;
    paymentReference: string;
    transactionId: string | null;
    amount: number;
    paymentMethod: PaymentMethod;
    paymentStatus: PaymentStatus;
    paidAt: string | null;
    createdAt: string;
  }[];
  paidAmount: number;
  balanceDue: number;
};

export type UpdateInvoice = {
  id: string;
  subtotal: number;
  taxAmount: number;
  discountAmount: number;
  totalAmount: number;
};
