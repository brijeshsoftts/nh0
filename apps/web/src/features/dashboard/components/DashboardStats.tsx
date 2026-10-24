import { StatGrid } from "@/components/common/Stat";

import { useDashboardStats } from "../dashboard.crud";

export function DashboardStats() {
  const { data: stats, isLoading, isError } = useDashboardStats();

  return <StatGrid stats={stats} isLoading={isLoading} isError={isError} />;
}
