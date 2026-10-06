import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { notifyError } from "@/lib/notification";

import { roomsKeys, roomsMutationKeys } from "../rooms.keys";
import { roomsService } from "../rooms.service";

export function useDeleteRoom() {
  const queryClient = useQueryClient();

  const { isPending, mutate } = useMutation({
    mutationKey: roomsMutationKeys.delete,
    mutationFn: roomsService.delete,
    onSuccess: (res) => {
      toast.success(res?.message || "Room deleted successfully.");
      queryClient.invalidateQueries({
        queryKey: roomsKeys.lists(),
      });
    },
    onError: notifyError,
  });

  return {
    isDeleting: isPending,
    handleDelete: (id: string) => mutate(id),
  };
}
