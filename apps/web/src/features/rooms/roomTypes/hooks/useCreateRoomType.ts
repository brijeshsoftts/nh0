import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { notifyError } from "@/lib/notification";

import { roomTypesKeys, roomTypesMutationKeys } from "../roomTypes.keys";
import { roomTypesService } from "../roomTypes.service";
import {
  type CreateRoomType,
  CreateRoomTypeSchema,
} from "../schemas/createRoomType.schema";

function useCreateRoomType() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: roomTypesMutationKeys.create,
    mutationFn: roomTypesService.create,

    onSuccess: (res) => {
      toast.success(res?.message || "Room type created successfully.");

      queryClient.invalidateQueries({
        queryKey: roomTypesKeys.list(),
      });
    },

    onError: notifyError,
  });
}

export function useCreateRoomTypeFacade() {
  const { mutate, isPending, isSuccess } = useCreateRoomType();

  const {
    handleSubmit,
    register,
    formState: { errors },
    getValues,
    reset,
    setValue,
    control,
    setError,
    clearErrors,
  } = useForm({
    resolver: zodResolver(CreateRoomTypeSchema),
    defaultValues: {
      name: "",
      description: "",
      sizeSqFt: undefined,
      maxGuests: 1,
      adults: 1,
      children: 0,
      basePrice: undefined,
      currency: "INR",
      bedType: undefined,
      bedCount: 1,
      smokingAllowed: false,
      petsAllowed: false,
      amenities: [],
      images: [],
    },
    mode: "onBlur",
  });

  return {
    submit: (data: CreateRoomType) => mutate(data),
    isPending,
    isSuccess,
    register,
    handleSubmit,
    errors,
    getValues,
    reset,
    setValue,
    control,
    setError,
    clearErrors,
  };
}
