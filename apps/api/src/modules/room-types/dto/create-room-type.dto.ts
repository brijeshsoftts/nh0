import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

export const CreateRoomTypeSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, 'Room type name is required')
    .max(100, 'Room type name must be 100 characters or less'),
  description: z
    .string()
    .trim()
    .max(1000, 'Description must be 1000 characters or less')
    .optional()
    .nullable(),
  sizeSqFt: z.coerce
    .number({
      message: 'Room size must be a number',
    })
    .int('Room size must be a whole number')
    .positive('Room size must be greater than 0')
    .optional()
    .nullable(),
  maxGuests: z.coerce
    .number({
      message: 'Maximum guests must be a number',
    })
    .int('Maximum guests must be a whole number')
    .min(1, 'Room must allow at least 1 guest'),
  adults: z.coerce
    .number({
      message: 'Number of adults must be a number',
    })
    .int('Number of adults must be a whole number')
    .min(0, 'Number of adults cannot be negative'),
  children: z.coerce
    .number({
      message: 'Number of children must be a number',
    })
    .int('Number of children must be a whole number')
    .min(0, 'Number of children cannot be negative'),
  basePrice: z.coerce
    .number({
      message: 'Base price must be a number',
    })
    .int('Base price must be a whole number')
    .nonnegative('Base price cannot be negative'),
  currency: z
    .string()
    .trim()
    .length(3, 'Currency must be a 3-letter currency code')
    .transform((value) => value.toUpperCase()),
  bedType: z.enum(['SINGLE', 'DOUBLE', 'QUEEN', 'KING', 'TWIN'], {
    message: 'Please select a valid bed type',
  }),
  bedCount: z.coerce
    .number({
      message: 'Bed count must be a number',
    })
    .int('Bed count must be a whole number')
    .min(1, 'Room must have at least 1 bed'),
  smokingAllowed: z.coerce.boolean({
    message: 'Smoking preference must be true or false',
  }),
  petsAllowed: z.coerce.boolean({
    message: 'Pet policy must be true or false',
  }),
  amenities: z
    .array(z.string().cuid('Amenity must be a valid cuid'))
    .max(20, 'Amenities must be 20 or less')
    .optional(),
  isActive: z.coerce.boolean({
    message: 'Active status must be true or false',
  }),
});

export class CreateRoomTypeDto extends createZodDto(CreateRoomTypeSchema) {}
