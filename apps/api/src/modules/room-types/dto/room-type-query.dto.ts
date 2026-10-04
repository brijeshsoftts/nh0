import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

export const RoomTypeQuerySchema = z
  .object({
    search: z
      .string('Search must be text')
      .trim()
      .min(1, 'Search cannot be empty')
      .max(100, 'Search must be 100 characters or fewer')
      .optional(),
    isActive: z
      .enum(['true', 'false'], 'Active status must be true or false')
      .transform((value) => value === 'true')
      .optional(),
    maxGuests: z.coerce
      .number({ message: 'Maximum guests must be a number' })
      .int('Maximum guests must be a whole number')
      .min(1, 'Maximum guests must be at least 1')
      .optional(),
    page: z.coerce
      .number()
      .int('Page must be an integer')
      .min(1, 'Page must be at least 1')
      .default(1),
    limit: z.coerce
      .number()
      .int('Limit must be an integer')
      .min(1, 'Limit must be at least 1')
      .max(100, 'Limit must be 100 or less')
      .default(10),
  })
  .strict();

export class RoomTypeQueryDto extends createZodDto(RoomTypeQuerySchema) {}
