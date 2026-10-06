import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";

import { notifyError } from "@/lib/notification";

import { authMutationKeys } from "../auth.keys";
import { authService } from "../auth.service";
import { type Login, LoginSchema } from "../schema/login.schema";

export function useLogin() {
  const mutation = useMutation({
    mutationKey: authMutationKeys.login,
    mutationFn: authService.login,
    onSuccess: () => {
      window.location.href = "/dashboard";
    },
    onError: notifyError,
  });

  return mutation;
}

export function useLoginFacade() {
  const { mutate, isPending, isSuccess } = useLogin();

  const {
    handleSubmit,
    register,
    formState: { errors },
    getValues,
  } = useForm<Login>({
    resolver: zodResolver(LoginSchema),
  });

  return {
    submit: (data: Login) => mutate(data),
    isPending,
    isSuccess,
    register,
    handleSubmit,
    errors,
    getValues,
  };
}
