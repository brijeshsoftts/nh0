import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

export const UpdateStaffSchema = z
  .object({
    fullName: z.string().trim().min(2).max(100).optional(),
    email: z.email('Invalid email format').optional(),
    phone: z.string().trim().min(7).max(20).optional(),
    fatherName: z.string().trim().min(2).max(100).optional(),
    motherName: z.string().trim().min(2).max(100).optional(),
    idProofNumber: z.string().trim().min(1).max(100).optional(),
    qualification: z.string().trim().min(1).max(200).optional(),
    experience: z.string().trim().min(1).max(100).optional(),
    category: z.enum(['RECEPTIONIST', 'HOUSEKEEPER']).optional(),
    emergencyContact: z.string().trim().min(7).max(20).optional(),
    address: z.string().trim().min(1).max(500).optional(),
  })
  .strict()
  .refine((value) => Object.keys(value).length > 0, {
    message: 'Provide at least one staff field to update',
  });

export class UpdateStaffDto extends createZodDto(UpdateStaffSchema) {}
