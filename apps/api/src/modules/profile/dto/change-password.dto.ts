import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

export const ChangePasswordSchema = z
  .object({
    oldPassword: z
      .string('Current password must be a string')
      .min(8, 'Current password must be at least 8 characters')
      .max(128, 'Current password must be 128 characters or fewer'),
    newPassword: z
      .string('New password must be a string')
      .min(8, 'New password must be at least 8 characters')
      .max(128, 'New password must be 128 characters or fewer'),
  })
  .strict();

export class ChangePasswordDto extends createZodDto(ChangePasswordSchema) {}
