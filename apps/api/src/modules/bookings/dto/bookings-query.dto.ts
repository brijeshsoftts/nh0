import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

import { enumQueryParam } from '../../../common/helpers/query-filter.helper';
import {
  BookingStatus,
  InvoiceStatus,
  PaymentMethod,
} from '../../../types/prisma.types';

export const BookingsQuerySchema = z
  .object({
    search: z.string('Search must be a string').trim().max(100).optional(),
    status: enumQueryParam(
      BookingStatus,
      'Status must be a valid booking status',
    ),
    invoiceStatus: enumQueryParam(
      InvoiceStatus,
      'Invoice status must be a valid invoice status',
    ),
    paymentMethod: enumQueryParam(
      PaymentMethod,
      'Payment method must be cash or online',
    ),
    page: z.coerce.number('Page must be a number').int().min(1).default(1),
    limit: z.coerce
      .number('Limit must be a number')
      .int()
      .min(1)
      .max(100)
      .default(10),
  })
  .strict();

export class BookingsQueryDto extends createZodDto(BookingsQuerySchema) {}
