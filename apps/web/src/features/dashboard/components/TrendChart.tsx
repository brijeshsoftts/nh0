import { useId } from "react";
import {
  Area,
  CartesianGrid,
  ComposedChart,
  Line,
  XAxis,
  YAxis,
} from "recharts";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
import { Skeleton } from "@/components/ui/skeleton";

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
  isLoading?: boolean;
  isError?: boolean;
  onRetry?: () => void;
}

export function TrendChart({
  data,
  range,
  onRangeChange = () => {},
  title,
  description,
  options,
  isLoading = false,
  isError = false,
  onRetry,
}: TrendChartProps) {
  const gradientId = `revenue-fill-${useId().replaceAll(":", "")}`;
  const chartConfig = {
    value: {
      label: title ?? "Value",
      color: "var(--chart-1)",
    },
  } satisfies ChartConfig;

  return (
    <Card className="h-full w-full min-w-0 rounded-none border border-border bg-card text-card-foreground">
      <CardHeader className="flex flex-row items-start justify-between gap-4 rounded-none">
        <div className="min-w-0">
          <CardTitle>{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </div>

        <CardAction>
          <Select
            value={range}
            onValueChange={(value) => onRangeChange(value as Range)}
          >
            <SelectTrigger
              aria-label="Revenue time range"
              className="h-8 w-27.5 rounded-none text-xs"
            >
              <SelectValue />
            </SelectTrigger>

            <SelectContent className="rounded-none">
              {options?.map(({ label, value }) => (
                <SelectItem key={value} value={value} className="rounded-none">
                  {label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </CardAction>
      </CardHeader>

      <CardContent>
        {isError ? (
          <div
            role="alert"
            className="flex h-70 flex-col items-center justify-center gap-3 text-center"
          >
            <p className="text-sm text-muted-foreground">
              Revenue trend could not be loaded.
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
            aria-label="Loading revenue trend"
            aria-busy="true"
            className="flex h-70 flex-col justify-between py-3"
          >
            {Array.from({ length: 6 }, (_, index) => (
              <Skeleton key={index} className="h-px w-full" />
            ))}
          </div>
        ) : (
          <ChartContainer config={chartConfig} className="h-70 w-full min-w-0">
            <ComposedChart
              data={data}
              margin={{
                top: 10,
                right: 10,
                left: 10,
                bottom: 0,
              }}
            >
              <defs>
                <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
                  <stop
                    offset="0%"
                    stopColor="var(--color-value)"
                    stopOpacity={0.24}
                  />
                  <stop
                    offset="100%"
                    stopColor="var(--color-value)"
                    stopOpacity={0.02}
                  />
                </linearGradient>
              </defs>

              <CartesianGrid
                vertical={false}
                stroke="var(--border)"
                strokeOpacity={0.65}
              />

              <XAxis
                dataKey="date"
                tickMargin={8}
                className="text-xs"
                tickLine={{ stroke: "var(--border)" }}
                axisLine={{ stroke: "var(--border)" }}
              />

              <YAxis
                tickMargin={8}
                width={50}
                tickFormatter={(value) =>
                  `₹${Number(value).toLocaleString("en-IN")}`
                }
                className="text-xs"
                tickLine={{ stroke: "var(--border)" }}
                axisLine={{ stroke: "var(--border)" }}
              />

              <ChartTooltip
                cursor={false}
                content={
                  <ChartTooltipContent
                    className="rounded-none border border-border bg-card text-card-foreground shadow-md"
                    formatter={(value) =>
                      `₹${Number(value).toLocaleString("en-IN")}`
                    }
                  />
                }
              />

              <Area
                type="monotone"
                dataKey="value"
                stroke="none"
                fill={`url(#${gradientId})`}
                tooltipType="none"
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
            </ComposedChart>
          </ChartContainer>
        )}
      </CardContent>
    </Card>
  );
}
