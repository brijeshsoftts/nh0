import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

import { Category } from '../../../types/prisma.types';

const category = z
  .string()
  .transform((value) => value.toUpperCase())
  .pipe(z.enum(Category));

export const StaffLookupQuerySchema = z
  .object({
    category: category.optional(),
    search: z.string().trim().max(100).optional(),
    limit: z.coerce.number().int().min(1).max(100).default(10),
  })
  .strict();

export class StaffLookupQueryDto extends createZodDto(StaffLookupQuerySchema) {}
