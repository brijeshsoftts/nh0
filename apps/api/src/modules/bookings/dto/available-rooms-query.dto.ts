import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

export const BookingAvailabilityQuerySchema = z
  .object({
    checkInDate: z.coerce.date('Check-in must be a valid date'),
    checkOutDate: z.coerce.date('Check-out must be a valid date'),
    adults: z.coerce
      .number('Adults must be a number')
      .int('Adults must be a whole number')
      .min(1, 'At least one adult is required')
      .max(10, 'Maximum 10 adults allowed')
      .default(1),
    children: z.coerce
      .number('Children must be a number')
      .int('Children must be a whole number')
      .min(0, 'Children cannot be negative')
      .max(10, 'Maximum 10 children allowed')
      .default(0),
  })
  .strict()
  .superRefine(({ checkInDate, checkOutDate }, ctx) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (checkInDate < today) {
      ctx.addIssue({
        code: 'custom',
        path: ['checkInDate'],
        message: 'Check-in cannot be in the past',
      });
    }

    if (checkOutDate <= checkInDate) {
      ctx.addIssue({
        code: 'custom',
        path: ['checkOutDate'],
        message: 'Check-out must be after check-in',
      });
    }
  });

export class BookingAvailabilityQueryDto extends createZodDto(
  BookingAvailabilityQuerySchema,
) {}
