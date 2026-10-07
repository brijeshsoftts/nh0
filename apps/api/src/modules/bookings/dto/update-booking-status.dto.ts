import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

export const UpdateBookingStatusSchema = z
  .object({
    status: z.enum([
      'PENDING',
      'CONFIRMED',
      'CHECKED_IN',
      'CHECKED_OUT',
      'CANCELLED',
      'NO_SHOW',
    ]),
  })
  .strict();

export class UpdateBookingStatusDto extends createZodDto(
  UpdateBookingStatusSchema,
) {}
