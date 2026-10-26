import { StatGrid } from "@/components/common/Stat";

import { useIssueStats } from "../issues.crud";

export function IssuesStats() {
  const { data: stats, isLoading, isError } = useIssueStats();
  return <StatGrid stats={stats} isLoading={isLoading} isError={isError} />;
}
