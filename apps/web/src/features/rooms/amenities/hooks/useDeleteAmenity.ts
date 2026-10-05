import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

import { notifyError } from "@/lib/notification";

import { amenitiesMutationKeys } from "../amenities.keys";
import { amenitiesService } from "../amenities.service";

export function useDeleteAmenity(id: string) {
  const { mutate, isPending } = useMutation({
    mutationKey: amenitiesMutationKeys.delete,
    mutationFn: () => amenitiesService.delete(id),
    onSuccess: (res) => {
      toast.success(res?.message || "Amenity deleted successfully.");
    },
    onError: notifyError,
  });

  return {
    handleDelete: () => mutate(),
    isPending,
  };
}
