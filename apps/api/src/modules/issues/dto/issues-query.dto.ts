import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

const issueStatusSchema = z
  .string()
  .transform((value) => value.toUpperCase())
  .pipe(z.enum(['OPEN', 'IN_PROGRESS', 'COMPLETED', 'RESOLVED', 'CANCELLED']));

const issuePrioritySchema = z
  .string()
  .transform((value) => value.toUpperCase())
  .pipe(z.enum(['LOW', 'MEDIUM', 'HIGH', 'URGENT']));

const issueCategorySchema = z
  .string()
  .transform((value) => value.toUpperCase())
  .pipe(
    z.enum([
      'PLUMBING',
      'ELECTRICAL',
      'HVAC',
      'FURNITURE',
      'APPLIANCE',
      'INTERNET',
      'BATHROOM',
      'DOOR_LOCK',
      'LIGHTING',
      'OTHER',
    ]),
  );

export const IssuesQuerySchema = z
  .object({
    search: z
      .string('Search must be text')
      .trim()
      .max(100, 'Search must be 100 characters or fewer')
      .optional(),
    status: issueStatusSchema.optional(),
    priority: issuePrioritySchema.optional(),
    category: issueCategorySchema.optional(),
    page: z.coerce
      .number('Page must be a number')
      .int('Page must be a whole number')
      .min(1, 'Page must be at least 1')
      .default(1),
    limit: z.coerce
      .number('Limit must be a number')
      .int('Limit must be a whole number')
      .min(1, 'Limit must be at least 1')
      .max(100, 'Limit cannot exceed 100')
      .default(10),
  })
  .strict();

export class IssuesQueryDto extends createZodDto(IssuesQuerySchema) {}
