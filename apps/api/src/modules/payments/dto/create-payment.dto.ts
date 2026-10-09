import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

export const CreatePaymentSchema = z
  .object({
    invoiceId: z
      .string('Invoice ID is required')
      .min(1, 'Invoice ID is required'),
    amount: z
      .number('Amount must be a number')
      .int('Amount must be a whole number')
      .positive('Amount must be greater than zero'),
  })
  .strict();

export class CreatePaymentDto extends createZodDto(CreatePaymentSchema) {}
