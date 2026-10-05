import { createContext, type ReactNode } from "react";

import { useProfile } from "@/features/users/hooks/useProfile";
import type { AuthCTX } from "@/types/shared.types";

const initialCTX: AuthCTX = {
  isAuthenticated: false,
  isLoading: true,
  user: null,
};

export const AuthContext = createContext<AuthCTX>(initialCTX);

export function AuthProvider({ children }: { children: ReactNode }) {
  const { user, isLoading } = useProfile();

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated: !!user,
        isLoading: isLoading,
        user: user ?? null,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
