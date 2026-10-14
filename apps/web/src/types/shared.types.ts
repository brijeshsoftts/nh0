import type { Profile } from "@/features/profile/profile.types";

export type AuthCTX = {
  isAuthenticated: boolean;
  isLoading: boolean;
  user: Profile | null;
};
