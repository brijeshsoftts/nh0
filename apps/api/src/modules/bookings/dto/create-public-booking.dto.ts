import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

import { guestSchema } from './create-booking.dto';

export const CreatePublicBookingSchema = z
  .object({
    checkoutToken: z.uuid('Checkout token is invalid.'),
    guestName: z
      .string()
      .trim()
      .min(2, 'Guest name must contain at least 2 characters.')
      .max(120, 'Guest name cannot exceed 120 characters.'),
    guestEmail: z.email('Enter a valid email address.').trim().toLowerCase(),
    guestPhone: z
      .string()
      .trim()
      .regex(/^\+?[\d\s().-]{10,20}$/, 'Enter a valid phone number.')
      .refine((value) => value.replace(/\D/g, '').length >= 10, {
        message: 'Phone number must contain at least 10 digits.',
      }),
    roomId: z.string().trim().min(1, 'Select an available room.'),
    checkInDate: z.coerce.date('Check-in date is required.'),
    checkOutDate: z.coerce.date('Check-out date is required.'),
    adults: z.coerce.number().int().min(1).max(10),
    children: z.coerce.number().int().min(0).max(10),
    guests: z.array(guestSchema).min(1, 'Add at least one guest.'),
    specialRequest: z.string().trim().max(500).optional(),
    paymentMethod: z.literal('ONLINE'),
  })
  .strict()
  .superRefine((booking, context) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (booking.checkInDate < today) {
      context.addIssue({
        code: 'custom',
        path: ['checkInDate'],
        message: 'Check-in cannot be in the past.',
      });
    }
    if (booking.checkOutDate <= booking.checkInDate) {
      context.addIssue({
        code: 'custom',
        path: ['checkOutDate'],
        message: 'Check-out must be after check-in.',
      });
    }
    if (booking.guests.length !== booking.adults + booking.children) {
      context.addIssue({
        code: 'custom',
        path: ['guests'],
        message: 'Guest count must match adults and children.',
      });
    }
  });

export class CreatePublicBookingDto extends createZodDto(
  CreatePublicBookingSchema,
) {}
