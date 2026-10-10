import type { StatCard } from "@/components/common/StatCard";
import { apiClient } from "@/lib/apiClient";

import type { DonutChartData } from "./components/DonutChart";
import type { TrendChart } from "./components/TrendChart";
import type { Stays } from "./dashboard.types";

export const dashboardService = {
  getStats: (): Promise<StatCard[]> =>
    apiClient.get("/dashboard/stats").then((res) => res.data?.data),
  getRevenueTrend: (range: string): Promise<TrendChart[]> =>
    apiClient
      .get("/dashboard/revenue-trend", { params: { range } })
      .then((res) => res.data.data),
  getBookingStatus: (): Promise<DonutChartData[]> =>
    apiClient.get("/dashboard/booking-status").then((res) => res.data?.data),
  getStays: (): Promise<Stays> =>
    apiClient.get("/dashboard/stays").then((res) => res.data?.data),
};
