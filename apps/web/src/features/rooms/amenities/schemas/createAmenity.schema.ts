import { z } from "zod";

export const CreateAmenitySchema = z
  .object({
    name: z
      .string("Amenity name is required")
      .trim()
      .min(1, "Amenity name cannot be empty")
      .max(100, "Amenity name must be 100 characters or fewer"),
    description: z
      .string("Description must be text")
      .max(500, "Description must be 500 characters or fewer")
      .nullable()
      .optional(),
    icon: z
      .string("Icon must be text")
      .max(100, "Icon must be 100 characters or fewer")
      .nullable()
      .optional(),
    category: z
      .enum(
        [
          "ROOM",
          "BATHROOM",
          "FOOD",
          "ENTERTAINMENT",
          "CONNECTIVITY",
          "COMFORT",
          "SAFETY",
          "OTHER",
        ],
        "Select a valid amenity category"
      )
      .optional(),
    isActive: z.boolean("Active status must be true or false").optional(),
  })
  .strict();

export type CreateAmenity = z.infer<typeof CreateAmenitySchema>;
