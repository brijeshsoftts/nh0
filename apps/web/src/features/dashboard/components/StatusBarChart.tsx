import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
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
}

export function StatusBarChart({
  data,
  config = {},
  title,
  description,
  height = "h-65",
}: StatusBarChartProps) {
  const chartData = data.map((item) => ({
    ...item,
    status: formatString(item.status),
  }));

  return (
    <div className="w-full min-w-0 rounded-lg border bg-card">
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
        <ChartContainer config={config} className={`w-full min-w-0 ${height}`}>
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
      </div>
    </div>
  );
}
