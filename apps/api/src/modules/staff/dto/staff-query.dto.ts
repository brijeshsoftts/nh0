import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

import {
  booleanQueryParam,
  enumQueryParam,
} from '../../../common/helpers/query-filter.helper';
import { Category } from '../../../types/prisma.types';

export const StaffQuerySchema = z
  .object({
    search: z.string().trim().max(100).optional(),
    category: enumQueryParam(
      Category,
      'Category must be a valid staff category',
    ),
    isActive: booleanQueryParam('isActive must be true or false'),
    taskAssignment: z.enum(['ASSIGNED', 'UNASSIGNED']).optional(),
    page: z.coerce.number().int().min(1).default(1),
    limit: z.coerce.number().int().min(1).max(100).default(10),
  })
  .strict();

export class StaffQueryDto extends createZodDto(StaffQuerySchema) {}
