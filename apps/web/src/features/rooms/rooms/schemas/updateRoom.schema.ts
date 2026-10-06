import type { z } from "zod";

import { CreateRoomSchema } from "./createRoom.schema";

export const UpdateRoomSchema = CreateRoomSchema.partial();
export type UpdateRoom = z.infer<typeof UpdateRoomSchema>;
