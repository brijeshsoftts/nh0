import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

export const RoomTypeQuerySchema = z
  .object({
    search: z
      .string('Search must be text')
      .trim()
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
    checkInDate: z.iso
      .date('Check-in must be a valid date in YYYY-MM-DD format')
      .optional(),
    checkOutDate: z.iso
      .date('Check-out must be a valid date in YYYY-MM-DD format')
      .optional(),
    adults: z.coerce
      .number({ message: 'Adults must be a number' })
      .int('Adults must be a whole number')
      .min(1, 'At least one adult is required')
      .max(10, 'Maximum 10 adults allowed')
      .optional(),
    children: z.coerce
      .number({ message: 'Children must be a number' })
      .int('Children must be a whole number')
      .min(0, 'Children cannot be negative')
      .max(10, 'Maximum 10 children allowed')
      .optional(),
    isAvailable: z
      .enum(['true', 'false'], 'Availability must be true or false')
      .transform((value) => value === 'true')
      .optional(),
    slug: z
      .string('Room type slug must be text')
      .trim()
      .max(100, 'Room type slug must be 100 characters or fewer')
      .optional(),
    minPrice: z.coerce
      .number({ message: 'Minimum price must be a number' })
      .int('Minimum price must be a whole number')
      .min(0, 'Minimum price cannot be negative')
      .optional(),
    maxPrice: z.coerce
      .number({ message: 'Maximum price must be a number' })
      .int('Maximum price must be a whole number')
      .min(0, 'Maximum price cannot be negative')
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
  .strict()
  .superRefine(({ checkInDate, checkOutDate, minPrice, maxPrice }, ctx) => {
    const today = new Date().toISOString().slice(0, 10);

    if (Boolean(checkInDate) !== Boolean(checkOutDate)) {
      ctx.addIssue({
        code: 'custom',
        path: [checkInDate ? 'checkOutDate' : 'checkInDate'],
        message: 'Check-in and check-out dates must be provided together',
      });
    }

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

    if (checkInDate && checkOutDate && checkOutDate <= checkInDate) {
      ctx.addIssue({
        code: 'custom',
        path: ['checkOutDate'],
        message: 'Check-out must be after check-in',
      });
    }

    if (
      minPrice !== undefined &&
      maxPrice !== undefined &&
      minPrice > maxPrice
    ) {
      ctx.addIssue({
        code: 'custom',
        path: ['maxPrice'],
        message: 'Maximum price must be at least the minimum price',
      });
    }
  });

export class RoomTypeQueryDto extends createZodDto(RoomTypeQuerySchema) {}
