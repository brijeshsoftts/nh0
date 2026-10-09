import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { notifyError } from "@/lib/notification";

import {
  type CreateStaff,
  CreateStaffSchema,
} from "../schemas/createStaff.schema";
import { staffKeys, staffMutationKeys } from "../staff.keys";
import { staffService } from "../staff.service";

function useCreateStaff() {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationKey: staffMutationKeys.create,
    mutationFn: staffService.create,
    onSuccess: (res) => {
      toast.success(res?.message || "Staff member registered successfully.");
      queryClient.invalidateQueries({
        queryKey: staffKeys.all,
      });
    },
    onError: notifyError,
  });
  return mutation;
}

export function useCreateStaffFacade() {
  const {
    mutate,
    isPending,
    isSuccess,
    reset: resetMutation,
  } = useCreateStaff();

  const {
    handleSubmit,
    register,
    control,
    reset: resetForm,
    formState: { errors },
    getValues,
  } = useForm<CreateStaff>({
    resolver: zodResolver(CreateStaffSchema),
  });

  useEffect(() => {
    if (isSuccess) {
      resetForm();
    }
  }, [isSuccess, resetForm]);

  return {
    submit: (data: CreateStaff) => mutate(data),
    isPending,
    isSuccess,
    register,
    control,
    handleSubmit,
    errors: errors,
    getValues,
    reset: () => {
      resetMutation();
      resetForm();
    },
  };
}
