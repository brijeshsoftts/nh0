import React from "react";

import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import type { BookingStatus } from "@/types/enum.types";

// 1. Format helper to convert 'OUT_OF_ORDER' to 'Out Of Order'
const formatEnumText = (text: string) => {
  return text
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
};

// 2. Unified Semantic Color Dictionary
// Grouped by visual intent using standard Tailwind colors
const enumColorMap: Record<string, string> = {
  // Success / Available (Emerald / Green)
  VACANT:
    "bg-emerald-100 text-emerald-800 hover:bg-emerald-200 border-emerald-200",
  CLEAN:
    "bg-emerald-100 text-emerald-800 hover:bg-emerald-200 border-emerald-200",
  CHECKED_IN:
    "bg-emerald-100 text-emerald-800 hover:bg-emerald-200 border-emerald-200",
  COMPLETED:
    "bg-emerald-100 text-emerald-800 hover:bg-emerald-200 border-emerald-200",
  PAID: "bg-emerald-100 text-emerald-800 hover:bg-emerald-200 border-emerald-200",
  RESOLVED:
    "bg-emerald-100 text-emerald-800 hover:bg-emerald-200 border-emerald-200",
  CASH: "bg-emerald-100 text-emerald-800 hover:bg-emerald-200 border-emerald-200",

  // Warning / Action Required (Amber / Yellow)
  PENDING: "bg-amber-100 text-amber-800 hover:bg-amber-200 border-amber-200",
  PARTIALLY_PAID:
    "bg-amber-100 text-amber-800 hover:bg-amber-200 border-amber-200",
  OCCUPIED: "bg-amber-100 text-amber-800 hover:bg-amber-200 border-amber-200",
  MEDIUM: "bg-amber-100 text-amber-800 hover:bg-amber-200 border-amber-200",
  REPORTED: "bg-amber-100 text-amber-800 hover:bg-amber-200 border-amber-200",
  ELECTRICAL: "bg-amber-100 text-amber-800 hover:bg-amber-200 border-amber-200",
  FURNITURE:
    "bg-orange-100 text-orange-800 hover:bg-orange-200 border-orange-200",

  // In Progress / Active (Blue)
  RESERVED: "bg-blue-100 text-blue-800 hover:bg-blue-200 border-blue-200",
  CLEANING: "bg-blue-100 text-blue-800 hover:bg-blue-200 border-blue-200",
  CONFIRMED: "bg-blue-100 text-blue-800 hover:bg-blue-200 border-blue-200",
  IN_PROGRESS: "bg-blue-100 text-blue-800 hover:bg-blue-200 border-blue-200",
  ASSIGNED: "bg-blue-100 text-blue-800 hover:bg-blue-200 border-blue-200",
  CARD: "bg-blue-100 text-blue-800 hover:bg-blue-200 border-blue-200",
  PLUMBING: "bg-blue-100 text-blue-800 hover:bg-blue-200 border-blue-200",

  // Critical / Destructive (Red / Rose)
  OUT_OF_ORDER: "bg-red-100 text-red-800 hover:bg-red-200 border-red-200",
  DIRTY: "bg-red-100 text-red-800 hover:bg-red-200 border-red-200",
  CANCELLED: "bg-red-100 text-red-800 hover:bg-red-200 border-red-200",
  NO_SHOW: "bg-rose-100 text-rose-800 hover:bg-rose-200 border-rose-200",
  UNPAID: "bg-red-100 text-red-800 hover:bg-red-200 border-red-200",
  FAILED: "bg-red-100 text-red-800 hover:bg-red-200 border-red-200",
  URGENT: "bg-red-100 text-red-800 hover:bg-red-200 border-red-200",
  HIGH: "bg-rose-100 text-rose-800 hover:bg-rose-200 border-rose-200",

  // Neutral / Inactive (Slate / Gray)
  CHECKED_OUT:
    "bg-slate-100 text-slate-800 hover:bg-slate-200 border-slate-200",
  REFUNDED: "bg-slate-100 text-slate-800 hover:bg-slate-200 border-slate-200",
  BANK_TRANSFER:
    "bg-slate-100 text-slate-800 hover:bg-slate-200 border-slate-200",
  LOW: "bg-slate-100 text-slate-800 hover:bg-slate-200 border-slate-200",
  OTHER: "bg-slate-100 text-slate-800 hover:bg-slate-200 border-slate-200",
  TURNDOWN: "bg-slate-100 text-slate-800 hover:bg-slate-200 border-slate-200",

  // Special / Category specific (Purple / Cyan)
  DEEP_CLEAN:
    "bg-purple-100 text-purple-800 hover:bg-purple-200 border-purple-200",
  UPI: "bg-purple-100 text-purple-800 hover:bg-purple-200 border-purple-200",
  APPLIANCE:
    "bg-purple-100 text-purple-800 hover:bg-purple-200 border-purple-200",
  HVAC: "bg-cyan-100 text-cyan-800 hover:bg-cyan-200 border-cyan-200",
};

