import {
  StatCard,
  StatCardError,
  StatCardLoading,
} from "@/components/common/StatCard";

import { useBookingsStats } from "../hooks/useBookingsStats";

export function BookingsStats() {
  const { data, isLoading, isError, refetch } = useBookingsStats();

  if (isLoading) {
    return <StatCardLoading />;
  }

  if (isError || !data) {
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

