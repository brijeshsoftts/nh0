const issueCategories = [
  "PLUMBING",
  "ELECTRICAL",
  "HVAC",
  "FURNITURE",
  "APPLIANCE",
  "INTERNET",
  "BATHROOM",
  "DOOR_LOCK",
  "LIGHTING",
  "OTHER",
] as const;

const issuePriorities = ["LOW", "MEDIUM", "HIGH", "URGENT"] as const;

const issueStatuses = [
  "OPEN",
  "IN_PROGRESS",
  "COMPLETED",
  "RESOLVED",
  "CANCELLED",
] as const;

export const issueFilters = [
  {
    key: "category",
    label: "Category",
    options: issueCategories.map((value) => ({ value, label: value })),
  },
  {
    key: "priority",
    label: "Priority",
    options: issuePriorities.map((value) => ({ value, label: value })),
  },
  {
    key: "status",
    label: "Status",
    options: issueStatuses.map((value) => ({ value, label: value })),
  },
];
