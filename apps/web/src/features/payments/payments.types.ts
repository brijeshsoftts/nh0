import type { PaymentMethod, PaymentStatus } from "@/types/enum.types";

export type PaymentItem = {
  id: string;
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
