import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

import { VerifyPaymentSchema } from './verify-payment.dto';

export const PublicPaymentAccessSchema = z
  .object({
    bookingId: z.string().trim().min(1, 'Booking ID is required.'),
    checkoutToken: z.uuid('Checkout token is invalid.'),
  })
  .strict();

export const PublicVerifyPaymentSchema = VerifyPaymentSchema.extend({
  checkoutToken: z.uuid('Checkout token is invalid.'),
}).strict();

export const PublicPaymentStatusSchema = z
  .object({
    paymentId: z.string().trim().min(1, 'Payment ID is required.'),
    checkoutToken: z.uuid('Checkout token is invalid.'),
  })
  .strict();

export class PublicPaymentAccessDto extends createZodDto(
  PublicPaymentAccessSchema,
) {}

export class PublicVerifyPaymentDto extends createZodDto(
  PublicVerifyPaymentSchema,
) {}

export class PublicPaymentStatusDto extends createZodDto(
  PublicPaymentStatusSchema,
) {}
