import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { notifyError } from "@/lib/notification";

import { customersKeys, customersMutationKeys } from "../customers.keys";
import { customersService } from "../customers.service";
import {
  type UpdateCustomer,
  UpdateCustomerSchema,
} from "../schema/updateCustomer.schema";

function useUpdateCustomer(id: string) {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationKey: customersMutationKeys.update,
    mutationFn: (data: UpdateCustomer) => customersService.update(id, data),
    onSuccess: (res) => {
      toast.success(res?.message || "Customer updated successfully");
      queryClient.invalidateQueries({
        queryKey: customersKeys.lists(),
      });
    },
    onError: notifyError,
  });

  return mutation;
}

export function useUpdateCustomerFacade(id: string) {
  const { mutate, isPending, isSuccess } = useUpdateCustomer(id);

  const {
    handleSubmit,
    register,
    control,
    formState: { errors },
    getValues,
  } = useForm<UpdateCustomer>({
    resolver: zodResolver(UpdateCustomerSchema),
  });

  return {
    submit: (data: UpdateCustomer) => mutate(data),
    isPending,
    isSuccess,
    register,
    control,
    handleSubmit,
    errors,
    getValues,
  };
}
