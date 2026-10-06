import { z } from "zod";

export const MAX_IMAGES = 8;
export const MAX_FILE_SIZE = 5 * 1024 * 1024;

export const ALLOWED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
] as const;

export const BED_TYPES = ["SINGLE", "DOUBLE", "QUEEN", "KING", "TWIN"] as const;

const imageSchema = z.object({
  image: z
    .instanceof(File, {
      message: "Please select a valid image",
    })
    .refine(
      (file) =>
        ALLOWED_IMAGE_TYPES.includes(
          file.type as (typeof ALLOWED_IMAGE_TYPES)[number]
        ),
      {
        message: "Only JPG, JPEG, and PNG images are allowed",
      }
    )
    .refine((file) => file.size <= MAX_FILE_SIZE, {
      message: "Each image must be 5 MB or smaller",
    }),

  isPrimary: z.boolean().optional(),
});

export const CreateRoomTypeSchema = z
  .object({
    name: z
      .string()
      .trim()
      .min(2, "Room type name must be at least 2 characters")
      .max(100, "Room type name cannot exceed 100 characters"),

    description: z
      .string()
      .trim()
      .max(1000, "Description cannot exceed 1000 characters")
      .optional()
      .or(z.literal("")),

    sizeSqFt: z
      .number({
        message: "Size must be a number",
      })
      .int("Size must be a whole number")
      .positive("Size must be greater than 0")
      .optional(),

    maxGuests: z
      .number({
        message: "Maximum guests is required",
      })
      .int("Maximum guests must be a whole number")
      .min(1, "Maximum guests must be at least 1"),

    adults: z
      .number({
        message: "Number of adults is required",
      })
      .int("Adults must be a whole number")
      .min(1, "At least 1 adult is required"),

    children: z
      .number({
        message: "Number of children is required",
      })
      .int("Children must be a whole number")
      .min(0, "Children cannot be negative"),

    basePrice: z
      .number({
        message: "Base price is required",
      })
      .int("Base price must be a whole number")
      .positive("Base price must be greater than 0"),

    currency: z
      .string()
      .regex(/^[A-Z]{3}$/, "Currency must be exactly 3 uppercase letters")
      .refine((value) => value === "INR", {
        message: "Only INR is supported",
      }),

    bedType: z.enum(BED_TYPES, {
      message: "Please select a valid bed type",
    }),

    bedCount: z
      .number({
        message: "Bed count is required",
      })
      .int("Bed count must be a whole number")
      .min(1, "At least 1 bed is required"),

    smokingAllowed: z.boolean(),

    petsAllowed: z.boolean(),

    amenities: z
      .array(z.string().trim())
      .refine(
        (items) => new Set(items).size === items.length,
        "Amenities cannot contain duplicates"
      ),

    images: z
      .array(imageSchema)
      .min(1, "At least 1 room image is required")
      .max(8, "You can upload a maximum of 8 images")
      .refine(
        (images) => images.filter((item) => item.isPrimary).length === 1,
        "Exactly one image must be selected as the primary image"
      ),
  })
  .superRefine((data, ctx) => {
    if (data.adults + data.children > data.maxGuests) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["adults"],
        message: "Adults and children together cannot exceed maximum guests",
      });

      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["children"],
        message: "Adults and children together cannot exceed maximum guests",
      });
    }
  });

export type CreateRoomType = z.infer<typeof CreateRoomTypeSchema>;
