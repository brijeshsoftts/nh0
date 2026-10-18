import {
  StatCard,
  StatCardError,
  StatCardLoading,
} from "@/components/common/StatCard";
import { useDashbaordStats } from "@/features/dashboard/dashboard.crud";

export function IssuesStats() {
  const { data: stats, isLoading, isError, refetch } = useDashbaordStats();

  if (isLoading) {
    return <StatCardLoading />;
  }

  if (isError) {
    return <StatCardError refetch={refetch} />;
  }

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {stats?.map((s) => (
        <StatCard key={s.id} {...s} />
      ))}
    </div>
  );
}
