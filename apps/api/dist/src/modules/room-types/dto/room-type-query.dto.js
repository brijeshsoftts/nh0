"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoomTypeQueryDto = exports.RoomTypeQuerySchema = void 0;
const nestjs_zod_1 = require("nestjs-zod");
const zod_1 = require("zod");
exports.RoomTypeQuerySchema = zod_1.z
    .object({
    search: zod_1.z
        .string('Search must be text')
        .trim()
        .min(1, 'Search cannot be empty')
        .max(100, 'Search must be 100 characters or fewer')
        .optional(),
    isActive: zod_1.z
        .enum(['true', 'false'], 'Active status must be true or false')
        .transform((value) => value === 'true')
        .optional(),
    maxGuests: zod_1.z.coerce
        .number({ message: 'Maximum guests must be a number' })
        .int('Maximum guests must be a whole number')
        .min(1, 'Maximum guests must be at least 1')
        .optional(),
    page: zod_1.z.coerce
        .number()
        .int('Page must be an integer')
        .min(1, 'Page must be at least 1')
        .default(1),
    limit: zod_1.z.coerce
        .number()
        .int('Limit must be an integer')
        .min(1, 'Limit must be at least 1')
        .max(100, 'Limit must be 100 or less')
        .default(10),
})
    .strict();
class RoomTypeQueryDto extends (0, nestjs_zod_1.createZodDto)(exports.RoomTypeQuerySchema) {
}
exports.RoomTypeQueryDto = RoomTypeQueryDto;
//# sourceMappingURL=room-type-query.dto.js.map