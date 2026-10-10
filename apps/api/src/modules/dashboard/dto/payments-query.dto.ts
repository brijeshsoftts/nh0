import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

const paymentStatusSchema = z.enum(['UNPAID', 'PARTIALLY_PAID']);

export const PaymentsQuerySchema = z
  .object({
    status: z
      .string()
      .default('UNPAID,PARTIALLY_PAID')
      .transform((value) => value.split(',').map((status) => status.trim()))
      .pipe(z.array(paymentStatusSchema).min(1).max(2)),
    limit: z.coerce
      .number('Limit must be a number')
      .int('Limit must be a whole number')
      .min(1, 'Limit must be at least 1')
      .max(5, 'Limit cannot exceed 5')
      .default(5),
  })
  .strict();

export class PaymentsQueryDto extends createZodDto(PaymentsQuerySchema) {}
