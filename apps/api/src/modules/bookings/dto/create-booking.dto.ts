import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

export const guestSchema = z
  .object({
    fullName: z
      .string()
      .trim()
      .min(1, 'Guest name is required')
      .max(120, 'Guest name is too long'),
    age: z.coerce
      .number('Age must be a valid number')
      .int('Age must be a whole number')
      .min(1, 'Age must be at least 1')
      .max(120, 'Age must be 120 or less'),
    gender: z.enum(['MALE', 'FEMALE', 'OTHER']),
    idProofNumber: z
      .string()
      .trim()
      .max(50, 'ID proof number is too long')
      .optional()
      .transform((value) => (value && value.length > 0 ? value : undefined)),
  })
  .strict();

export const CreateBookingSchema = z
  .object({
    customerId: z.string().trim().min(1, 'Customer is required'),
    checkInDate: z.coerce.date('Check-in date is required'),
    checkOutDate: z.coerce.date('Check-out date is required'),
    adults: z.coerce
      .number('Adults must be a number')
      .int('Adults must be a whole number')
      .min(1, 'At least one adult is required')
      .max(10, 'Maximum 10 adults allowed'),
    children: z.coerce
      .number('Children must be a number')
      .int('Children must be a whole number')
      .min(0, 'Children cannot be negative')
      .max(10, 'Maximum 10 children allowed'),
    roomId: z.string().trim().min(1, 'Room is required'),
    guests: z.array(guestSchema).min(1, 'At least one guest is required'),
    specialRequest: z
      .string()
      .trim()
      .max(500, 'Special request is too long')
      .optional()
      .transform((value) => (value && value.length > 0 ? value : undefined)),
    paymentMethod: z.enum(['CASH', 'ONLINE']),
  })
  .strict()
  .superRefine(
    ({ checkInDate, checkOutDate, adults, children, guests }, ctx) => {
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      if (checkInDate < today) {
        ctx.addIssue({
          code: 'custom',
          path: ['checkInDate'],
          message: 'Check-in cannot be in the past',
        });
      }

      if (checkOutDate <= checkInDate) {
        ctx.addIssue({
          code: 'custom',
          path: ['checkOutDate'],
          message: 'Check-out must be after check-in',
        });
      }

      if (guests.length !== adults + children) {
        ctx.addIssue({
          code: 'custom',
          path: ['guests'],
          message: 'Guest count must match adults + children',
        });
      }
    },
  );

export class CreateBookingDto extends createZodDto(CreateBookingSchema) {}
