import { z } from "zod";

const guestNameSchema = z
  .string()
  .trim()
  .min(2, "Enter the guest's full name.")
  .max(120, "Name cannot exceed 120 characters.");

const additionalGuestSchema = z.object({ fullName: guestNameSchema }).strict();

export function createPublicCheckoutSchema(adults: number, children: number) {
  return z
    .object({
      fullName: guestNameSchema,
      email: z.email("Enter a valid email address.").trim().toLowerCase(),
      phone: z
        .string()
        .trim()
        .regex(/^[6-9]\d{9}$/, "Enter a valid 10-digit Indian mobile number."),
      companions: z
        .array(additionalGuestSchema)
        .length(adults + children - 1, "Guest details are incomplete."),
    })
    .strict();
}
