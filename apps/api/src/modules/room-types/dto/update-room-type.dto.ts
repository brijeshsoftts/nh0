import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

import { RoomTypeFieldsSchema } from './create-room-type.dto';

const retainedImageIdsSchema = z.preprocess(
  (value) => {
    if (typeof value !== 'string') return value ?? [];

    try {
      return JSON.parse(value);
    } catch {
      return [value];
    }
  },
  z
    .array(z.string().uuid('Image ID must be valid'))
    .max(8, 'A room type can have at most 8 images')
    .refine((ids) => new Set(ids).size === ids.length, {
      message: 'Images cannot be duplicated',
    }),
);

export const UpdateRoomTypeSchema = RoomTypeFieldsSchema.extend({
  retainedImageIds: retainedImageIdsSchema,
  primaryImage: z.string().trim().min(1, 'Select a primary image'),
}).superRefine((room, context) => {
  if (room.adults + room.children > room.maxGuests) {
    context.addIssue({
      code: 'custom',
      path: ['maxGuests'],
      message: 'Adults and children cannot exceed the maximum guest count',
    });
  }
});

export class UpdateRoomTypeDto extends createZodDto(UpdateRoomTypeSchema) {}
