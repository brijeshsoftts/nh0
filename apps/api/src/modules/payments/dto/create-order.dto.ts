import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

export const CreateOrderSchema = z
  .object({
    bookingId: z.string().trim().min(1, 'Booking ID is required.'),
    paymentId: z.string().trim().min(1, 'Payment ID is required.').optional(),
  })
  .strict();

export class CreateOrderDto extends createZodDto(CreateOrderSchema) {}
