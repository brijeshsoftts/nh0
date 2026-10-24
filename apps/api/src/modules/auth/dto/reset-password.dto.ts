import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

export const ResetPasswordSchema = z
  .object({
    password: z
      .string('Password is required')
      .min(8, 'Password must be at least 8 characters')
      .max(100, 'Password must be 100 characters or less'),
    confirm: z.string('Password confirmation is required'),
  })
  .strict()
  .refine(({ password, confirm }) => password === confirm, {
    message: 'Passwords do not match.',
    path: ['confirm'],
  });

export class ResetPasswordDto extends createZodDto(ResetPasswordSchema) {}

export const ResetPasswordQuerySchema = z
  .object({
    token: z.string().min(1, 'Password reset token is required.'),
  })
  .strict();

export class ResetPasswordQueryDto extends createZodDto(
  ResetPasswordQuerySchema,
) {}
