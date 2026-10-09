import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

export const InvoicesQuerySchema = z
  .object({
    search: z.string('Search must be a string').trim().max(100).optional(),
    status: z.enum(['UNPAID', 'PARTIALLY_PAID', 'PAID', 'REFUNDED']).optional(),
    page: z.coerce.number('Page must be a number').int().min(1).default(1),
    limit: z.coerce
      .number('Limit must be a number')
      .int()
      .min(1)
      .max(100)
      .default(10),
  })
  .strict();

export class InvoicesQueryDto extends createZodDto(InvoicesQuerySchema) {}
