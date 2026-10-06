import { StatCard } from "@/components/common/StatCard";
import { MANAGEMENT_STAT } from "@/features/dashboard/dashboard.mock";

export function CustomerStat() {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {MANAGEMENT_STAT.map((kpi) => (
        <StatCard key={kpi.id} {...kpi} />
      ))}
    </div>
  );
}
