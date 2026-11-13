import { StatGrid } from "@/components/common/Stat";

import { useCustomerStat } from "../hooks/useCustomerStat";

export function CustomerStat() {
  const { data, isError, isLoading } = useCustomerStat();
  return <StatGrid stats={data} isLoading={isLoading} isError={isError} />;
}
