import type { Category, UserRole } from "@/types/enum.types";

export type UserProfile = {
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

export type User = {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  role: UserRole;
  isActive: boolean;
  avatar: {
    url: string;
    altText: string | null;
  } | null;
};
