import {
  BookingStatus,
  InvoiceStatus,
  PaymentMethod,
  PaymentStatus,
} from '../../types/prisma.types';

export type CreateOrder = {
  paymentId: string;
  orderId: string;
  amount: number;
  currency: string;
  keyId: string;
};

export type PublicPaymentStatus = {
  paymentId: string;
  paymentStatus: PaymentStatus;
  invoiceStatus: InvoiceStatus;
  bookingId: string;
  bookingReference: string;
  bookingStatus: BookingStatus;
  totalAmount: number;
  paidAmount: number;
};

export type PaymentItem = {
  id: string;
  bookingId: string;
  paymentReference: string;
  transactionId: string | null;
  invoiceNumber: string;
  bookingReference: string;
  customerName: string;
  amount: number;
  paymentMethod: PaymentMethod;
  paymentStatus: PaymentStatus;
  paidAt: string | null;
  recordedByName: string | null;
  createdAt: string;
};

export type CreatePayment = {
  payment: {
    id: string;
    paymentReference: string;
    invoiceId: string;
    amount: number;
    paymentMethod: PaymentMethod;
    paymentStatus: PaymentStatus;
    paidAt: string | null;
  };
  booking: {
    id: string;
    totalAmount: number;
    paidAmount: number;
    balance: number;
  };
};

export interface CustomerPayment {
  id: string;
  bookingId: string;
  bookingReference: string;
  date: string;
  invoiceNumber: string;
  transactionId: string | null;
  amount: number;
  paymentMethod: PaymentMethod;
  status: PaymentStatus;
}
