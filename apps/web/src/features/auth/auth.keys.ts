export const authMutationKeys = {
  login: ["auth", "login"] as const,
  logout: ["rooms", "logout"] as const,
} as const;
