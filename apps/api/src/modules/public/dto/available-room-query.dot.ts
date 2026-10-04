import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

export const AvailableRoomQuerySchema = z
  .object({
    checkInDate: z.iso.date(
      'Check-in must be a valid date in YYYY-MM-DD format',
    ),
    checkOutDate: z.iso.date(
      'Check-out must be a valid date in YYYY-MM-DD format',
    ),
  })
  .strict()
  .superRefine(({ checkInDate, checkOutDate }, ctx) => {
    const today = new Date().toISOString().slice(0, 10);

    if (checkInDate < today) {
      ctx.addIssue({
        code: 'custom',
        path: ['checkInDate'],
        message: 'Check-in cannot be in the past',
      });
    }

    if (checkOutDate < today) {
      ctx.addIssue({
        code: 'custom',
        path: ['checkOutDate'],
        message: 'Check-out cannot be in the past',
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

export class AvailableRoomQueryDto extends createZodDto(
  AvailableRoomQuerySchema,
) {}
