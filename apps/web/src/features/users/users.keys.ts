export const usersKeys = {
  all: ["users"] as const,
  lists: () => ["users", "list"] as const,
} as const;
