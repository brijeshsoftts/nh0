import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { notifyError } from "@/lib/notification";

import { authMutationKeys } from "../auth.keys";
import { authService } from "../auth.service";
import { type Register, RegisterSchema } from "../schema/register.schema";

export function useRegisterFacade(onSuccess: (email: string) => void) {
  const form = useForm<Register>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: { fullName: "", email: "", password: "" },
  });

  const mutation = useMutation({
    mutationKey: authMutationKeys.register,
    mutationFn: authService.register,
    onSuccess: (response, variables) => {
      toast.success(response?.message || "Account created successfully.");
      form.reset();
      onSuccess(variables.email);
    },
    onError: notifyError,
  });

  return {
    submit: (data: Register) => mutation.mutate(data),
    isPending: mutation.isPending,
    error: mutation.error,
    handleSubmit: form.handleSubmit,
    register: form.register,
    errors: form.formState.errors,
    getValues: form.getValues,
    reset: form.reset,
    resetMutation: mutation.reset,
  };
}
