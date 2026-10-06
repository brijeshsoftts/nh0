import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { notifyError } from "@/lib/notification";

import { customersKeys, customersMutationKeys } from "../customers.keys";
import { customersService } from "../customers.service";

export function useDeleteCustomer() {
  const queryClient = useQueryClient();

  const { isPending, mutate } = useMutation({
    mutationKey: customersMutationKeys.delete,
    mutationFn: customersService.delete,
    onSuccess: (res) => {
      toast.success(res?.message || "Customer deleted successfully");
      queryClient.invalidateQueries({
        queryKey: customersKeys.lists(),
      });
    },
    onError: notifyError,
  });

  return {
    isDeleting: isPending,
    handleDelete: mutate,
  };
}
