import {
  StatCard,
  StatCardError,
  StatCardLoading,
} from "@/components/common/StatCard";

// import { MANAGEMENT_STAT } from "@/features/dashboard/dashboard.mock";
import { useCustomerStat } from "../hooks/useCustomerStat";

export function CustomerStat() {
  const { data, isError, isLoading, refetch } = useCustomerStat();

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
