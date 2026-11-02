import { toDashboardStats } from "../shared/stat-response";

export const issuesStats = toDashboardStats([
  {
    id: "open-issues",
    title: "Open Issues",
    value: "8",
    description: "Awaiting staff review",
    icon: "CircleAlert",
    link: "/dashboard/issues?status=OPEN",
    tone: "rose",
  },
  {
    id: "high-priority",
    title: "High Priority",
    value: "2",
    description: "Need prompt attention",
    icon: "TriangleAlert",
    link: "/dashboard/issues?priority=HIGH",
    tone: "gold",
  },
  {
    id: "in-progress",
    title: "In Progress",
    value: "3",
    description: "Assigned to hotel staff",
    icon: "Clock",
    link: "/dashboard/issues?status=IN_PROGRESS",
    tone: "sky",
  },
  {
    id: "resolved-this-week",
    title: "Resolved This Week",
    value: "7",
    description: "Completed service requests",
    icon: "CircleCheck",
    link: "/dashboard/issues?status=RESOLVED",
    tone: "violet",
  },
]);
