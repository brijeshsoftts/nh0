import { z } from "zod";

export const CreateStaffSchema = z
  .object({
    fullName: z
      .string("Full name is required")
      .trim()
      .min(2, "Full name must be at least 2 characters")
      .max(100, "Full name must be 100 characters or fewer"),
    email: z.email("Invalid email format"),
    phone: z
      .string("Phone number is required")
      .trim()
      .min(7, "Phone number must be at least 7 characters")
      .max(20, "Phone number must be 20 characters or fewer"),
    fatherName: z.string().trim().min(2).max(100),
    motherName: z.string().trim().min(2).max(100),
    idProofNumber: z.string().trim().min(1).max(100),
    qualification: z.string().trim().min(1).max(200),
    experience: z.string().trim().min(1).max(100),
    category: z.enum(["RECEPTIONIST", "HOUSEKEEPER"]),
    emergencyContact: z.string().trim().min(7).max(20),
    address: z.string().trim().min(1).max(500),
  })
  .strict();

export type CreateStaff = z.infer<typeof CreateStaffSchema>;
