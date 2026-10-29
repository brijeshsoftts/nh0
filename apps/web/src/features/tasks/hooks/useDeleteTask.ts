import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { notifyError } from "@/lib/notification";

import { roomsKeys } from "../../rooms/rooms/rooms.keys";
import { tasksKeys, tasksMutationKeys } from "../tasks.keys";
import { tasksService } from "../tasks.service";

export function useDeleteTask() {
  const queryClient = useQueryClient();

  const { isPending, mutate } = useMutation({
    mutationKey: tasksMutationKeys.delete,
    mutationFn: tasksService.delete,
    onSuccess: (res) => {
      toast.success(res?.message || "Task deleted successfully");
      queryClient.invalidateQueries({
        queryKey: tasksKeys.lists(),
      });
      void queryClient.invalidateQueries({ queryKey: roomsKeys.all });
    },
    onError: notifyError,
  });

  return {
    isDeleting: isPending,
    handleDelete: mutate,
  };
}
