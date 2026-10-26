import { z } from "zod";

import {
  MAX_IMAGES,
  RoomTypeFieldsSchema,
  RoomTypeImageSchema,
} from "./createRoomType.schema";

export const UpdateRoomTypeFormSchema = RoomTypeFieldsSchema.extend({
  images: z.array(RoomTypeImageSchema).max(MAX_IMAGES),
  isActive: z.boolean(),
}).superRefine((data, ctx) => {
  if (data.adults + data.children > data.maxGuests) {
    ctx.addIssue({
      code: "custom",
      path: ["adults"],
      message: "Adults and children together cannot exceed maximum guests",
    });
    ctx.addIssue({
      code: "custom",
      path: ["children"],
      message: "Adults and children together cannot exceed maximum guests",
    });
  }
});

export type UpdateRoomTypeForm = z.input<typeof UpdateRoomTypeFormSchema>;
export type UpdateRoomTypeFormOutput = z.output<
  typeof UpdateRoomTypeFormSchema
>;

export type UpdateRoomTypePayload = UpdateRoomTypeForm & {
  retainedImageIds: string[];
  primaryImage: string;
};
