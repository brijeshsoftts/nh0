import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

export const UpdateInvoiceSchema = z
  .object({
    subtotal: z
      .number('Subtotal must be a number')
      .int('Subtotal must be a whole number')
      .min(0, 'Subtotal cannot be negative')
      .optional(),
    taxAmount: z
      .number('GST amount must be a number')
      .int('GST amount must be a whole number')
      .min(0, 'GST amount cannot be negative')
      .optional(),
    discountAmount: z
      .number('Discount must be a number')
      .int('Discount must be a whole number')
      .min(0, 'Discount cannot be negative')
      .optional(),
  })
  .strict()
  .refine((value) => Object.keys(value).length > 0, {
    message: 'Provide at least one invoice amount to update',
  });

export class UpdateInvoiceDto extends createZodDto(UpdateInvoiceSchema) {}
