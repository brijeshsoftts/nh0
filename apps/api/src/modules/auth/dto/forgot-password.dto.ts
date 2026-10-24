import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

export const ForgotPasswordSchema = z
  .object({
    email: z.email('Invalid email format'),
  })
  .strict();

export class ForgotPasswordDto extends createZodDto(ForgotPasswordSchema) {}
