import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

export const CreateUserSchema = z
  .object({
    fullName: z
      .string('Full name is required')
      .trim()
      .min(2, 'Full name must be at least 2 characters')
      .max(100, 'Full name must be 100 characters or fewer'),
    email: z.email('Invalid email format'),
    phone: z
      .string('Phone number is required')
      .trim()
      .min(7, 'Phone number must be at least 7 characters')
      .max(20, 'Phone number must be 20 characters or fewer'),
    role: z.enum(['MANAGER']).default('MANAGER'),
  })
  .strict();

export class CreateUserDto extends createZodDto(CreateUserSchema) {}
