import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

export const CreateRoomSchema = z
  .object({
    name: z
      .string('Room name is required')
      .min(2, 'Room name must be at least 2 characters')
      .max(100, 'Room name must be 100 characters or less'),
    roomNumber: z.coerce
      .number('Please enter a room number.')
      .min(1, 'Room number must be at least 1.')
      .max(1000, 'Room number cannot be greater than 50.'),
    roomTypeId: z.string().cuid('Please select a valid room type.'),
    floor: z.coerce
      .number('Please enter a floor number.')
      .nonnegative('Floor cannot be less than 0.')
      .min(1, 'Floor number must be at least 1.')
      .max(50, 'Floor number cannot be greater than 50.'),
    description: z
      .string()
      .max(500, 'Description cannot be longer than 500 characters.')
      .optional(),
    occupancyStatus: z
      .enum(['VACANT', 'RESERVED', 'OCCUPIED', 'OUT_OF_ORDER'], {
        error: 'Please select a valid occupancy status.',
      })
      .default('VACANT'),
    housekeepingStatus: z
      .enum(['CLEAN', 'DIRTY', 'CLEANING'], {
        error: 'Please select a valid housekeeping status.',
      })
      .default('CLEAN'),
    isActive: z.boolean().default(true),
  })
  .strict();

export class CreateRoomDto extends createZodDto(CreateRoomSchema) {}
