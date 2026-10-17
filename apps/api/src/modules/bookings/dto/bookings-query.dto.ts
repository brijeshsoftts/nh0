import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

export const BookingsQuerySchema = z
  .object({
    search: z.string('Search must be a string').trim().max(100).optional(),
    status: z
      .string('Status must be text')
      .trim()
      .transform((value) => value.toUpperCase())
      .pipe(
        z.enum(
          [
            'PENDING',
            'CONFIRMED',
            'CHECKED_IN',
            'CHECKED_OUT',
            'CANCELLED',
            'NO_SHOW',
          ],
          'Status must be pending, confirmed, checked_in, checked_out, cancelled, or no_show',
        ),
      )
      .optional(),
    paymentMethod: z
      .string('Payment method must be text')
      .trim()
      .transform((value) => value.toUpperCase())
      .pipe(z.enum(['CASH', 'ONLINE'], 'Payment method must be cash or online'))
      .optional(),
    page: z.coerce.number('Page must be a number').int().min(1).default(1),
    limit: z.coerce
      .number('Limit must be a number')
      .int()
      .min(1)
      .max(100)
      .default(10),
  })
  .strict();

export class BookingsQueryDto extends createZodDto(BookingsQuerySchema) {}
