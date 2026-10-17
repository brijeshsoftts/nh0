import { createCrud } from "@/lib/crud/createCrud";

export const dashboardCrud = createCrud()({
  resource: "dashboard",
  endpoint: "/dashboard",
  label: "Dashboard",
});

export const { useStats: useDashbaordStats } = dashboardCrud;
