import { z } from "zod";

export const ChangePasswordSchema = z.object({
  oldPassword: z.string().min(8).max(128),
  newPassword: z.string().min(8).max(128),
});

export type ChangePassword = z.infer<typeof ChangePasswordSchema>;
