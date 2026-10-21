import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";

import { Button } from "@/components/ui/button";
import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Skeleton } from "@/components/ui/skeleton";
import { formatString } from "@/lib/format";

export type StatusBarChart = {
  status: string;
  count: number;
};

interface StatusBarChartProps {
  data: StatusBarChart[];
  config?: ChartConfig;
  title?: string;
  description?: string;

  height?: string;
  isLoading?: boolean;
  isError?: boolean;
  onRetry?: () => void;
}

export function StatusBarChart({
  data,
  config = {},
  title,
  description,
  height = "h-65",
  isLoading = false,
  isError = false,
  onRetry,
}: StatusBarChartProps) {
  const chartData = data.map((item) => ({
    ...item,
    status: formatString(item.status),
  }));

  return (
    <div className="w-full min-w-0 rounded-none border bg-card">
      {/* Header */}
      {(title || description) && (
        <div className="p-4">
          {title && <h2 className="text-sm font-medium">{title}</h2>}

          {description && (
            <p className="text-xs text-muted-foreground">{description}</p>
          )}
        </div>
      )}

      {/* Chart */}
      <div className="min-w-0 px-4 pb-4">
        {isError ? (
          <div
            role="alert"
            className={`flex ${height} flex-col items-center justify-center gap-3 text-center`}
          >
            <p className="text-sm text-muted-foreground">
              Status breakdown could not be loaded.
            </p>
            {onRetry && (
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={onRetry}
                className="rounded-none"
              >
                Try again
              </Button>
            )}
          </div>
        ) : isLoading ? (
          <div
            role="status"
            aria-label="Loading status breakdown"
            aria-busy="true"
            className={`space-y-5 ${height} pt-4`}
          >
            {Array.from({ length: 5 }, (_, index) => (
              <div key={index} className="flex items-center gap-3">
                <Skeleton className="h-3 w-16" />
                <Skeleton className="h-5 flex-1" />
              </div>
            ))}
          </div>
        ) : (
          <ChartContainer
            config={config}
            className={`w-full min-w-0 ${height}`}
          >
            <BarChart
              data={chartData}
              layout="vertical"
              margin={{
                top: 4,
                right: 12,
                left: 8,
                bottom: 4,
              }}
            >
              <CartesianGrid horizontal={false} className="stroke-border" />

              <XAxis
                type="number"
                allowDecimals={false}
                tickLine={false}
                axisLine={false}
              />

              <YAxis
                type="category"
                dataKey={String("status")}
                tickLine={false}
                axisLine={false}
                width={85}
              />

              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent hideLabel />}
              />

              <Bar
                dataKey={String("count")}
                radius={[0, 4, 4, 0]}
                maxBarSize={32}
              />
            </BarChart>
          </ChartContainer>
        )}
      </div>
    </div>
  );
}
