import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { notifyError } from "@/lib/notification";

import { authMutationKeys } from "../auth.keys";
import { authService } from "../auth.service";
import {
  type ResetPassword,
  ResetPasswordSchema,
} from "../schema/reset-password.schema";

export function useForgotPassword() {
  return useMutation({
    mutationKey: authMutationKeys.forgotPassword,
    mutationFn: authService.forgotPassword,
    onSuccess: (response) => {
      toast.success(
        response?.message ??
          "If the account exists, a reset link has been sent."
      );
    },
    onError: notifyError,
  });
}

export function useResetPassword(token: string) {
  const form = useForm<ResetPassword>({
    resolver: zodResolver(ResetPasswordSchema),
  });
  const mutation = useMutation({
    mutationKey: authMutationKeys.resetPassword,
    mutationFn: (data: ResetPassword) => authService.resetPassword(token, data),
    onSuccess: (response) => {
      toast.success(response?.message ?? "Password reset successfully.");
    },
    onError: notifyError,
  });

  return {
    submit: (data: ResetPassword) => mutation.mutate(data),
    isPending: mutation.isPending,
    error: mutation.error,
    handleSubmit: form.handleSubmit,
    register: form.register,
    errors: form.formState.errors,
    getValues: form.getValues,
    reset: form.reset,
    resetMutation: mutation.reset,
  };
}
