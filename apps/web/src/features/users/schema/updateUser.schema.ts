import z from "zod";

export const UpdateUserSchema = z
  .object({
    fullName: z
      .string()
      .trim()
      .min(2, "Full name must be at least 2 characters")
      .max(100, "Full name must be 100 characters or less")
      .optional(),
    email: z.email("Enter a valid email address").optional(),
    phone: z
      .string()
      .trim()
      .min(7, "Phone number must be at least 7 characters")
      .max(20, "Phone number must be 20 characters or less")
      .optional(),
    role: z.enum(["MANAGER", "STAFF"], "Select a valid user role").optional(),
    isActive: z.boolean().optional(),
  })
  .strict();

export type UpdateUser = z.infer<typeof UpdateUserSchema>;
