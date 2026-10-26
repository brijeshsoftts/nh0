import type { SelectOption } from "@/components/common/SelectField";

export const issueCategories: SelectOption[] = [
  { id: "PLUMBING", name: "Plumbing" },
  { id: "ELECTRICAL", name: "Electrical" },
  { id: "HVAC", name: "HVAC" },
  { id: "FURNITURE", name: "Furniture" },
  { id: "APPLIANCE", name: "Appliance" },
  { id: "INTERNET", name: "Internet" },
  { id: "BATHROOM", name: "Bathroom" },
  { id: "DOOR_LOCK", name: "Door lock" },
  { id: "LIGHTING", name: "Lighting" },
  { id: "OTHER", name: "Other" },
];

export const issuePriorities: SelectOption[] = [
  { id: "LOW", name: "Low" },
  { id: "MEDIUM", name: "Medium" },
  { id: "HIGH", name: "High" },
  { id: "URGENT", name: "Urgent" },
];

export const issueStatuses: SelectOption[] = [
  { id: "OPEN", name: "Open" },
  { id: "IN_PROGRESS", name: "In progress" },
  { id: "COMPLETED", name: "Completed" },
  { id: "RESOLVED", name: "Resolved" },
  { id: "CANCELLED", name: "Cancelled" },
];
