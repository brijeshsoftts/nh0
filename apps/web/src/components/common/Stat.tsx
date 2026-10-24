import { ArrowDownRight, ArrowRight, ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";

import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export interface DashboardStat {
  label: string;
  value: number;
  changePercentage: number;
  trend: "up" | "down" | "neutral";
  link?: string;
}

interface StatProps {
  stat: DashboardStat;
  format?: "number" | "currency" | "percentage";
}

function Stat({ stat, format = "number" }: StatProps) {
  const isUp = stat.trend === "up";
  const isDown = stat.trend === "down";

  const TrendIcon = isUp ? ArrowUpRight : isDown ? ArrowDownRight : ArrowRight;

  const trendStyle = isUp
    ? "bg-primary/10 text-primary"
    : isDown
      ? "bg-destructive/10 text-destructive"
      : "bg-muted text-muted-foreground";

  const value = new Intl.NumberFormat("en-IN", {
    style: format === "currency" ? "currency" : "decimal",
    currency: format === "currency" ? "INR" : undefined,
    maximumFractionDigits: format === "percentage" ? 1 : 0,
  }).format(stat.value);

  return (
    <Link to={stat.link ? `/dashboard/${stat.link}` : "#"}>
      <Card className="border-border/60 shadow-sm transition-shadow hover:shadow-md">
        <CardContent className="flex flex-col gap-5">
          <p className="text-sm font-medium text-muted-foreground">
            {stat.label}
          </p>

          <p className="text-3xl font-semibold tracking-tight tabular-nums">
            {format === "percentage" ? `${stat.value}%` : value}
          </p>

          <div className="flex flex-wrap items-center gap-2">
            <span
              className={`inline-flex items-center gap-1 rounded-md px-2 py-1 text-xs font-semibold ${trendStyle}`}
            >
              <TrendIcon className="size-3.5" aria-hidden="true" />
              {Math.abs(stat.changePercentage)}%
            </span>

            <span className="text-xs text-muted-foreground">
              vs. previous period
            </span>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}

function StatLoading() {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {Array.from({ length: 4 }).map((_, index) => (
        <Card className="border-border/60 shadow-sm" key={index}>
          <CardContent className="flex flex-col gap-5">
            <Skeleton className="h-4 w-28" />
            <Skeleton className="h-9 w-36" />
            <div className="flex items-center gap-2">
              <Skeleton className="h-6 w-16 rounded-md" />
              <Skeleton className="h-3 w-32" />
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
  if (isError) return;

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {stats?.map((stat) => (
        <Stat key={stat.label} stat={stat} />
      ))}
    </div>
  );
}
