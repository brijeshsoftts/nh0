import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

export const StaffQuerySchema = z
  .object({
    search: z.string().trim().max(100).optional(),
    category: z.enum(['RECEPTIONIST', 'HOUSEKEEPER']).optional(),
    isActive: z
      .enum(['true', 'false'])
      .transform((value) => value === 'true')
      .optional(),
    taskAssignment: z.enum(['ASSIGNED', 'UNASSIGNED']).optional(),
    page: z.coerce.number().int().min(1).default(1),
    limit: z.coerce.number().int().min(1).max(100).default(10),
  })
  .strict();

export class StaffQueryDto extends createZodDto(StaffQuerySchema) {}
