import type { StatCard } from "@/components/common/StatCard";

export const MOCK_STAFF_KPIS: StatCard[] = [
  {
    id: "total-staff",
    title: "Total Staff",
    value: "32",
    description: "Active staff members across the hotel",
    icon: "Users",
    link: "/dashboard/staff",
  },
  {
    id: "receptionists",
    title: "Receptionists",
    value: "8",
    description: "Active staff managing guest services",
    icon: "ConciergeBell",
    link: "/dashboard/staff",
  },
  {
    id: "housekeepers",
    title: "Housekeepers",
    value: "12",
    description: "Active staff handling room readiness",
    icon: "Sparkles",
    link: "/dashboard/staff",
  },
  {
    id: "inactive-staff",
    title: "Inactive Staff",
    value: "4",
    description: "Staff members currently unavailable",
    icon: "UserX",
    link: "/dashboard/staff",
  },
];
