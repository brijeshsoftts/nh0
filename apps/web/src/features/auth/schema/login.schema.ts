import z from "zod";

export const LoginSchema = z
  .object({
    email: z.email("Enter a valid email address"),
    password: z.string().min(1, "Password is required"),
  })
  .strict();

export type Login = z.infer<typeof LoginSchema>;
