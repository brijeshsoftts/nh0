import z from "zod";

const MAX_IMAGE_SIZE = 5 * 1024 * 1024;
const CUSTOMER_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png"];

const requiredString = (message: string) => z.string().trim().min(1, message);
const customerImageSchema = z
  .instanceof(File, { message: "Select an image file" })
  .refine((file) => CUSTOMER_IMAGE_TYPES.includes(file.type), {
    message: "Only JPG and PNG images are allowed",
  })
  .refine((file) => file.size <= MAX_IMAGE_SIZE, {
    message: "Image must be 5 MB or smaller",
  });

export const CreateCustomerSchema = z
  .object({
    fullName: requiredString("Full name is required").max(
      100,
      "Full name must be 100 characters or less"
    ),
    phone: requiredString("Phone number is required"),
    email: z.email("Enter a valid email address"),
    address: requiredString("Address is required").max(
      500,
      "Address must be 500 characters or less"
    ),
    idProofNumber: requiredString("ID proof number is required"),
    idProofImage: customerImageSchema,
    signatureImage: customerImageSchema,
  })
  .strict();

export type CreateCustomer = z.infer<typeof CreateCustomerSchema>;
