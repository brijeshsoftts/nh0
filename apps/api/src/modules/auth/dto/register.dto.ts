import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

export const RegisterSchema = z
  .object({
    fullName: z
      .string('Full name is required')
      .trim()
      .min(2, 'Full name must contain at least 2 characters')
      .max(100, 'Full name must be 100 characters or less'),
    email: z.email('Please provide a valid email address.'),
    password: z
      .string('Password is required')
      .min(8, 'Password must be at least 8 characters')
      .max(100, 'Password must be 100 characters or less'),
  })
  .strict();

export class RegisterDto extends createZodDto(RegisterSchema) {}
