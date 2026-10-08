import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

export const UsersQuerySchema = z
  .object({
    search: z
      .string('Search must be a string')
      .trim()
      .max(100, 'Search must be 100 characters or less')
      .optional(),
    isActive: z
      .enum(['true', 'false'])
      .transform((value) => value === 'true')
      .optional(),
    page: z.coerce
      .number('Page must be a number')
      .int('Page must be a whole number')
      .min(1, 'Page must be at least 1')
      .default(1),
    limit: z.coerce
      .number('Limit must be a number')
      .int('Limit must be a whole number')
      .min(1, 'Limit must be at least 1')
      .max(100, 'Limit must be 100 or less')
      .default(10),
  })
  .strict();

export class UsersQueryDto extends createZodDto(UsersQuerySchema) {}
