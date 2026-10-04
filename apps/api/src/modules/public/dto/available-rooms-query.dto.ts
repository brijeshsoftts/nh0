import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

export const AvailableRoomsQuerySchema = z
  .object({
    checkInDate: z.iso
      .date('Check-in must be a valid date in YYYY-MM-DD format')
      .optional(),
    checkOutDate: z.iso
      .date('Check-out must be a valid date in YYYY-MM-DD format')
      .optional(),
    adults: z.coerce
      .number('Adults must be a number')
      .int('Adults must be a whole number')
      .min(1, 'At least one adult is required')
      .max(10, 'Maximum 10 adults allowed')
      .default(1),
    children: z.coerce
      .number('Children must be a number')
      .int('Children must be a whole number')
      .max(10, 'Maximum 10 children allowed')
      .default(0),
    page: z.coerce
      .number()
      .int('Page must be a whole number')
      .min(1, 'Page must be at least 1')
      .default(1),
    limit: z.coerce
      .number()
      .int('Limit must be a whole number')
      .min(1, 'Limit must be at least 1')
      .max(100, 'Limit must be 100 or less')
      .default(10),
  })
  .strict()
  .superRefine(({ checkInDate, checkOutDate }, ctx) => {
    const today = new Date().toISOString().slice(0, 10);

    if (checkInDate && checkInDate < today) {
      ctx.addIssue({
        code: 'custom',
        path: ['checkInDate'],
        message: 'Check-in cannot be in the past',
      });
    }

    if (checkOutDate && checkOutDate < today) {
      ctx.addIssue({
        code: 'custom',
        path: ['checkOutDate'],
        message: 'Check-out cannot be in the past',
      });
    }

    if (checkOutDate && checkInDate && checkOutDate <= checkInDate) {
      ctx.addIssue({
        code: 'custom',
        path: ['checkOutDate'],
        message: 'Check-out must be after check-in',
      });
    }
  });

export class AvailableRoomsQueryDto extends createZodDto(
  AvailableRoomsQuerySchema,
) {}
