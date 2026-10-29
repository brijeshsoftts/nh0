import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

import {
  booleanQueryParam,
  enumQueryParam,
} from '../../../common/helpers/query-filter.helper';
import {
  HousekeepingStatus,
  OccupancyStatus,
} from '../../../types/prisma.types';

export const RoomsQuerySchema = z
  .object({
    search: z
      .string('Search must be a string')
      .max(100, 'Search must be 100 characters or less')
      .optional(),
    isActive: booleanQueryParam('isActive must be true or false'),
    occupancyStatus: enumQueryParam(OccupancyStatus),
    housekeepingStatus: enumQueryParam(HousekeepingStatus),
    roomType: z.cuid('Invalid room type ID').optional(),
    page: z.coerce
      .number('Page must be a number')
      .int('Page must be a whole number')
      .min(1, 'Page must be at least 1')
      .default(1),
    limit: z.coerce
      .number('Limit must be a number')
      .int('Limit must be a whole number')
      .min(1, 'Limit must be at least 1')
      .max(100, 'Limit must be 100 or less')
      .default(10),
  })
  .strict();

export class RoomsQueryDto extends createZodDto(RoomsQuerySchema) {}
