import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

export const AuditLogsQuerySchema = z
  .object({
    search: z
      .string('Search must be a string')
      .trim()
      .max(100, 'Search must be 100 characters or fewer')
      .optional(),
    entityType: z
      .string('Entity type must be a string')
      .trim()
      .max(100, 'Entity type must be 100 characters or fewer')
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
      .max(100, 'Limit must be 100 or fewer')
      .default(20),
  })
  .strict();

export class AuditLogsQueryDto extends createZodDto(AuditLogsQuerySchema) {}
