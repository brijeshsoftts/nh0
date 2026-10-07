import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { notifyError } from "@/lib/notification";

import { customersKeys, customersMutationKeys } from "../customers.keys";
import { customersService } from "../customers.service";
import {
  type CreateCustomer,
  CreateCustomerSchema,
} from "../schema/createCustomer.schema";

function useCreateCustomer() {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationKey: customersMutationKeys.create,
    mutationFn: customersService.create,
    onSuccess: (res) => {
      toast.success(res?.message || "Customer registered successfully.");
      queryClient.invalidateQueries({
        queryKey: customersKeys.all,
      });
    },
    onError: notifyError,
  });
  return mutation;
}

export function useCreateCustomerFacade() {
  const { mutate, isPending, isSuccess } = useCreateCustomer();

  const {
    handleSubmit,
    register,
    control,
    formState: { errors },
    getValues,
  } = useForm<CreateCustomer>({
    resolver: zodResolver(CreateCustomerSchema),
  });

  return {
    submit: (data: CreateCustomer) => mutate(data),
    isPending,
    isSuccess,
    register,
    control,
    handleSubmit,
    errors,
    getValues,
  };
}
