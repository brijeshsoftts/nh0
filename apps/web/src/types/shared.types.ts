import type { User } from "@/features/users/users.types";

export type AuthCTX = {
  isAuthenticated: boolean;
  isLoading: boolean;
  user: User | null;
};
