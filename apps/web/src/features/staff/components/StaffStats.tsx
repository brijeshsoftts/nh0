import {
  StatCard,
  StatCardError,
  StatCardLoading,
} from "@/components/common/StatCard";

import { useStaffStats } from "../hooks/useStaffStats";

export function StaffStats() {
  const { data, isLoading, isError, refetch } = useStaffStats();

  if (isLoading) {
    return <StatCardLoading />;
  }

  if (isError) {
    return <StatCardError refetch={refetch} />;
  }

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {data?.map((kpi) => (
        <StatCard key={kpi.id} {...kpi} />
      ))}
    </div>
  );
}
