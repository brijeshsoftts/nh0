import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { notifyError } from "@/lib/notification";

import { type CreateUser, CreateUserSchema } from "../schema/createUser.schema";
import { usersKeys, usersMutationKeys } from "../users.keys";
import { usersService } from "../users.service";

function useCreateUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: usersMutationKeys.create,
    mutationFn: usersService.create,
    onSuccess: (res) => {
      toast.success(res?.message || "User created successfully.");
      queryClient.invalidateQueries({
        queryKey: usersKeys.all,
      });
    },
    onError: notifyError,
  });
}

export function useCreateUserFacade() {
  const { mutate, isPending, isSuccess } = useCreateUser();

  const {
    handleSubmit,
    register,
    control,
    formState: { errors },
  } = useForm<CreateUser>({
    resolver: zodResolver(CreateUserSchema),
  });

  return {
    submit: (data: CreateUser) => mutate(data),
    isPending,
    isSuccess,
    register,
    control,
    handleSubmit,
    errors,
  };
}
