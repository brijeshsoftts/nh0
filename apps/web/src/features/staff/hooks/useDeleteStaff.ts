import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { notifyError } from "@/lib/notification";

import { staffKeys, staffMutationKeys } from "../staff.keys";
import { staffService } from "../staff.service";

export function useDeleteStaff(id: string) {
  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationKey: staffMutationKeys.delete,
    mutationFn: () => staffService.delete(id),
    onSuccess: (res) => {
      toast.success(res?.message || "Staff deleted successfully");
      queryClient.invalidateQueries({
        queryKey: staffKeys.lists,
      });
    },
    onError: notifyError,
  });

  return {
    isDeleting: isPending,
    handleDelete: () => mutate(),
  };
}
