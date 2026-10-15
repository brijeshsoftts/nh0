import { useQuery } from "@tanstack/react-query";

import { apiClient } from "@/lib/apiClient";
import { createCrud } from "@/lib/crud/createCrud";
import type { ApiResponse } from "@/types/api.types";

import type { HousekeeperRoomDetails } from "./types";

export const roomsCrud = createCrud()({
  resource: "rooms",
  endpoint: "/rooms",
  label: "Room",
});

export const tasksKeys = roomsCrud.keys;
export const tasksService = roomsCrud.service;

export const {
  useList: useRooms,
  useDetail: useRoom,
  useStats: useRoomsStats,
  useDelete: useDeleteRoom,
  useCreate: useCreateRoom,
  useUpdate: useUpdateRoom,
} = roomsCrud;

export function useHousekeeperRoomDetails(roomId?: string) {
  return useQuery({
    queryKey: [...roomsCrud.keys.all, "housekeeper-detail", roomId],
    queryFn: async () => {
      if (!roomId) {
        throw new Error("Room ID is required.");
      }

      const response = await apiClient.get<ApiResponse<HousekeeperRoomDetails>>(
        `/rooms/${roomId}`
      );

      return response.data.data;
    },
    enabled: !!roomId,
  });
}
