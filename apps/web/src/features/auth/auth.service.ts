import { apiClient } from "@/lib/apiClient";

import type { Login } from "./schema/login.schema";
export const authService = {
  login: (data: Login): Promise<void> =>
    apiClient.post("/auth/login", data).then((r) => r.data),
  logout: (): Promise<void> =>
    apiClient.post("/auth/logout").then((r) => r.data),
};
