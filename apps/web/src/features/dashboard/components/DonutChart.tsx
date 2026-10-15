import { Cell, Pie, PieChart } from "recharts";

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
import { formatString } from "@/lib/format";

const bookingStatusConfig = {
  PENDING: {
    label: "Pending",
    theme: { light: "#d97706", dark: "#fbbf24" },
  },
  CONFIRMED: {
    label: "Confirmed",
    theme: { light: "#2563eb", dark: "#60a5fa" },
  },
  CHECKED_IN: {
    label: "Checked In",
    theme: { light: "#059669", dark: "#34d399" },
  },
  CHECKED_OUT: {
    label: "Checked Out",
    theme: { light: "#0f766e", dark: "#2dd4bf" },
  },
  CANCELLED: {
    label: "Cancelled",
    theme: { light: "#dc2626", dark: "#f87171" },
  },
  NO_SHOW: {
    label: "No Show",
    theme: { light: "#64748b", dark: "#94a3b8" },
  },
} satisfies ChartConfig;

export type BookingStatusRange = "all" | "7d" | "14d" | "28d";

type Option = {
  label: string;
  value: BookingStatusRange;
};

const defaultOptions: Option[] = [
  { label: "All time", value: "all" },
  { label: "7 days", value: "7d" },
  { label: "14 days", value: "14d" },
  { label: "28 days", value: "28d" },
];

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
  range?: BookingStatusRange;
  onRangeChange?: (range: BookingStatusRange) => void;
  options?: Option[];
  isLoading?: boolean;
  isError?: boolean;
  onRetry?: () => void;
}

export function DonutChart({
  data,
  config = bookingStatusConfig,
  title,
  description,
  centerLabel = "Total",
  height = "h-65",
  range = "all",
  onRangeChange = () => {},
  options = defaultOptions,
  isLoading = false,
  isError = false,
  onRetry,
}: DonutChartProps) {
  const chartData = data.map((item) => ({
    ...item,
    label: formatString(item.status),
  }));
  const total = data.reduce((sum, item) => sum + Number(item.count ?? 0), 0);

  return (
    <Card className="w-full min-w-0 border border-border bg-card text-card-foreground">
      <CardHeader className="flex flex-row items-start justify-between gap-4">
        <div className="min-w-0">
          <CardTitle>{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </div>

        <CardAction>
          <Select
            value={range}
            onValueChange={(value) =>
              onRangeChange(value as BookingStatusRange)
            }
          >
            <SelectTrigger
              aria-label="Booking status time range"
              className="h-8 w-27.5 text-xs"
            >
              <SelectValue />
            </SelectTrigger>

            <SelectContent>
              {options.map(({ label, value }) => (
                <SelectItem key={value} value={value}>
                  {label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </CardAction>
      </CardHeader>

      <CardContent className="min-w-0">
        {isError ? (
          <div
            role="alert"
            className="flex min-h-80 flex-col items-center justify-center gap-3 text-center"
          >
            <p className="text-sm text-muted-foreground">
              Booking status could not be loaded.
            </p>
            {onRetry && (
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={onRetry}
              >
                Try again
              </Button>
            )}
          </div>
        ) : isLoading ? (
          <div
            role="status"
            aria-label="Loading booking status"
            aria-busy="true"
            className="space-y-4"
          >
            <div
              className={`mx-auto grid aspect-square ${height} place-items-center`}
            >
              <div className="grid size-48 place-items-center rounded-full border-14 border-muted">
                <Skeleton className="h-5 w-14" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-x-4 gap-y-2 pt-2">
              {Array.from({ length: 6 }, (_, index) => (
                <div key={index} className="flex items-center justify-between">
                  <Skeleton className="h-3 w-20" />
                  <Skeleton className="h-3 w-6" />
                </div>
              ))}
            </div>
          </div>
        ) : (
          <>
            <ChartContainer
              config={config}
              className={`mx-auto aspect-square ${height}`}
            >
              <PieChart>
                <ChartTooltip
                  cursor={false}
                  content={
                    <ChartTooltipContent
                      className="border border-border bg-card text-card-foreground shadow-md"
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
                  nameKey={String("label")}
                  innerRadius={72}
                  outerRadius={96}
                  paddingAngle={2}
                  stroke="var(--card)"
                  strokeWidth={3}
                >
                  {chartData.map((item) => {
                    const key = String(item.status);
                    return <Cell key={key} fill={`var(--color-${key})`} />;
                  })}
                </Pie>

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
          </>
        )}
      </CardContent>
    </Card>
  );
}
