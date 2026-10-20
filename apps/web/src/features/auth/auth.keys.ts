export const authMutationKeys = {
  register: ["auth", "register"] as const,
  login: ["auth", "login"] as const,
  logout: ["rooms", "logout"] as const,
} as const;
