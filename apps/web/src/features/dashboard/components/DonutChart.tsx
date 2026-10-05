import { Cell, Pie, PieChart } from "recharts";

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import { formatString } from "@/lib/format";

export type DonutChartData = {
  status: string;
  count: number;
};

interface DonutChartProps {
  data: DonutChartData[];
  config?: ChartConfig;

  title?: string;
  description?: string;

  centerLabel?: string;

  height?: string;
}

export function DonutChart({
  data,
  config = {},
  title,
  description,
  centerLabel = "Total",
  height = "h-65",
}: DonutChartProps) {
  const chartData = data.map((item) => ({
    ...item,
    status: formatString(item.status),
  }));
  const total = data.reduce((sum, item) => sum + Number(item.count ?? 0), 0);

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
        <ChartContainer
          config={config}
          className={`mx-auto aspect-square ${height}`}
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  hideLabel
                  formatter={(value, _, item) => {
                    const percentage =
                      total > 0
                        ? ((Number(value) / total) * 100).toFixed(1)
                        : "0";

                    return (
                      <div className="flex min-w-35 items-center justify-between gap-4">
                        <span>{item.name}</span>

                        <span className="font-medium">
                          {value} ({percentage}%)
                        </span>
                      </div>
                    );
                  }}
                />
              }
            />

            <Pie
              data={chartData}
              dataKey={String("count")}
              nameKey={String("status")}
              innerRadius={70}
              outerRadius={100}
              paddingAngle={2}
              strokeWidth={2}
            >
              {chartData.map((item) => {
                const key = String(item.status);
                return <Cell key={key} fill={`var(--color-${key})`} />;
              })}
            </Pie>

            {/* Center value */}
            <text
              x="50%"
              y="47%"
              textAnchor="middle"
              dominantBaseline="middle"
              className="fill-foreground text-2xl font-semibold"
            >
              {total}
            </text>

            <text
              x="50%"
              y="57%"
              textAnchor="middle"
              dominantBaseline="middle"
              className="fill-muted-foreground text-xs"
            >
              {centerLabel}
            </text>
          </PieChart>
        </ChartContainer>

        {/* Legend */}
        <div className="grid grid-cols-2 gap-x-4 gap-y-2 pt-2">
          {chartData.map((item) => {
            const key = String(item.status);
            const configItem = config[key];

            return (
              <div
                key={key}
                className="flex min-w-0 items-center justify-between gap-2 text-xs"
              >
                <div className="flex min-w-0 items-center gap-2">
                  <span
                    className="size-2 shrink-0 rounded-full"
                    style={{
                      backgroundColor: `var(--color-${key})`,
                    }}
                  />

                  <span className="truncate text-muted-foreground">
                    {configItem?.label ?? key}
                  </span>
                </div>

                <span className="font-medium">{Number(item.count)}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
