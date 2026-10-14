import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

export const RoomsLookupQuerySchema = z
  .object({
    search: z.string().trim().max(100).optional(),
    limit: z.coerce.number().int().min(1).max(100).default(10),
  })
  .strict();

export class RoomsLookupQueryDto extends createZodDto(RoomsLookupQuerySchema) {}
