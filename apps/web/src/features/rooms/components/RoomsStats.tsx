import {
  StatCard,
  StatCardError,
  StatCardLoading,
} from "@/components/common/StatCard";

import { useRoomsStats } from "../rooms.crud";

export function RoomsStats() {
  const { data, isLoading, isError, refetch } = useRoomsStats();

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
