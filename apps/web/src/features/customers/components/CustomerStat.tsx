import { StatGrid } from "@/components/common/Stat";

// import { MANAGEMENT_STAT } from "@/features/dashboard/dashboard.mock";
import { useCustomerStat } from "../hooks/useCustomerStat";

export function CustomerStat() {
  const { data, isError, isLoading } = useCustomerStat();
  return <StatGrid stats={data} isLoading={isLoading} isError={isError} />;
}
