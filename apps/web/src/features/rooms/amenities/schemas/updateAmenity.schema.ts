import { z } from "zod";

import { CreateAmenitySchema } from "./createAmenity.schema";

export const UpdateAmenitySchema = CreateAmenitySchema.partial();
export type UpdateAmenity = z.infer<typeof UpdateAmenitySchema>;
