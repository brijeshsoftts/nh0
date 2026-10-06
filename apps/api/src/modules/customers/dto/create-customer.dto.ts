import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

export const CreateCustomerSchema = z
  .object({
    fullName: z.string('Full name is required').min(2).max(100),
    email: z.email('Invalid email format'),
    phone: z.string('Phone is required').min(10).max(15),
    idProofNumber: z.string('ID proof number is required').min(1).max(50),
    address: z.string('Address is required').min(5).max(500),
  })
  .strict();

export class CreateCustomerDto extends createZodDto(CreateCustomerSchema) {}
