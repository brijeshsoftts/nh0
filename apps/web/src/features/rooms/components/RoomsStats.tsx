import { StatGrid } from "@/components/common/Stat";

import { useRoomsStats } from "../rooms.crud";

export function RoomsStats() {
  const { data, isLoading, isError } = useRoomsStats();
  return <StatGrid stats={data} isLoading={isLoading} isError={isError} />;
}
