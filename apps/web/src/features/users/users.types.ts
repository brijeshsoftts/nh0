import type { Category, UserRole } from "@/types/enum.types";

export type User = {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  role: UserRole;
  category?: Category;
  avatar: {
    id: string;
    url: string;
    altText: string | null;
  } | null;
};
