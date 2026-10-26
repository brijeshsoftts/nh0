import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { notifyError } from "@/lib/notification";

import { roomTypesKeys, roomTypesMutationKeys } from "../roomTypes.keys";
import { roomTypesService } from "../roomTypes.service";
import type { UpdateRoomTypePayload } from "../schemas/updateRoomType.schema";

export function useUpdateRoomType(id: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: roomTypesMutationKeys.update,
    mutationFn: (data: UpdateRoomTypePayload) =>
      roomTypesService.update(id, data),
    onSuccess: async (response) => {
      toast.success(response.message ?? "Room type updated successfully.");
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: roomTypesKeys.lists() }),
        queryClient.invalidateQueries({ queryKey: roomTypesKeys.details() }),
      ]);
    },
    onError: notifyError,
  });
}
