import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

export const CreatePaymentSchema = z
  .object({
    invoiceId: z
      .string('Invoice ID is required')
      .min(1, 'Invoice ID is required'),
  })
  .strict();

export class CreatePaymentDto extends createZodDto(CreatePaymentSchema) {}
