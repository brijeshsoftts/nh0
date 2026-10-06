import { z } from "zod";

const MAX_IMAGE_SIZE = 5 * 1024 * 1024;
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/png"];
const BED_TYPES = [
  "SINGLE",
  "TWIN",
  "DOUBLE",
  "QUEEN",
  "KING",
  "BUNK",
  "SOFA_BED",
] as const;

const roomImageSchema = z.object({
  image: z
    .custom<File>(
      (value) => typeof File !== "undefined" && value instanceof File,
      { error: "Choose a valid image file." }
    )
    .refine((file) => ACCEPTED_IMAGE_TYPES.includes(file.type), {
      error: "Images must be JPG, JPEG, or PNG files.",
    })
    .refine((file) => file.size <= MAX_IMAGE_SIZE, {
      error: "Each image must be 5 MB or smaller.",
    }),
  isPrimary: z.boolean(),
});

export const createRoomTypeSchema = z
  .object({
    name: z
      .string()
      .trim()
      .min(2, { error: "Name must be at least 2 characters." })
      .max(100, { error: "Name must be 100 characters or fewer." }),
    description: z
      .string()
      .trim()
      .max(1000, { error: "Description must be 1,000 characters or fewer." }),
    sizeSqFt: z
      .number()
      .int({ error: "Room size must be a whole number." })
      .positive({ error: "Room size must be greater than 0." })
      .optional(),
    maxGuests: z
      .number()
      .int({ error: "Maximum guests must be a whole number." })
      .min(1, { error: "Allow at least 1 guest." }),
    adults: z
      .number()
      .int({ error: "Adults must be a whole number." })
      .min(1, { error: "Allow at least 1 adult." }),
    children: z
      .number()
      .int({ error: "Children must be a whole number." })
      .min(0, { error: "Children cannot be negative." }),
    basePrice: z
      .number()
      .int({ error: "Nightly price must be a whole number." })
      .positive({ error: "Nightly price must be greater than 0." }),
    currency: z.literal("INR", { error: "Currency must be INR." }),
    bedType: z.enum(BED_TYPES, { error: "Choose a valid bed type." }),
    bedCount: z
      .number()
      .int({ error: "Bed count must be a whole number." })
      .min(1, { error: "Include at least 1 bed." }),
    smokingAllowed: z.boolean(),
    petsAllowed: z.boolean(),
    amenities: z
      .array(z.string().cuid({ error: "Choose a valid amenity." }))
      .refine((ids) => new Set(ids).size === ids.length, {
        error: "An amenity can only be selected once.",
      }),
    images: z
      .array(roomImageSchema)
      .min(1, { error: "Add at least one room photo." })
      .max(8, { error: "You can add up to 8 photos." })
      .refine(
        (images) => images.filter((image) => image.isPrimary).length === 1,
        {
          error: "Choose exactly one primary photo.",
        }
      ),
  })
  .strict()
  .refine((room) => room.adults + room.children <= room.maxGuests, {
    error: "Adults and children cannot exceed the maximum guest count.",
    path: ["maxGuests"],
  });

export type CreateRoomTypeInput = z.infer<typeof createRoomTypeSchema>;
