import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

const cuidSchema = z.string().cuid();

const getToday = () => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return today;
};

const getTomorrow = () => {
  const tomorrow = getToday();
  tomorrow.setDate(tomorrow.getDate() + 1);
  return tomorrow;
};

export const guestSchema = z.object({
  fullName: z
    .string()
    .trim()
    .min(2, 'Guest name must be at least 2 characters long')
    .max(100, 'Guest name must not exceed 100 characters'),

  age: z
    .number()
    .int('Guest age must be a whole number')
    .min(1, 'Guest age must be at least 1')
    .max(120, 'Guest age must not exceed 120'),

  gender: z.enum(['MALE', 'FEMALE', 'OTHER'], {
    message: 'Please select a valid gender',
  }),

  idProofNumber: z
    .string()
    .trim()
    .max(50, 'ID proof number must not exceed 50 characters')
    .optional(),
});

export const CreateBookingSchema = z
  .object({
    customerId: cuidSchema,
    roomId: cuidSchema,
    checkInDate: z.coerce.date({
      message: 'Please provide a valid check-in date',
    }),
    checkOutDate: z.coerce.date({
      message: 'Please provide a valid check-out date',
    }),
    totalGuests: z
      .number()
      .int('Total guests must be a whole number')
      .min(1, 'Total guests must be at least 1'),
    guests: z.array(guestSchema).optional(),
    specialRequest: z
      .string()
      .trim()
      .max(500, 'Special request must not exceed 500 characters')
      .optional(),
    paymentMethod: z.enum(['CASH', 'ONLINE'], {
      message: 'Please select a valid payment method',
    }),
  })
  .superRefine((data, ctx) => {
    const today = getToday();
    const tomorrow = getTomorrow();

    if (data.checkInDate < today) {
      ctx.addIssue({
        code: 'custom',
        path: ['checkInDate'],
        message: 'Check-in date cannot be earlier than today',
      });
    }

    if (data.checkOutDate < tomorrow) {
      ctx.addIssue({
        code: 'custom',
        path: ['checkOutDate'],
        message: 'Check-out date must be at least tomorrow',
      });
    }

    if (data.checkOutDate <= data.checkInDate) {
      ctx.addIssue({
        code: 'custom',
        path: ['checkOutDate'],
        message: 'Check-out date must be after the check-in date',
      });
    }

    if (data.guests && data.guests?.length !== data.totalGuests) {
      ctx.addIssue({
        code: 'custom',
        path: ['guests'],
        message:
          'Number of guest details must match the total number of guests',
      });
    }
  });

export class CreateBookingDto extends createZodDto(CreateBookingSchema) {}
