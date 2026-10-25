import type { PaymentMethod, PaymentStatus } from "@/types/enum.types";

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

export type CreatePaymentOrderInput = {
  bookingId: string;
};

export type CreatePaymentOrderResponse = {
  paymentId: string;
  orderId: string;
  amount: number;
  currency: "INR";
  keyId: string;
};

export type VerifyPaymentInput = {
  paymentId: string;
  razorpayPaymentId: string;
  razorpayOrderId: string;
  razorpaySignature: string;
};

export type CreateCashPaymentInput = {
  invoiceId: string;
  amount: number;
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
