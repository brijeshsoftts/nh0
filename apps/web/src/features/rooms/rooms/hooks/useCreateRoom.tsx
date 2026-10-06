import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { notifyError } from "@/lib/notification";

import { roomsKeys, roomsMutationKeys } from "../rooms.keys";
import { roomsService } from "../rooms.service";
import {
  type CreateRoom,
  CreateRoomSchema,
} from "../schemas/createRoom.schema";

function useCreateRoom() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: roomsMutationKeys.create,
    mutationFn: roomsService.create,

    onSuccess: (res) => {
      toast.success(res?.message || "Room created successfully.");

      queryClient.invalidateQueries({
        queryKey: roomsKeys.lists(),
      });
    },

    onError: notifyError,
  });
}

export function useCreateRoomFacade() {
  const { mutate, isPending, isSuccess } = useCreateRoom();

  const {
    handleSubmit,
    register,
    control,
    formState: { errors },
    getValues,
    reset,
  } = useForm({
    resolver: zodResolver(CreateRoomSchema),
  });

  return {
    submit: (data: CreateRoom) => mutate(data),
    isPending,
    control,
    isSuccess,
    register,
    handleSubmit,
    errors,
    getValues,
    reset,
  };
}
