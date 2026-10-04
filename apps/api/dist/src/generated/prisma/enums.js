"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotificationType = exports.IssueStatus = exports.IssuePriority = exports.IssueCategory = exports.PaymentStatus = exports.PaymentMethod = exports.InvoiceStatus = exports.TaskStatus = exports.TaskType = exports.BookingStatus = exports.HousekeepingStatus = exports.OccupancyStatus = exports.BedType = exports.AmenityCategory = exports.Category = exports.UserRole = void 0;
exports.UserRole = {
    ADMIN: 'ADMIN',
    MANAGER: 'MANAGER',
    STAFF: 'STAFF',
    CUSTOMER: 'CUSTOMER'
};
exports.Category = {
    RECEPTIONIST: 'RECEPTIONIST',
    HOUSEKEEPER: 'HOUSEKEEPER',
    SECURITY_GUARD: 'SECURITY_GUARD',
    WAITER: 'WAITER'
};
exports.AmenityCategory = {
    ROOM: 'ROOM',
    BATHROOM: 'BATHROOM',
    FOOD: 'FOOD',
    ENTERTAINMENT: 'ENTERTAINMENT',
    CONNECTIVITY: 'CONNECTIVITY',
    COMFORT: 'COMFORT',
    SAFETY: 'SAFETY',
    OTHER: 'OTHER'
};
exports.BedType = {
    SINGLE: 'SINGLE',
    TWIN: 'TWIN',
    DOUBLE: 'DOUBLE',
    QUEEN: 'QUEEN',
    KING: 'KING',
    BUNK: 'BUNK',
    SOFA_BED: 'SOFA_BED'
};
exports.OccupancyStatus = {
    VACANT: 'VACANT',
    RESERVED: 'RESERVED',
    OCCUPIED: 'OCCUPIED',
    OUT_OF_ORDER: 'OUT_OF_ORDER'
};
exports.HousekeepingStatus = {
    CLEAN: 'CLEAN',
    DIRTY: 'DIRTY',
    CLEANING: 'CLEANING'
};
exports.BookingStatus = {
    PENDING: 'PENDING',
    CONFIRMED: 'CONFIRMED',
    CHECKED_IN: 'CHECKED_IN',
    CHECKED_OUT: 'CHECKED_OUT',
    CANCELLED: 'CANCELLED',
    NO_SHOW: 'NO_SHOW'
};
exports.TaskType = {
    CLEANING: 'CLEANING',
    DEEP_CLEAN: 'DEEP_CLEAN',
    TURNDOWN: 'TURNDOWN'
};
exports.TaskStatus = {
    PENDING: 'PENDING',
    IN_PROGRESS: 'IN_PROGRESS',
    COMPLETED: 'COMPLETED'
};
exports.InvoiceStatus = {
    UNPAID: 'UNPAID',
    PARTIALLY_PAID: 'PARTIALLY_PAID',
    PAID: 'PAID',
    REFUNDED: 'REFUNDED'
};
exports.PaymentMethod = {
    CASH: 'CASH',
    ONLINE: 'ONLINE'
};
exports.PaymentStatus = {
    PENDING: 'PENDING',
    COMPLETED: 'COMPLETED',
    FAILED: 'FAILED',
    REFUNDED: 'REFUNDED'
};
exports.IssueCategory = {
    PLUMBING: 'PLUMBING',
    ELECTRICAL: 'ELECTRICAL',
    HVAC: 'HVAC',
    FURNITURE: 'FURNITURE',
    APPLIANCE: 'APPLIANCE',
    INTERNET: 'INTERNET',
    BATHROOM: 'BATHROOM',
    DOOR_LOCK: 'DOOR_LOCK',
    LIGHTING: 'LIGHTING',
    OTHER: 'OTHER'
};
exports.IssuePriority = {
    LOW: 'LOW',
    MEDIUM: 'MEDIUM',
    HIGH: 'HIGH',
    URGENT: 'URGENT'
};
exports.IssueStatus = {
    OPEN: 'OPEN',
    IN_PROGRESS: 'IN_PROGRESS',
    COMPLETED: 'COMPLETED',
    RESOLVED: 'RESOLVED',
    CANCELLED: 'CANCELLED'
};
exports.NotificationType = {
    BOOKING_CONFIRMED: 'BOOKING_CONFIRMED',
    CHECK_IN_REMINDER: 'CHECK_IN_REMINDER',
    PAYMENT_RECEIVED: 'PAYMENT_RECEIVED',
    ISSUE_CREATED: 'ISSUE_CREATED',
    ISSUE_ASSIGNED: 'ISSUE_ASSIGNED',
    ISSUE_UPDATED: 'ISSUE_UPDATED',
    HOUSEKEEPING_ASSIGNED: 'HOUSEKEEPING_ASSIGNED',
    BOOKING_CANCELLED: 'BOOKING_CANCELLED'
};
//# sourceMappingURL=enums.js.map