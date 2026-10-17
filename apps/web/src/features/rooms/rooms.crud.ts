import { useQuery } from "@tanstack/react-query";

import { apiClient } from "@/lib/apiClient";
import { createCrud } from "@/lib/crud/createCrud";
import type { ApiListResponse, ApiResponse } from "@/types/api.types";

import type { BrowseRoom } from "./components/BrowseRoomCard";
import type { HousekeeperRoom, HousekeeperRoomDetails } from "./room.types";

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

export function useHousekeeperCleaningRooms() {
  return useQuery({
    queryKey: roomsCrud.keys.custom("housekeeper-dashboard", "dirty-rooms", 5),
    queryFn: async () => {
      const response = await apiClient.get<ApiListResponse<HousekeeperRoom>>(
        "/rooms",
        { params: { page: 1, limit: 5, housekeepingStatus: "DIRTY" } }
      );

      return response.data.data;
    },
  });
}

export function useBrowseRooms(params: unknown) {
  return useQuery({
    queryKey: roomsCrud.keys.custom("browse-rooms", params),
    queryFn: () =>
      apiClient
        .get<ApiListResponse<BrowseRoom>>("/room-types", { params })
        .then((res) => res.data),
  });
}
