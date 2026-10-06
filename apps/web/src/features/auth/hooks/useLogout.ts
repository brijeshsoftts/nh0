import { useMutation } from "@tanstack/react-query";

import { notifyError } from "@/lib/notification";

import { authMutationKeys } from "../auth.keys";
import { authService } from "../auth.service";

export function useLogout() {
  const { isPending, mutate } = useMutation({
    mutationKey: authMutationKeys.logout,
    mutationFn: authService.logout,
    onSuccess: () => {
      window.location.href = "/login";
    },
    onError: notifyError,
  });

  return {
    handleLogout: () => mutate(),
    isLoading: isPending,
  };
}
