import { StatGrid } from "@/components/common/Stat";

import { useBookingsStats } from "../hooks/useBookingsStats";

export function BookingsStats() {
  const { data, isLoading, isError } = useBookingsStats();
  return <StatGrid stats={data} isLoading={isLoading} isError={isError} />;
}

