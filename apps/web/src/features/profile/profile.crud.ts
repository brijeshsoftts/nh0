import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { apiClient } from "@/lib/apiClient";
import { createCrud } from "@/lib/crud/createCrud";
import { notifyError } from "@/lib/notification";

import {
  type ChangePassword,
  ChangePasswordSchema,
} from "./schemas/changePassword.schema";
import { type UpdateProfile } from "./schemas/profileUpdate.schema";
import type { Profile, ProfileDetails } from "./profile.types";

export const profile = createCrud()({
  resource: "profile",
  endpoint: "/profile",
  label: "Profile",
});

export const profileKeys = profile.keys;
export const profileService = profile.service;

const useChangePasswordMutation = profile.createAction<ChangePassword>({
  name: "changePassword",
  mutationFn: (data) =>
    apiClient.patch("/profile/change-password", data).then((r) => r.data),
  successMessage: "Password changed successfully.",
});

export function useChangePassword() {
  const mutation = useChangePasswordMutation();

  const form = useForm<ChangePassword>({
    resolver: zodResolver(ChangePasswordSchema),
  });

  return {
    submit: (data: ChangePassword) =>
      mutation.mutate(data, { onSuccess: () => form.reset() }),
    isPending: mutation.isPending,
    isSuccess: mutation.isSuccess,
    errors: form.formState.errors,
    handleSubmit: form.handleSubmit,
    register: form.register,
  };
}

export function useUpdateProfile() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: profile.mutationKeys.update,
    mutationFn: (data: UpdateProfile) =>
      apiClient.patch("/profile/me", data).then((r) => r.data),
    onSuccess: (response) => {
      toast.success(response?.message || "Profile updated successfully.");
      void queryClient.invalidateQueries({ queryKey: profile.keys.all });
    },
    onError: notifyError,
  });
}

export function useUpdateAvatar() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: profile.keys.custom("avatar", "update"),
    mutationFn: (file: File) => {
      const formData = new FormData();
      formData.append("avatar", file);
      return apiClient.patch("/profile/avatar", formData).then((r) => r.data);
    },
    onSuccess: (response) => {
      toast.success(
        response?.message || "Profile image updated successfully."
      );
      void queryClient.invalidateQueries({ queryKey: profile.keys.all });
    },
    onError: notifyError,
  });
}

export function useRemoveAvatar() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: profile.keys.custom("avatar", "remove"),
    mutationFn: () =>
      apiClient.delete("/profile/avatar").then((r) => r.data),
    onSuccess: (response) => {
      toast.success(
        response?.message || "Profile image removed successfully."
      );
      void queryClient.invalidateQueries({ queryKey: profile.keys.all });
    },
    onError: notifyError,
  });
}

export function useProfile() {
  const query = useQuery({
    queryKey: profile.keys.custom("me"),
    queryFn: (): Promise<Profile> =>
      apiClient.get("/profile/me").then((r) => r.data?.data),
  });

  return {
    user: query.data,
    isLoading: query.isLoading,
    isError: query.isError,
  };
}

export function useProfileDetails() {
  return useQuery({
    queryKey: profile.keys.custom("details"),
    queryFn: (): Promise<ProfileDetails> =>
      apiClient.get("/profile/details").then((r) => r.data?.data),
  });
}
