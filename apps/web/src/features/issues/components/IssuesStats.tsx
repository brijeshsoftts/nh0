import { StatGrid } from "@/components/common/Stat";
import { useDashboardStats } from "@/features/dashboard/dashboard.crud";

export function IssuesStats() {
  const { data: stats, isLoading, isError } = useDashboardStats();
  return <StatGrid stats={stats} isLoading={isLoading} isError={isError} />;
}
