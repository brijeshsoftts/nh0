import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { notifyError } from "@/lib/notification";

import { amenitiesMutationKeys } from "../amenities.keys";
import { amenitiesService } from "../amenities.service";
import {
  type CreateAmenity,
  CreateAmenitySchema,
} from "../schemas/createAmenity.schema";

function useCreateAmenity() {
  return useMutation({
    mutationKey: amenitiesMutationKeys.create,
    mutationFn: (data: CreateAmenity) => amenitiesService.create(data),
    onSuccess: (res) => {
      toast.success(res?.message || "Amenity created successfully.");
    },
    onError: notifyError,
  });
}

export function useCreateAmenityFacade() {
  const { mutate, isPending, isSuccess } = useCreateAmenity();

  const {
    handleSubmit,
    register,
    formState: { errors },
    getValues,
    reset,
    control,
  } = useForm<CreateAmenity>({
    resolver: zodResolver(CreateAmenitySchema),
  });

  return {
    submit: (data: CreateAmenity) => mutate(data),
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
