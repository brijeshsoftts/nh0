import type { LucideIcon } from "lucide-react";

import type { Profile } from "@/features/profile/profile.types";

export type AuthCTX = {
  isAuthenticated: boolean;
  isLoading: boolean;
  user: Profile | null;
};

export type KpiItem = {
  id: string | number;
  iconKey: LucideIcon;
  title: string;
  value: string | number;
  details: string;
  trend?: string;
};
