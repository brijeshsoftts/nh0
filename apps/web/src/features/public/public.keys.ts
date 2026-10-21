import type { AvailableRoomsParams } from "./public.types";

export const publicKeys = {
  all: ["public"] as const,
  availableRooms: (params: AvailableRoomsParams) =>
    [...publicKeys.all, "available-rooms", params] as const,
  availableRoom: (slug: string, checkInDate: string, checkOutDate: string) =>
    [...publicKeys.all, "available-room", slug, checkInDate, checkOutDate] as const,
} as const;
