import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { notifyError } from "@/lib/notification";

import { amenitiesMutationKeys } from "../amenities.keys";
import { amenitiesService } from "../amenities.service";
import {
  type UpdateAmenity,
  UpdateAmenitySchema,
} from "../schemas/updateAmenity.schema";

function useUpdateAmenity(id: string) {
  return useMutation({
    mutationKey: amenitiesMutationKeys.update,
    mutationFn: (data: UpdateAmenity) => amenitiesService.update(id, data),
    onSuccess: (res) => {
      toast.success(res?.message || "Amenity updated successfully.");
    },
    onError: notifyError,
  });
}

export function useUpdateAmenityFacade(id: string) {
  const { mutate, isPending, isSuccess } = useUpdateAmenity(id);

  const {
    handleSubmit,
    register,
    formState: { errors },
    getValues,
    reset,
    control,
  } = useForm<UpdateAmenity>({
    resolver: zodResolver(UpdateAmenitySchema),
  });

  return {
    submit: (data: UpdateAmenity) => mutate(data),
    isPending,
    isSuccess,
    register,
    handleSubmit,
    errors,
    getValues,
    reset,
    control,
  };
}
