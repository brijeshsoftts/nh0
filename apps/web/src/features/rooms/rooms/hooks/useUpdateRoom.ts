import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { notifyError } from "@/lib/notification";

import { roomsKeys, roomsMutationKeys } from "../rooms.keys";
import { roomsService } from "../rooms.service";
import {
  type UpdateRoom,
  UpdateRoomSchema,
} from "../schemas/updateRoom.schema";

export function useReleaseOutOfOrderRoom(id: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["rooms", "release-out-of-order", id],
    mutationFn: () => roomsService.releaseOutOfOrder(id),
    onSuccess: (res) => {
      toast.success(res?.message || "Room returned to service.");
      void queryClient.invalidateQueries({ queryKey: roomsKeys.all });
    },
    onError: notifyError,
  });
}

export function useUpdateRoomMutation(id: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: roomsMutationKeys.update,
    mutationFn: (data: UpdateRoom) => roomsService.update(id, data),

    onSuccess: (res) => {
      toast.success(res?.message || "Room updated successfully.");

      queryClient.invalidateQueries({
        queryKey: roomsKeys.all,
      });
    },

    onError: notifyError,
  });
}

export function useUpdateRoomFacade(id: string) {
  const { mutate, isPending, isSuccess } = useUpdateRoomMutation(id);

  const {
    handleSubmit,
    register,
    formState: { errors },
    getValues,
    reset,
    control,
  } = useForm({
    resolver: zodResolver(UpdateRoomSchema),
  });

  return {
    submit: (data: UpdateRoom) => mutate(data),
    isPending,
    isSuccess,
    register,
    handleSubmit,
    errors,
    getValues,
    reset,
    control,
  };
}
