import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

export const CreateRoomTypeSchema = z
  .object({
    name: z
      .string()
      .trim()
      .min(2, 'Room type name must be at least 2 characters')
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
    currency: z
      .string()
      .regex(/^[A-Z]{3}$/, 'Currency must be a 3-letter uppercase code')
      .refine(
        (value) => value === 'INR',
        'Only INR currency is currently supported',
      )
      .default('INR'),
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
      .min(1, 'At least 1 adult is required'),
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
      .positive('Base price must be greater than 0'),
    bedType: z.enum(
      ['SINGLE', 'DOUBLE', 'QUEEN', 'KING', 'TWIN', 'BUNK', 'SOFA_BED'],
      {
        message: 'Please select a valid bed type',
      },
    ),
    bedCount: z.coerce
      .number({
        message: 'Bed count must be a number',
      })
      .int('Bed count must be a whole number')
      .min(1, 'Room must have at least 1 bed'),
    smokingAllowed: z.preprocess(
      (value) => (value === 'true' ? true : value === 'false' ? false : value),
      z.boolean('Smoking preference must be true or false'),
    ),
    petsAllowed: z.preprocess(
      (value) => (value === 'true' ? true : value === 'false' ? false : value),
      z.boolean('Pet policy must be true or false'),
    ),
    amenities: z.preprocess(
      (value) => {
        if (value === undefined || value === '') return [];
        return Array.isArray(value) ? value : [value];
      },
      z
        .array(z.string().cuid('Amenity must be a valid cuid'))
        .max(20, 'Amenities must be 20 or less')
        .refine(
          (ids) => new Set(ids).size === ids.length,
          'Amenities cannot be duplicated',
        ),
    ),
    isActive: z.coerce
      .boolean({
        message: 'Active status must be true or false',
      })
      .default(true),
  })
  .superRefine((room, context) => {
    if (room.adults + room.children > room.maxGuests) {
      context.addIssue({
        code: 'custom',
        path: ['maxGuests'],
        message: 'Adults and children cannot exceed the maximum guest count',
      });
    }
  });

export class CreateRoomTypeDto extends createZodDto(CreateRoomTypeSchema) {}
