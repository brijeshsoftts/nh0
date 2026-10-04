export declare const UserRole: {
    readonly ADMIN: "ADMIN";
    readonly MANAGER: "MANAGER";
    readonly STAFF: "STAFF";
    readonly CUSTOMER: "CUSTOMER";
};
export type UserRole = (typeof UserRole)[keyof typeof UserRole];
export declare const Category: {
    readonly RECEPTIONIST: "RECEPTIONIST";
    readonly HOUSEKEEPER: "HOUSEKEEPER";
    readonly SECURITY_GUARD: "SECURITY_GUARD";
    readonly WAITER: "WAITER";
};
export type Category = (typeof Category)[keyof typeof Category];
export declare const AmenityCategory: {
    readonly ROOM: "ROOM";
    readonly BATHROOM: "BATHROOM";
    readonly FOOD: "FOOD";
    readonly ENTERTAINMENT: "ENTERTAINMENT";
    readonly CONNECTIVITY: "CONNECTIVITY";
    readonly COMFORT: "COMFORT";
    readonly SAFETY: "SAFETY";
    readonly OTHER: "OTHER";
};
export type AmenityCategory = (typeof AmenityCategory)[keyof typeof AmenityCategory];
export declare const BedType: {
    readonly SINGLE: "SINGLE";
    readonly TWIN: "TWIN";
    readonly DOUBLE: "DOUBLE";
    readonly QUEEN: "QUEEN";
    readonly KING: "KING";
    readonly BUNK: "BUNK";
    readonly SOFA_BED: "SOFA_BED";
};
export type BedType = (typeof BedType)[keyof typeof BedType];
export declare const OccupancyStatus: {
    readonly VACANT: "VACANT";
    readonly RESERVED: "RESERVED";
    readonly OCCUPIED: "OCCUPIED";
    readonly OUT_OF_ORDER: "OUT_OF_ORDER";
};
export type OccupancyStatus = (typeof OccupancyStatus)[keyof typeof OccupancyStatus];
export declare const HousekeepingStatus: {
    readonly CLEAN: "CLEAN";
    readonly DIRTY: "DIRTY";
    readonly CLEANING: "CLEANING";
};
export type HousekeepingStatus = (typeof HousekeepingStatus)[keyof typeof HousekeepingStatus];
export declare const BookingStatus: {
    readonly PENDING: "PENDING";
    readonly CONFIRMED: "CONFIRMED";
    readonly CHECKED_IN: "CHECKED_IN";
    readonly CHECKED_OUT: "CHECKED_OUT";
    readonly CANCELLED: "CANCELLED";
    readonly NO_SHOW: "NO_SHOW";
};
export type BookingStatus = (typeof BookingStatus)[keyof typeof BookingStatus];
export declare const TaskType: {
    readonly CLEANING: "CLEANING";
    readonly DEEP_CLEAN: "DEEP_CLEAN";
    readonly TURNDOWN: "TURNDOWN";
};
export type TaskType = (typeof TaskType)[keyof typeof TaskType];
export declare const TaskStatus: {
    readonly PENDING: "PENDING";
    readonly IN_PROGRESS: "IN_PROGRESS";
    readonly COMPLETED: "COMPLETED";
};
export type TaskStatus = (typeof TaskStatus)[keyof typeof TaskStatus];
export declare const InvoiceStatus: {
    readonly UNPAID: "UNPAID";
    readonly PARTIALLY_PAID: "PARTIALLY_PAID";
    readonly PAID: "PAID";
    readonly REFUNDED: "REFUNDED";
};
export type InvoiceStatus = (typeof InvoiceStatus)[keyof typeof InvoiceStatus];
export declare const PaymentMethod: {
    readonly CASH: "CASH";
    readonly ONLINE: "ONLINE";
};
export type PaymentMethod = (typeof PaymentMethod)[keyof typeof PaymentMethod];
export declare const PaymentStatus: {
    readonly PENDING: "PENDING";
    readonly COMPLETED: "COMPLETED";
    readonly FAILED: "FAILED";
    readonly REFUNDED: "REFUNDED";
};
export type PaymentStatus = (typeof PaymentStatus)[keyof typeof PaymentStatus];
export declare const IssueCategory: {
    readonly PLUMBING: "PLUMBING";
    readonly ELECTRICAL: "ELECTRICAL";
    readonly HVAC: "HVAC";
    readonly FURNITURE: "FURNITURE";
    readonly APPLIANCE: "APPLIANCE";
    readonly INTERNET: "INTERNET";
    readonly BATHROOM: "BATHROOM";
    readonly DOOR_LOCK: "DOOR_LOCK";
    readonly LIGHTING: "LIGHTING";
    readonly OTHER: "OTHER";
};
export type IssueCategory = (typeof IssueCategory)[keyof typeof IssueCategory];
export declare const IssuePriority: {
    readonly LOW: "LOW";
    readonly MEDIUM: "MEDIUM";
    readonly HIGH: "HIGH";
    readonly URGENT: "URGENT";
};
export type IssuePriority = (typeof IssuePriority)[keyof typeof IssuePriority];
export declare const IssueStatus: {
    readonly OPEN: "OPEN";
    readonly IN_PROGRESS: "IN_PROGRESS";
    readonly COMPLETED: "COMPLETED";
    readonly RESOLVED: "RESOLVED";
    readonly CANCELLED: "CANCELLED";
};
export type IssueStatus = (typeof IssueStatus)[keyof typeof IssueStatus];
export declare const NotificationType: {
    readonly BOOKING_CONFIRMED: "BOOKING_CONFIRMED";
    readonly CHECK_IN_REMINDER: "CHECK_IN_REMINDER";
    readonly PAYMENT_RECEIVED: "PAYMENT_RECEIVED";
    readonly ISSUE_CREATED: "ISSUE_CREATED";
    readonly ISSUE_ASSIGNED: "ISSUE_ASSIGNED";
    readonly ISSUE_UPDATED: "ISSUE_UPDATED";
    readonly HOUSEKEEPING_ASSIGNED: "HOUSEKEEPING_ASSIGNED";
    readonly BOOKING_CANCELLED: "BOOKING_CANCELLED";
};
export type NotificationType = (typeof NotificationType)[keyof typeof NotificationType];
