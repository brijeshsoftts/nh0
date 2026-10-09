import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { notifyError } from "@/lib/notification";

import { usersKeys, usersMutationKeys } from "../users.keys";
import { usersService } from "../users.service";

export function useDeleteUser(id: string) {
  const queryClient = useQueryClient();

  const { isPending, mutate } = useMutation({
    mutationKey: usersMutationKeys.delete,
    mutationFn: () => usersService.delete(id),
    onSuccess: (res) => {
      toast.success(res?.message || "User deleted successfully");
      queryClient.invalidateQueries({
        queryKey: usersKeys.lists(),
      });
    },
    onError: notifyError,
  });

  return {
    isDeleting: isPending,
    handleDelete: mutate,
  };
}
