import z from "zod";

export const CreateUserSchema = z
  .object({
    fullName: z
      .string()
      .trim()
      .min(2, "Full name must be at least 2 characters")
      .max(100, "Full name must be 100 characters or less"),
    email: z.email("Enter a valid email address"),
    phone: z
      .string()
      .trim()
      .min(7, "Phone number must be at least 7 characters")
      .max(20, "Phone number must be 20 characters or less"),
  })
  .strict();

export type CreateUser = z.infer<typeof CreateUserSchema>;
