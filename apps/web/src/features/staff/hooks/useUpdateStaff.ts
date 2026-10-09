import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { notifyError } from "@/lib/notification";

import {
  type UpdateStaff,
  UpdateStaffSchema,
} from "../schemas/updateStaff.schema";
import { staffKeys, staffMutationKeys } from "../staff.keys";
import { staffService } from "../staff.service";

function useUpdateStaff(id: string) {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationKey: staffMutationKeys.update,
    mutationFn: (data: UpdateStaff) => staffService.update(id, data),
    onSuccess: (res) => {
      toast.success(res?.message || "Staff member updated successfully.");
      queryClient.invalidateQueries({
        queryKey: staffKeys.all,
      });
    },
    onError: notifyError,
  });
  return mutation;
}

export function useUpdateStaffFacade(id: string) {
  const { mutate, isPending, isSuccess } = useUpdateStaff(id);

  const {
    handleSubmit,
    register,
    control,
    formState: { errors },
    getValues,
  } = useForm<UpdateStaff>({
    resolver: zodResolver(UpdateStaffSchema),
  });

  return {
    submit: (data: UpdateStaff) => mutate(data),
    isPending,
    isSuccess,
    register,
    control,
    handleSubmit,
    errors,
    getValues,
  };
}
