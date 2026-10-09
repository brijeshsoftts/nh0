import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

export const UpdateUserSchema = z
  .object({
    fullName: z
      .string('Full name must be a string')
      .trim()
      .min(2, 'Full name must be at least 2 characters')
      .max(100, 'Full name must be 100 characters or fewer')
      .optional(),
    email: z.email('Invalid email format').optional(),
    phone: z
      .string('Phone number must be a string')
      .trim()
      .min(7, 'Phone number must be at least 7 characters')
      .max(20, 'Phone number must be 20 characters or fewer')
      .optional(),
    role: z.enum(['MANAGER'], 'Select a valid user role').optional(),
  })
  .strict();

export class UpdateUserDto extends createZodDto(UpdateUserSchema) {}

export const UpdateMyProfileSchema = z
  .object({
    fullName: z
      .string('Full name must be a string')
      .trim()
      .min(2, 'Full name must be at least 2 characters')
      .max(100, 'Full name must be 100 characters or fewer')
      .optional(),
    email: z.email('Invalid email format').optional(),
    phone: z
      .string('Phone number must be a string')
      .trim()
      .min(7, 'Phone number must be at least 7 characters')
      .max(20, 'Phone number must be 20 characters or fewer')
      .optional(),
  })
  .strict()
  .refine((value) => Object.keys(value).length > 0, {
    message: 'Provide at least one profile field to update',
  });

export class UpdateMyProfileDto extends createZodDto(UpdateMyProfileSchema) {}
