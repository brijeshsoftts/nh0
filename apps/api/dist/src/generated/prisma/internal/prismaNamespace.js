"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.defineExtension = exports.JsonNullValueFilter = exports.NullsOrder = exports.QueryMode = exports.NullableJsonNullValueInput = exports.SortOrder = exports.AuditLogScalarFieldEnum = exports.PasswordResetTokenScalarFieldEnum = exports.RefreshTokenScalarFieldEnum = exports.ImageScalarFieldEnum = exports.NotificationScalarFieldEnum = exports.ReviewScalarFieldEnum = exports.IssueScalarFieldEnum = exports.PaymentScalarFieldEnum = exports.InvoiceScalarFieldEnum = exports.HousekeeperRoomAssignmentScalarFieldEnum = exports.HousekeepingTaskScalarFieldEnum = exports.BookingGuestScalarFieldEnum = exports.BookingRoomScalarFieldEnum = exports.BookingScalarFieldEnum = exports.AmenityScalarFieldEnum = exports.RoomScalarFieldEnum = exports.RoomTypeScalarFieldEnum = exports.CustomerScalarFieldEnum = exports.StaffScalarFieldEnum = exports.UserScalarFieldEnum = exports.TransactionIsolationLevel = exports.ModelName = exports.AnyNull = exports.JsonNull = exports.DbNull = exports.NullTypes = exports.prismaVersion = exports.getExtensionContext = exports.Decimal = exports.Sql = exports.raw = exports.join = exports.empty = exports.sql = exports.PrismaClientValidationError = exports.PrismaClientInitializationError = exports.PrismaClientRustPanicError = exports.PrismaClientUnknownRequestError = exports.PrismaClientKnownRequestError = void 0;
const runtime = __importStar(require("@prisma/client/runtime/client"));
exports.PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError;
exports.PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError;
exports.PrismaClientRustPanicError = runtime.PrismaClientRustPanicError;
exports.PrismaClientInitializationError = runtime.PrismaClientInitializationError;
exports.PrismaClientValidationError = runtime.PrismaClientValidationError;
exports.sql = runtime.sqltag;
exports.empty = runtime.empty;
exports.join = runtime.join;
exports.raw = runtime.raw;
exports.Sql = runtime.Sql;
exports.Decimal = runtime.Decimal;
exports.getExtensionContext = runtime.Extensions.getExtensionContext;
exports.prismaVersion = {
    client: "7.10.0",
    engine: "0edf323efd1d98336f3f0a68684b56f689b900d3"
};
exports.NullTypes = {
    DbNull: runtime.NullTypes.DbNull,
    JsonNull: runtime.NullTypes.JsonNull,
    AnyNull: runtime.NullTypes.AnyNull,
};
exports.DbNull = runtime.DbNull;
exports.JsonNull = runtime.JsonNull;
exports.AnyNull = runtime.AnyNull;
exports.ModelName = {
    User: 'User',
    Staff: 'Staff',
    Customer: 'Customer',
    RoomType: 'RoomType',
    Room: 'Room',
    Amenity: 'Amenity',
    Booking: 'Booking',
    BookingRoom: 'BookingRoom',
    BookingGuest: 'BookingGuest',
    HousekeepingTask: 'HousekeepingTask',
    HousekeeperRoomAssignment: 'HousekeeperRoomAssignment',
    Invoice: 'Invoice',
    Payment: 'Payment',
    Issue: 'Issue',
    Review: 'Review',
    Notification: 'Notification',
    Image: 'Image',
    RefreshToken: 'RefreshToken',
    PasswordResetToken: 'PasswordResetToken',
    AuditLog: 'AuditLog'
};
exports.TransactionIsolationLevel = runtime.makeStrictEnum({
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
});
exports.UserScalarFieldEnum = {
    id: 'id',
    fullName: 'fullName',
    email: 'email',
    phone: 'phone',
    passwordHash: 'passwordHash',
    profileImageId: 'profileImageId',
    role: 'role',
    isActive: 'isActive',
    lastLoginAt: 'lastLoginAt',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    softDeletedAt: 'softDeletedAt'
};
exports.StaffScalarFieldEnum = {
    id: 'id',
    userId: 'userId',
    fatherName: 'fatherName',
    motherName: 'motherName',
    idProofImageId: 'idProofImageId',
    idProofNumber: 'idProofNumber',
    qualification: 'qualification',
    experience: 'experience',
    category: 'category',
    emergencyContact: 'emergencyContact',
    address: 'address',
    signatureImageId: 'signatureImageId',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
};
exports.CustomerScalarFieldEnum = {
    id: 'id',
    userId: 'userId',
    idProofNumber: 'idProofNumber',
    idProofImageId: 'idProofImageId',
    signatureImageId: 'signatureImageId',
    address: 'address',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
};
exports.RoomTypeScalarFieldEnum = {
    id: 'id',
    name: 'name',
    slug: 'slug',
    description: 'description',
    sizeSqFt: 'sizeSqFt',
    maxGuests: 'maxGuests',
    adults: 'adults',
    children: 'children',
    basePrice: 'basePrice',
    currency: 'currency',
    bedType: 'bedType',
    bedCount: 'bedCount',
    smokingAllowed: 'smokingAllowed',
    petsAllowed: 'petsAllowed',
    isActive: 'isActive',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
};
exports.RoomScalarFieldEnum = {
    id: 'id',
    name: 'name',
    roomTypeId: 'roomTypeId',
    roomNumber: 'roomNumber',
    floor: 'floor',
    description: 'description',
    occupancyStatus: 'occupancyStatus',
    housekeepingStatus: 'housekeepingStatus',
    isActive: 'isActive',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
};
exports.AmenityScalarFieldEnum = {
    id: 'id',
    name: 'name',
    description: 'description',
    icon: 'icon',
    category: 'category',
    isActive: 'isActive',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
};
exports.BookingScalarFieldEnum = {
    id: 'id',
    bookingReference: 'bookingReference',
    customerId: 'customerId',
    checkInDate: 'checkInDate',
    checkOutDate: 'checkOutDate',
    totalGuests: 'totalGuests',
    totalAmount: 'totalAmount',
    specialRequest: 'specialRequest',
    status: 'status',
    bookedAt: 'bookedAt',
    checkedInAt: 'checkedInAt',
    checkedOutAt: 'checkedOutAt',
    cancelledAt: 'cancelledAt',
    createdBy: 'createdBy',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
};
exports.BookingRoomScalarFieldEnum = {
    id: 'id',
    bookingId: 'bookingId',
    roomTypeId: 'roomTypeId',
    assignedRoomId: 'assignedRoomId',
    pricePerNight: 'pricePerNight'
};
exports.BookingGuestScalarFieldEnum = {
    id: 'id',
    bookingId: 'bookingId',
    fullName: 'fullName',
    age: 'age',
    gender: 'gender',
    idProofNumber: 'idProofNumber'
};
exports.HousekeepingTaskScalarFieldEnum = {
    id: 'id',
    roomId: 'roomId',
    assignedTo: 'assignedTo',
    taskType: 'taskType',
    status: 'status',
    scheduledDate: 'scheduledDate',
    startedAt: 'startedAt',
    completedAt: 'completedAt',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
};
exports.HousekeeperRoomAssignmentScalarFieldEnum = {
    id: 'id',
    housekeeperId: 'housekeeperId',
    roomId: 'roomId',
    assignedBy: 'assignedBy',
    isActive: 'isActive',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
};
exports.InvoiceScalarFieldEnum = {
    id: 'id',
    invoiceNumber: 'invoiceNumber',
    bookingId: 'bookingId',
    customerId: 'customerId',
    subtotal: 'subtotal',
    taxAmount: 'taxAmount',
    discountAmount: 'discountAmount',
    totalAmount: 'totalAmount',
    status: 'status',
    issuedAt: 'issuedAt',
    createdAt: 'createdAt'
};
exports.PaymentScalarFieldEnum = {
    id: 'id',
    paymentReference: 'paymentReference',
    transactionId: 'transactionId',
    invoiceId: 'invoiceId',
    bookingId: 'bookingId',
    customerId: 'customerId',
    amount: 'amount',
    paymentMethod: 'paymentMethod',
    paymentStatus: 'paymentStatus',
    paidAt: 'paidAt',
    recordedBy: 'recordedBy',
    createdAt: 'createdAt'
};
exports.IssueScalarFieldEnum = {
    id: 'id',
    reference: 'reference',
    roomId: 'roomId',
    reportedById: 'reportedById',
    assignedToId: 'assignedToId',
    category: 'category',
    priority: 'priority',
    status: 'status',
    title: 'title',
    description: 'description',
    imageId: 'imageId',
    reportedAt: 'reportedAt',
    startedAt: 'startedAt',
    completedAt: 'completedAt',
    resolvedAt: 'resolvedAt',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
};
exports.ReviewScalarFieldEnum = {
    id: 'id',
    bookingId: 'bookingId',
    customerId: 'customerId',
    rating: 'rating',
    comment: 'comment',
    createdAt: 'createdAt'
};
exports.NotificationScalarFieldEnum = {
    id: 'id',
    userId: 'userId',
    type: 'type',
    title: 'title',
    message: 'message',
    referenceType: 'referenceType',
    referenceId: 'referenceId',
    isRead: 'isRead',
    createdAt: 'createdAt',
    readAt: 'readAt'
};
exports.ImageScalarFieldEnum = {
    id: 'id',
    url: 'url',
    altText: 'altText',
    isPrimary: 'isPrimary',
    sortOrder: 'sortOrder',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    roomTypeId: 'roomTypeId'
};
exports.RefreshTokenScalarFieldEnum = {
    id: 'id',
    tokenHash: 'tokenHash',
    userId: 'userId',
    expiresAt: 'expiresAt',
    usedAt: 'usedAt',
    revokedAt: 'revokedAt',
    createdAt: 'createdAt'
};
exports.PasswordResetTokenScalarFieldEnum = {
    id: 'id',
    userId: 'userId',
    tokenHash: 'tokenHash',
    expiresAt: 'expiresAt',
    usedAt: 'usedAt',
    createdAt: 'createdAt'
};
exports.AuditLogScalarFieldEnum = {
    id: 'id',
    userId: 'userId',
    action: 'action',
    entityType: 'entityType',
    entityId: 'entityId',
    oldValues: 'oldValues',
    newValues: 'newValues',
    createdAt: 'createdAt'
};
exports.SortOrder = {
    asc: 'asc',
    desc: 'desc'
};
exports.NullableJsonNullValueInput = {
    DbNull: exports.DbNull,
    JsonNull: exports.JsonNull
};
exports.QueryMode = {
    default: 'default',
    insensitive: 'insensitive'
};
exports.NullsOrder = {
    first: 'first',
    last: 'last'
};
exports.JsonNullValueFilter = {
    DbNull: exports.DbNull,
    JsonNull: exports.JsonNull,
    AnyNull: exports.AnyNull
};
exports.defineExtension = runtime.Extensions.defineExtension;
//# sourceMappingURL=prismaNamespace.js.map