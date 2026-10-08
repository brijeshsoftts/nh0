import type { UserProfile } from "@/features/users/users.types";

export type AuthCTX = {
  isAuthenticated: boolean;
  isLoading: boolean;
  user: UserProfile | null;
};
