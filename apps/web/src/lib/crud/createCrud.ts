import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { type DefaultValues, useForm } from "react-hook-form";
import { toast } from "sonner";
import type { z } from "zod";

import { notifyError } from "@/lib/notification";
import type {
  ApiMessageResponse,
  ListParams,
  LookupParams,
} from "@/types/api.types";

import { createCrudService } from "./createCrudService";
import { createKeys } from "./createKeys";

type CrudConfig<
  TResource extends string,
  TCreateSchema extends z.ZodType,
  TUpdateSchema extends z.ZodType,
> = {
  /** Query key root, e.g. "tasks" */
  resource: TResource;
  /** API path, e.g. "/tasks" */
  endpoint: string;
  /** Used in toast fallbacks, e.g. "Task" */
  label: string;
  createSchema?: TCreateSchema;
  updateSchema?: TUpdateSchema;
};

type FormOptions<TInput extends Record<string, unknown>> = {
  defaultValues?: DefaultValues<TInput>;
  onSuccess?: () => void;
};

/**
 * Curried so TItem is explicit while the schema types are inferred:
 *   createCrud<TaskItem>()({ ... })
 */
export function createCrud<TItem, LookupOutput>() {
  return function build<
    TResource extends string,
    TCreateSchema extends z.ZodType,
    TUpdateSchema extends z.ZodType,
  >(config: CrudConfig<TResource, TCreateSchema, TUpdateSchema>) {
    type CreateInput = z.input<TCreateSchema>;
    type CreateOutput = z.output<TCreateSchema>;
    type UpdateInput = z.input<TUpdateSchema>;
    type UpdateOutput = z.output<TUpdateSchema>;

    const { resource, endpoint, label, createSchema, updateSchema } = config;

    const { keys, mutationKeys } = createKeys(resource);
    const service = createCrudService<
      TItem,
      CreateOutput,
      UpdateOutput,
      LookupOutput
    >(endpoint);

    function useList<TItem>(params?: ListParams) {
      const { data, isLoading, isError, refetch } = useQuery({
        queryKey: keys.list(params),
        queryFn: () => service.findAll<TItem>(params),
        placeholderData: (previousData) => previousData,
      });

      return {
        items: data?.data ?? [],
        pagination: data?.meta,
        isLoading,
        isError,
        refetch,
      };
    }

    function useDetail(id: string | undefined) {
      return useQuery({
        queryKey: keys.detail(id ?? ""),
        queryFn: () => service.findOne(id as string),
        enabled: !!id,
      });
    }

    function useStats() {
      return useQuery({
        queryKey: keys.stats(),
        queryFn: service.getStats,
      });
    }

    function useDelete() {
      const queryClient = useQueryClient();

      const { isPending, mutate } = useMutation({
        mutationKey: mutationKeys.delete,
        mutationFn: service.delete,
        onSuccess: (res) => {
          toast.success(res?.message || `${label} deleted successfully.`);
          queryClient.invalidateQueries({ queryKey: keys.all });
        },
        onError: notifyError,
      });

      return { isDeleting: isPending, handleDelete: mutate };
    }

    function useCreate(
      options?: FormOptions<CreateInput & Record<string, unknown>>
    ) {
      const queryClient = useQueryClient();

      const mutation = useMutation({
        mutationKey: mutationKeys.create,
        mutationFn: service.create,
        onSuccess: (res) => {
          toast.success(res?.message || `${label} created successfully.`);
          queryClient.invalidateQueries({ queryKey: keys.all });
          options?.onSuccess?.();
        },
        onError: notifyError,
      });

      const form = useForm({
        resolver: zodResolver(createSchema || z.object({})),
        defaultValues: options?.defaultValues as DefaultValues<CreateInput>,
      });

      return {
        form,
        submit: (data: CreateOutput) => mutation.mutate(data),
        mutation,
      };
    }

    function useUpdate(
      id: string,
      options?: FormOptions<UpdateInput & Record<string, unknown>>
    ) {
      const queryClient = useQueryClient();

      const mutation = useMutation({
        mutationKey: mutationKeys.update,
        mutationFn: (data: UpdateOutput) => service.update(id, data),
        onSuccess: (res) => {
          toast.success(res?.message || `${label} updated successfully.`);
          queryClient.invalidateQueries({ queryKey: keys.all });
          options?.onSuccess?.();
        },
        onError: notifyError,
      });

      const form = useForm({
        resolver: zodResolver(updateSchema || z.object({})),
        defaultValues: options?.defaultValues as DefaultValues<UpdateInput>,
      });

      return {
        form,
        submit: (data: UpdateOutput) => mutation.mutate(data),
        mutation,
      };
    }

    function useLookup(params?: LookupParams, options?: { enabled?: boolean }) {
      const { data, isLoading, isFetching } = useQuery({
        queryKey: keys.lookup(params),
        queryFn: () => service.lookup(params),
        enabled: options?.enabled ?? true,
        staleTime: 5 * 60 * 1000,
        placeholderData: (previousData) => previousData,
      });

      return { options: data ?? [], isLoading, isFetching };
    }

    function createAction<TVars>(config: {
      name: string;
      mutationFn: (vars: TVars) => Promise<ApiMessageResponse>;
      successMessage: string;
    }) {
      return function useAction() {
        const queryClient = useQueryClient();

        const mutation = useMutation({
          mutationKey: [resource, config.name] as const,
          mutationFn: config.mutationFn,
          onSuccess: (res) => {
            toast.success(res?.message || config.successMessage);
            queryClient.invalidateQueries({ queryKey: keys.all });
          },
          onError: notifyError,
        });

        return mutation;
      };
    }

    return {
      keys,
      mutationKeys,
      service,
      useList,
      useDetail,
      useStats,
      useDelete,
      useCreate,
      useUpdate,
      useLookup,
      createAction,
    };
  };
}
