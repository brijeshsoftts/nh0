import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

import { booleanQueryParam } from '../../../common/helpers/query-filter.helper';

export const CustomersQuerySchema = z
  .object({
    search: z.string('Search must be a string').trim().max(100).optional(),
    isActive: booleanQueryParam('isActive must be true or false'),
    page: z.coerce.number('Page must be a number').int().min(1).default(1),
    limit: z.coerce
      .number('Limit must be a number')
      .int()
      .min(1)
      .max(100)
      .default(10),
  })
  .strict();

export class CustomersQueryDto extends createZodDto(CustomersQuerySchema) {}
