import { StatGrid } from "@/components/common/Stat";

import { useUsersStats } from "../hooks/useUsersStats";

export function UsersStats() {
  const { data, isLoading, isError } = useUsersStats();
  return <StatGrid stats={data} isLoading={isLoading} isError={isError} />;
}
