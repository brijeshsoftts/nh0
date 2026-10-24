import { StatGrid } from "@/components/common/Stat";

import { useTasksStats } from "../hooks/useTasksStats";

export function TasksStats() {
  const { data, isLoading, isError } = useTasksStats();
  return <StatGrid stats={data} isLoading={isLoading} isError={isError} />;
}
