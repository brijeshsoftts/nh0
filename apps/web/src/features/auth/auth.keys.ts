export const authMutationKeys = {
  register: ["auth", "register"] as const,
  login: ["auth", "login"] as const,
  forgotPassword: ["auth", "forgot-password"] as const,
  resetPassword: ["auth", "reset-password"] as const,
  logout: ["rooms", "logout"] as const,
} as const;
