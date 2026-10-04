import { createZodDto } from 'nestjs-zod';

import { CreateAmenitySchema } from './create-amenity.dto';

export const UpdateAmenitySchema = CreateAmenitySchema.partial()
  .strict()
  .refine((amenity) => Object.keys(amenity).length > 0, {
    message: 'Provide at least one amenity field to update',
  });

export class UpdateAmenityDto extends createZodDto(UpdateAmenitySchema) {}
