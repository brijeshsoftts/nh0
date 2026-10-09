import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

export const UpdateStaffStatusSchema = z
  .object({
    isActive: z.boolean('Account status must be true or false'),
  })
  .strict();

export class UpdateStaffStatusDto extends createZodDto(
  UpdateStaffStatusSchema,
) {}
