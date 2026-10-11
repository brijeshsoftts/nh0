import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { notifyError } from "@/lib/notification";

import {
  type UpdateTask,
  UpdateTaskSchema,
} from "../schemas/updateTask.schema";
import { tasksKeys, tasksMutationKeys } from "../tasks.keys";
import { tasksService } from "../tasks.service";

function useUpdateTask(id: string) {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationKey: tasksMutationKeys.create,
    mutationFn: (data: UpdateTask) => tasksService.update(id, data),
    onSuccess: (res) => {
      toast.success(res?.message || "Task updated successfully.");
      queryClient.invalidateQueries({
        queryKey: tasksKeys.all,
      });
    },
    onError: notifyError,
  });
  return mutation;
}

export function useUpdateTaskFacade(id: string) {
  const { mutate, isPending, isSuccess } = useUpdateTask(id);

  const {
    handleSubmit,
    register,
    control,
    formState: { errors },
    getValues,
  } = useForm({
    resolver: zodResolver(UpdateTaskSchema),
  });

  return {
    submit: (data: UpdateTask) => mutate(data),
    isPending,
    isSuccess,
    register,
    control,
    handleSubmit,
    errors,
    getValues,
  };
}
