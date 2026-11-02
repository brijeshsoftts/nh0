import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

export const PublicContactSubjectSchema = z.enum([
  'reservation',
  'support',
  'group',
  'feedback',
  'other',
]);

export const PublicContactMessageSchema = z
  .object({
    fullName: z
      .string()
      .trim()
      .min(2, 'Enter your full name.')
      .max(120, 'Name cannot exceed 120 characters.')
      .refine((value) => !/[\r\n]/.test(value), 'Enter a valid name.'),
    email: z.email('Enter a valid email address.').trim().toLowerCase(),
    phone: z
      .string()
      .trim()
      .max(30, 'Phone number cannot exceed 30 characters.'),
    subject: PublicContactSubjectSchema,
    message: z
      .string()
      .trim()
      .min(10, 'Message must contain at least 10 characters.')
      .max(3000, 'Message cannot exceed 3000 characters.'),
  })
  .strict();

export class PublicContactMessageDto extends createZodDto(
  PublicContactMessageSchema,
) {}

export type PublicContactSubject = z.infer<typeof PublicContactSubjectSchema>;
