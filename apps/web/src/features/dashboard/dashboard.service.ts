import type { DashboardStat } from "@/components/common/Stat";
import { apiClient } from "@/lib/apiClient";

import { toDashboardStats } from "../shared/stat-response";

import type {
  BookingStatusRange,
  DonutChartData,
} from "./components/DonutChart";
import type { TrendChart } from "./components/TrendChart";
import type { Stays } from "./dashboard.types";
import type { CustomerNextBooking } from "./dashboard.types";

export const dashboardService = {
  getStats: (): Promise<DashboardStat[]> =>
    apiClient
      .get("/dashboard/stats")
      .then((res) => toDashboardStats(res.data?.data, "dashboard")),
  getNextBooking: (): Promise<CustomerNextBooking | null> =>
    apiClient.get("/dashboard/next-booking").then((res) => res.data?.data),
  getRevenueTrend: (range: string): Promise<TrendChart[]> =>
    apiClient
      .get("/dashboard/revenue-trend", { params: { range } })
      .then((res) => res.data.data),
  getBookingStatus: (range: BookingStatusRange): Promise<DonutChartData[]> =>
    apiClient
      .get("/dashboard/booking-status", { params: { range } })
      .then((res) => res.data?.data),
  getStays: (): Promise<Stays> =>
    apiClient.get("/dashboard/stays").then((res) => res.data?.data),
};
