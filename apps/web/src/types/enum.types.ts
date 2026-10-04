export type UserRole = "ADMIN" | "MANAGER" | "STAFF" | "CUSTOMER";

export type Category =
  "RECEPTIONIST" | "HOUSEKEEPER" | "SECURITY_GUARD" | "WAITER";

export type AmenityCategory =
  | "ROOM"
  | "BATHROOM"
  | "FOOD"
  | "ENTERTAINMENT"
  | "CONNECTIVITY"
  | "COMFORT"
  | "SAFETY"
  | "OTHER";

export type BedType =
  "SINGLE" | "TWIN" | "DOUBLE" | "QUEEN" | "KING" | "BUNK" | "SOFA_BED";

export type OccupancyStatus =
  "VACANT" | "RESERVED" | "OCCUPIED" | "OUT_OF_ORDER";

export type HousekeepingStatus = "CLEAN" | "DIRTY" | "CLEANING";

export type BookingStatus =
  | "PENDING"
  | "CONFIRMED"
  | "CHECKED_IN"
  | "CHECKED_OUT"
  | "CANCELLED"
  | "NO_SHOW";

export type TaskType = "CLEANING" | "DEEP_CLEAN" | "TURNDOWN";

export type TaskStatus = "PENDING" | "IN_PROGRESS" | "COMPLETED";

export type InvoiceStatus = "UNPAID" | "PARTIALLY_PAID" | "PAID" | "REFUNDED";

export type PaymentMethod = "CASH" | "ONLINE";

export type PaymentStatus = "PENDING" | "COMPLETED" | "FAILED" | "REFUNDED";

export type IssueCategory =
  | "PLUMBING"
  | "ELECTRICAL"
  | "HVAC"
  | "FURNITURE"
  | "APPLIANCE"
  | "INTERNET"
  | "BATHROOM"
  | "DOOR_LOCK"
  | "LIGHTING"
  | "OTHER";

export type IssuePriority = "LOW" | "MEDIUM" | "HIGH" | "URGENT";

export type IssueStatus =
  "OPEN" | "IN_PROGRESS" | "COMPLETED" | "RESOLVED" | "CANCELLED";

export type NotificationType =
  | "BOOKING_CONFIRMED"
  | "CHECK_IN_REMINDER"
  | "PAYMENT_RECEIVED"
  | "ISSUE_CREATED"
  | "ISSUE_ASSIGNED"
  | "ISSUE_UPDATED"
  | "HOUSEKEEPING_ASSIGNED"
  | "BOOKING_CANCELLED";
