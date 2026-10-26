import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

export const UpdateCustomerStatusSchema = z
  .object({
    isActive: z.boolean('Account status must be true or false'),
  })
  .strict();

export class UpdateCustomerStatusDto extends createZodDto(
  UpdateCustomerStatusSchema,
) {}
