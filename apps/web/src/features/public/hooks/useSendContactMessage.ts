import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

import { notifyError } from "@/lib/notification";

import { publicKeys } from "../public.keys";
import { publicService } from "../public.service";

export function useSendContactMessage() {
  return useMutation({
    mutationKey: publicKeys.contactMessage,
    mutationFn: publicService.sendContactMessage,
    onSuccess: (response) => {
      toast.success(
        response.data.message ?? "Your message has been sent successfully."
      );
    },
    onError: notifyError,
  });
}