// 3. Base Reusable Component
interface EnumBadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  value: string;
}

export const EnumBadge = ({ value, className, ...props }: EnumBadgeProps) => {
  const colorClass =
    enumColorMap[value] || "bg-gray-100 text-gray-800 border-gray-200"; // Fallback

  return (
    <Badge
      variant="outline"
      className={cn("font-medium", colorClass, className)}
      {...props}
    >
      {formatEnumText(value)}
    </Badge>
  );
};

// 4. Type-Safe Specific Components
// Use these in your tables/cards to ensure you only pass valid db enum values.

export const StatusBadge = ({ value }: { value: boolean }) => (
  <Badge
    variant="outline"
    className={cn("font-medium", value ? "bg-success" : "text-destructive")}
  >
    {value ? "Active" : "Inactive"}
  </Badge>
);

export const OccupancyBadge = ({
  value,
}: {
  value: "VACANT" | "RESERVED" | "OCCUPIED" | "OUT_OF_ORDER";
}) => <EnumBadge value={value} />;

export const HousekeepingBadge = ({
  value,
}: {
  value: "CLEAN" | "DIRTY" | "CLEANING";
}) => <EnumBadge value={value} />;

export const BookingBadge = ({ value }: { value: BookingStatus }) => (
  <EnumBadge value={value} />
);

export const TaskTypeBadge = ({
  value,
}: {
  value: "CLEANING" | "DEEP_CLEAN" | "TURNDOWN";
}) => <EnumBadge value={value} />;

export const TaskStatusBadge = ({
  value,
}: {
  value: "PENDING" | "IN_PROGRESS" | "COMPLETED";
}) => <EnumBadge value={value} />;

export const InvoiceBadge = ({
  value,
}: {
  value: "UNPAID" | "PARTIALLY_PAID" | "PAID" | "REFUNDED";
}) => <EnumBadge value={value} />;

export const PaymentMethodBadge = ({
  value,
}: {
  value: "CASH" | "CARD" | "UPI" | "BANK_TRANSFER";
}) => <EnumBadge value={value} />;

export const PaymentStatusBadge = ({
  value,
}: {
  value: "PENDING" | "COMPLETED" | "FAILED" | "REFUNDED";
}) => <EnumBadge value={value} />;

export const MaintenanceCategoryBadge = ({
  value,
}: {
  value:
    "ELECTRICAL" | "PLUMBING" | "HVAC" | "FURNITURE" | "APPLIANCE" | "OTHER";
}) => <EnumBadge value={value} />;

export const MaintenancePriorityBadge = ({
  value,
}: {
  value: "LOW" | "MEDIUM" | "HIGH" | "URGENT";
}) => <EnumBadge value={value} />;

export const MaintenanceStatusBadge = ({
  value,
}: {
  value: "REPORTED" | "ASSIGNED" | "IN_PROGRESS" | "COMPLETED" | "RESOLVED";
}) => <EnumBadge value={value} />;

export const NotificationBadge = ({
  value,
}: {
  value:
    | "BOOKING_CONFIRMED"
    | "CHECK_IN_REMINDER"
    | "PAYMENT_RECEIVED"
    | "MAINTENANCE_CREATED"
    | "MAINTENANCE_ASSIGNED"
    | "MAINTENANCE_UPDATED"
    | "HOUSEKEEPING_ASSIGNED"
    | "BOOKING_CANCELLED";
}) => (
  // Notifications usually look better with a unified neutral or brand style, but you can map them in enumColorMap if needed
  <EnumBadge
    value={value}
    className="border-slate-200 bg-slate-100 text-slate-700"
  />
);
