import { z } from "zod";

export const ResetPasswordSchema = z
  .object({
    password: z
      .string("Password is required")
      .min(8, "Password must be at least 8 characters")
      .max(40, "Password must be 40 characters or less"),
    confirm: z.string("Password confirmation is required"),
  })
  .strict()
  .refine(({ password, confirm }) => password === confirm, {
    message: "Passwords do not match.",
    path: ["confirm"],
  });

export type ResetPassword = z.infer<typeof ResetPasswordSchema>;
