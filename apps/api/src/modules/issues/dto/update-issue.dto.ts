import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

export const UpdateIssueSchema = z
  .object({
    title: z
      .string('Issue title is required')
      .trim()
      .min(3, 'Issue title must contain at least 3 characters')
      .max(200, 'Issue title must be 200 characters or fewer')
      .optional(),
    description: z
      .string('Issue description is required')
      .trim()
      .min(1, 'Issue description is required')
      .max(5000, 'Issue description must be 5000 characters or fewer')
      .optional(),
    category: z
      .enum([
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
      ])
      .optional(),
    priority: z.enum(['LOW', 'MEDIUM', 'HIGH', 'URGENT']).optional(),
    status: z
      .enum(['OPEN', 'IN_PROGRESS', 'COMPLETED', 'RESOLVED', 'CANCELLED'])
      .optional(),
  })
  .strict()
  .refine((issue) => Object.keys(issue).length > 0, {
    message: 'Provide at least one issue field to update.',
  });

export class UpdateIssueDto extends createZodDto(UpdateIssueSchema) {}
