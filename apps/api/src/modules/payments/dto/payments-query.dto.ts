import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

import { enumQueryParam } from '../../../common/helpers/query-filter.helper';
import { PaymentMethod, PaymentStatus } from '../../../types/prisma.types';

export const PaymentsQuerySchema = z
  .object({
    search: z.string('Search must be a string').trim().max(100).optional(),
    paymentStatus: enumQueryParam(
      PaymentStatus,
      'Payment status must be pending, completed, failed, or refunded',
    ),
    status: enumQueryParam(
      PaymentStatus,
      'Status must be pending, completed, failed, or refunded',
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

export class PaymentsQueryDto extends createZodDto(PaymentsQuerySchema) {}
