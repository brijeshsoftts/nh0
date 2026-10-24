import { createCrud } from "@/lib/crud/createCrud";

export const dashboardCrud = createCrud()({
  resource: "dashboard",
  endpoint: "/dashboard",
  label: "Dashboard",
});

export { useDashbaordStats as useDashboardStats } from "./hooks/useDashbaordStats";
