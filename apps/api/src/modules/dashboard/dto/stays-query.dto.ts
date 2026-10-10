import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

export const StaysQuerySchema = z
  .object({
    date: z.union([z.literal('today'), z.iso.date()]).default('today'),
    limit: z.coerce
      .number('Limit must be a number')
      .int('Limit must be a whole number')
      .min(1, 'Limit must be at least 1')
      .max(5, 'Limit cannot exceed 5')
      .default(5),
  })
  .strict();

export class StaysQueryDto extends createZodDto(StaysQuerySchema) {}
