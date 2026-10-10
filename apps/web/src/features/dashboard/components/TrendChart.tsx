import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts";

import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export interface TrendChart {
  date: string;
  value: number;
}

export type Range = "7d" | "14d" | "28d";

type Option = {
  label: string;
  value: Range;
};

interface TrendChartProps {
  data: TrendChart[];
  range: Range;
  onRangeChange?: (range: Range) => void;
  title?: string;
  description?: string;
  options?: Option[];
  key?: string;
}

export function TrendChart({
  data,
  range,
  onRangeChange = () => {},
  title,
  description,
  options,
}: TrendChartProps) {
  const chartConfig = {
    value: {
      label: title ?? "Value",
      color: "var(--chart-1)",
    },
  } satisfies ChartConfig;

  return (
    <div className="rounded-lg border bg-card lg:min-w-full">
      {/* Header */}
      <div className="flex items-center justify-between gap-4 p-4">
        <div>
          <h2 className="text-sm font-medium">{title}</h2>
          <p className="text-xs text-muted-foreground">{description}</p>
        </div>

        <Select
          value={range}
          onValueChange={(value) => onRangeChange(value as Range)}
        >
          <SelectTrigger className="h-8 w-27.5 text-xs">
            <SelectValue />
          </SelectTrigger>

          <SelectContent>
            {options?.map(({ label, value }) => (
              <SelectItem key={value} value={value}>
                {label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Chart */}
      <div className="px-4 pb-4">
        <ChartContainer config={chartConfig} className="h-70 w-full min-w-0">
          <LineChart
            data={data}
            margin={{
              top: 10,
              right: 10,
              left: 10,
              bottom: 0,
            }}
          >
            <CartesianGrid vertical={false} className="stroke-border" />

            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              className="text-xs"
            />

            <YAxis
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              width={50}
              tickFormatter={(value) =>
                `₹${Number(value).toLocaleString("en-IN")}`
              }
              className="text-xs"
            />

            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  formatter={(value) =>
                    `₹${Number(value).toLocaleString("en-IN")}`
                  }
                />
              }
            />

            <Line
              type="monotone"
              dataKey="value"
              stroke="var(--color-value)"
              strokeWidth={2}
              dot={false}
              activeDot={{
                r: 4,
              }}
            />
          </LineChart>
        </ChartContainer>
      </div>
    </div>
  );
}
