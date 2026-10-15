import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

export const BookingStatusQuerySchema = z
  .object({
    range: z
      .enum(['all', '7d', '14d', '28d'], {
        message: 'Range must be all, 7d, 14d, or 28d',
      })
      .default('all'),
  })
  .strict();

export class BookingStatusQueryDto extends createZodDto(
  BookingStatusQuerySchema,
) {}

export type BookingStatusRange = BookingStatusQueryDto['range'];
