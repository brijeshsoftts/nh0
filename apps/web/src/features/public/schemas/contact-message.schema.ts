import { z } from "zod";

export const contactSubjects = [
  { value: "reservation", label: "Room reservation" },
  { value: "support", label: "Customer support" },
  { value: "group", label: "Group booking" },
  { value: "feedback", label: "Feedback" },
  { value: "other", label: "Other inquiry" },
] as const;

export const contactMessageSchema = z
  .object({
    fullName: z
      .string()
      .trim()
      .min(2, "Enter your full name.")
      .max(120, "Name cannot exceed 120 characters.")
      .refine((value) => !/[\r\n]/.test(value), "Enter a valid name."),
    email: z.email("Enter a valid email address.").trim().toLowerCase(),
    phone: z
      .string()
      .trim()
      .max(30, "Phone number cannot exceed 30 characters."),
    subject: z.enum(
      contactSubjects.map((subject) => subject.value),
      {
        error: "Choose a subject.",
      }
    ),
    message: z
      .string()
      .trim()
      .min(10, "Message must contain at least 10 characters.")
      .max(3000, "Message cannot exceed 3000 characters."),
  })
  .strict();

export type ContactMessageInput = z.infer<typeof contactMessageSchema>;
