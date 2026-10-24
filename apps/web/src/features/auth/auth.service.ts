import { apiClient } from "@/lib/apiClient";

import type { Login } from "./schema/login.schema";
import type { Register } from "./schema/register.schema";
import type { ResetPassword } from "./schema/reset-password.schema";
export const authService = {
  register: (data: Register): Promise<{ message: string }> =>
    apiClient.post("/auth/register", data).then((r) => r.data),
  login: (data: Login): Promise<void> =>
    apiClient.post("/auth/login", data).then((r) => r.data),
  forgotPassword: (data: { email: string }): Promise<{ message: string }> =>
    apiClient.post("/auth/forgot-password", data).then((r) => r.data),
  resetPassword: (
    token: string,
    data: ResetPassword
  ): Promise<{ message: string }> =>
    apiClient
      .post(`/auth/reset-password?token=${token}`, data)
      .then((r) => r.data),
  logout: (): Promise<void> =>
    apiClient.post("/auth/logout").then((r) => r.data),
};
