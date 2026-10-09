import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

export const PaymentsQuerySchema = z
  .object({
    search: z.string('Search must be a string').trim().max(100).optional(),
    paymentStatus: z
      .enum(['PENDING', 'COMPLETED', 'FAILED', 'REFUNDED'])
      .optional(),
    paymentMethod: z.enum(['CASH', 'ONLINE']).optional(),
    page: z.coerce.number('Page must be a number').int().min(1).default(1),
    limit: z.coerce
      .number('Limit must be a number')
      .int()
      .min(1)
      .max(100)
      .default(10),
  })
  .strict();

export class PaymentsQueryDto extends createZodDto(PaymentsQuerySchema) {}
