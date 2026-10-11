import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { notifyError } from "@/lib/notification";

import {
  type CreateTask,
  CreateTaskSchema,
} from "../schemas/createTask.schema";
import { tasksKeys, tasksMutationKeys } from "../tasks.keys";
import { tasksService } from "../tasks.service";

function useCreateTask() {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationKey: tasksMutationKeys.create,
    mutationFn: tasksService.create,
    onSuccess: (res) => {
      toast.success(res?.message || "Task created successfully.");
      queryClient.invalidateQueries({
        queryKey: tasksKeys.all,
      });
    },
    onError: notifyError,
  });
  return mutation;
}

export function useCreateTaskFacade() {
  const { mutate, isPending, isSuccess } = useCreateTask();

  const {
    handleSubmit,
    register,
    control,
    formState: { errors },
    getValues,
  } = useForm({
    resolver: zodResolver(CreateTaskSchema),
  });

  return {
    submit: (data: CreateTask) => mutate(data),
    isPending,
    isSuccess,
    register,
    control,
    handleSubmit,
    errors,
    getValues,
  };
}
