import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { notifyError } from "@/lib/notification";

import { type UpdateUser, UpdateUserSchema } from "../schema/updateUser.schema";
import { usersKeys, usersMutationKeys } from "../users.keys";
import { usersService } from "../users.service";

function useUpdateUser(userId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: usersMutationKeys.update,
    mutationFn: (data: UpdateUser) => usersService.update(userId, data),
    onSuccess: (res) => {
      toast.success(res?.message || "User updated successfully.");
      queryClient.invalidateQueries({ queryKey: usersKeys.all });
    },
    onError: notifyError,
  });
}

export function useUpdateUserFacade(userId: string) {
  const { mutate, isPending, isSuccess } = useUpdateUser(userId);

  const {
    handleSubmit,
    register,
    control,
    formState: { errors },
  } = useForm<UpdateUser>({
    resolver: zodResolver(UpdateUserSchema),
  });

  return {
    submit: (data: UpdateUser) => mutate(data),
    isPending,
    isSuccess,
    register,
    control,
    handleSubmit,
    errors,
  };
}

export const useUpdateUserStatus = (userId: string, isActive: boolean) => {
  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationKey: usersMutationKeys.update,
    mutationFn: () => usersService.updateStatus(userId, !isActive),
    onSuccess: (res) => {
      toast.success(res?.message || "User status updated successfully.");
      queryClient.invalidateQueries({ queryKey: usersKeys.all });
    },
    onError: notifyError,
  });

  const handleToggleStatus = () => {
    mutate();
  };

  return {
    isPending,
    handleToggleStatus,
  };
};
