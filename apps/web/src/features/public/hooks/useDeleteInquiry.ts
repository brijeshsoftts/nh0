import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { notifyError } from "@/lib/notification";

import { publicKeys, publicMutationKeys } from "../public.keys";
import { publicService } from "../public.service";

export function useDeleteInquiry(id: string) {
  const queryClient = useQueryClient();
  const { isPending, mutate } = useMutation({
    mutationKey: publicMutationKeys.deleteInquiry,
    mutationFn: () => publicService.deleteInquiry(id),
    onSuccess: (response) => {
      toast.success(response.message || "Inquiry deleted successfully.");
      queryClient.invalidateQueries({
        queryKey: publicKeys.inquiryLists(),
      });
    },
    onError: notifyError,
  });

  return {
    isDeleting: isPending,
    handleDelete: () => mutate(),
  };
}
