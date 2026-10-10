import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { notifyError } from "@/lib/notification";

import { issuesKeys, issuesMutationKeys } from "../issues.keys";
import { issuesService } from "../issues.service";
import {
  type CreateIssue,
  CreateIssueSchema,
} from "../schemas/createIssue.schema";

function useCreateIssue() {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationKey: issuesMutationKeys.create,
    mutationFn: issuesService.create,
    onSuccess: (res) => {
      toast.success(res?.message || "Issue created successfully.");
      queryClient.invalidateQueries({
        queryKey: issuesKeys.all,
      });
    },
    onError: notifyError,
  });
  return mutation;
}

export function useCreateIssueFacade() {
  const { mutate, isPending, isSuccess } = useCreateIssue();

  const {
    handleSubmit,
    register,
    control,
    formState: { errors },
    getValues,
  } = useForm<CreateIssue>({
    resolver: zodResolver(CreateIssueSchema),
  });

  return {
    submit: (data: CreateIssue) => mutate(data),
    isPending,
    isSuccess,
    register,
    control,
    handleSubmit,
    errors,
    getValues,
  };
}
