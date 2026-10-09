import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

export const UpdateUserStatusSchema = z
  .object({
    isActive: z.boolean('Account status must be true or false'),
  })
  .strict();

export class UpdateUserStatusDto extends createZodDto(UpdateUserStatusSchema) {}
