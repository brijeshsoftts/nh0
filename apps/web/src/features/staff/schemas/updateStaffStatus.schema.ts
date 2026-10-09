import { z } from "zod";

export const UpdateStaffStatusSchema = z
  .object({
    isActive: z.boolean("Account status must be true or false"),
  })
  .strict();

export type UpdateStaffStatus = z.infer<typeof UpdateStaffStatusSchema>;
