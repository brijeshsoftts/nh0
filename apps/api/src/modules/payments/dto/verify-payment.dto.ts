import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

export const VerifyPaymentSchema = z
  .object({
    paymentId: z.string().trim().min(1, 'Payment ID is required.'),
    razorpayPaymentId: z
      .string()
      .trim()
      .min(1, 'Razorpay payment ID is required.'),
    razorpayOrderId: z.string().trim().min(1, 'Razorpay order ID is required.'),
    razorpaySignature: z
      .string()
      .trim()
      .min(1, 'Razorpay signature is required.'),
  })
  .strict();

export class VerifyPaymentDto extends createZodDto(VerifyPaymentSchema) {}
