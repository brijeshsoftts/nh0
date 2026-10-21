import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

import { notifyError } from "@/lib/notification";

import { authMutationKeys } from "../auth.keys";
import { authService } from "../auth.service";

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

export function useResetPassword() {
  return useMutation({
    mutationKey: authMutationKeys.resetPassword,
    mutationFn: authService.resetPassword,
    onSuccess: (response) => {
      toast.success(response?.message ?? "Password reset successfully.");
    },
    onError: notifyError,
  });
}
