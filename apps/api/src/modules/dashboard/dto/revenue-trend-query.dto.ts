import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

export const RevenueTrendQuerySchema = z
  .object({
    range: z
      .enum(['7d', '14d', '28d'], {
        message: 'Range must be 7d, 14d, or 28d',
      })
      .default('7d'),
  })
  .strict();

export class RevenueTrendQueryDto extends createZodDto(
  RevenueTrendQuerySchema,
) {}

export type RevenueTrendRange = RevenueTrendQueryDto['range'];