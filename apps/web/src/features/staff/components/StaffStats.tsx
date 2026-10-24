import { StatGrid } from "@/components/common/Stat";

import { useStaffStats } from "../hooks/useStaffStats";

export function StaffStats() {
  const { data, isLoading, isError } = useStaffStats();
  return <StatGrid stats={data} isLoading={isLoading} isError={isError} />;
}
