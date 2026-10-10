import { z } from "zod";

import { CreateStaffSchema } from "./createStaff.schema";

export const UpdateStaffSchema = CreateStaffSchema.partial()
  .strict()
  .refine((value) => Object.keys(value).length > 0, {
    message: "Provide at least one staff field to update",
  });

export type UpdateStaff = z.infer<typeof UpdateStaffSchema>;
