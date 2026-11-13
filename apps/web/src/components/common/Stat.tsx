import { Link } from "react-router-dom";

import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { icons } from "@/constants/icons";

export interface DashboardStat {
  label: string;
  value: number;
  link: string;
  icon: string;
}

function Stat({ stat }: { stat: DashboardStat }) {
  const Icon = icons[stat.icon] ?? icons.BedDouble;

  return (
    <Link to={stat.link} className="block">
      <Card className="group relative overflow-hidden rounded-xl border border-border/70 bg-card p-2 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md">
        {/* Subtle gradient glow */}
        <div className="pointer-events-none absolute -top-8 -right-6 size-20 rounded-full bg-primary/10 blur-2xl" />

        <CardContent className="relative flex items-center gap-3 p-3">
          {/* Icon */}
          <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
            <Icon className="size-5" strokeWidth={2.3} />
          </div>

          {/* KPI Details */}
          <div className="min-w-0 flex-1">
            <div className="flex items-center justify-between gap-2">
              <p className="truncate text-xs font-medium text-muted-foreground">
                {stat.label}
              </p>
            </div>

            <div className="mt-1 flex items-center justify-between gap-2">
              <p className="truncate text-2xl leading-7 font-bold tracking-tight text-foreground tabular-nums">
                {stat.value}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}

function StatLoading() {
  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
      {Array.from({ length: 4 }).map((_, index) => (
        <Card key={index} className="rounded-xl">
          <CardContent className="flex items-center gap-3 p-3">
            <Skeleton className="size-10 shrink-0 rounded-lg" />

            <div className="min-w-0 flex-1 space-y-2">
              <Skeleton className="h-3 w-24" />
              <Skeleton className="h-6 w-28" />
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

export function StatGrid({
  stats,
  isLoading,
  isError,
}: {
  stats?: DashboardStat[];
  isLoading: boolean;
  isError: boolean;
}) {
  if (isLoading) return <StatLoading />;
  if (isError) return null;

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {stats?.map((stat) => (
        <Stat key={stat.label} stat={stat} />
      ))}
    </div>
  );
}
