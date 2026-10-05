import { apiClient } from "@/lib/apiClient";

import type { User } from "./users.types";

export const usersService = {
  getMe: (): Promise<User> =>
    apiClient.get("/users/me").then((r) => r.data?.data),
};
