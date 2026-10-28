import { z } from "zod";

export const recordQrPaymentSchema = z
  .object({
    invoiceId: z.string().trim().min(1, "Invoice is required."),
    transactionId: z
      .string()
      .trim()
      .min(1, "Transaction ID is required.")
      .max(120, "Transaction ID cannot exceed 120 characters."),
    amount: z.coerce
      .number()
      .int("Amount must be a whole number of rupees.")
      .positive("Amount must be greater than zero.")
      .max(2_147_483_647, "Amount is too large."),
  })
  .strict();

export type RecordQrPaymentFormInput = z.input<typeof recordQrPaymentSchema>;
export type RecordQrPaymentInput = z.output<typeof recordQrPaymentSchema>;
