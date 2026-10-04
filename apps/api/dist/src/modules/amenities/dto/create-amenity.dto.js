"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateAmenityDto = exports.CreateAmenitySchema = void 0;
const nestjs_zod_1 = require("nestjs-zod");
const zod_1 = require("zod");
exports.CreateAmenitySchema = zod_1.z
    .object({
    name: zod_1.z
        .string('Amenity name is required')
        .trim()
        .min(1, 'Amenity name cannot be empty')
        .max(100, 'Amenity name must be 100 characters or fewer'),
    description: zod_1.z
        .string('Description must be text')
        .max(500, 'Description must be 500 characters or fewer')
        .nullable()
        .optional(),
    icon: zod_1.z
        .string('Icon must be text')
        .max(100, 'Icon must be 100 characters or fewer')
        .nullable()
        .optional(),
    category: zod_1.z
        .enum([
        'ROOM',
        'BATHROOM',
        'FOOD',
        'ENTERTAINMENT',
        'CONNECTIVITY',
        'COMFORT',
        'SAFETY',
        'OTHER',
    ], 'Select a valid amenity category')
        .optional(),
    isActive: zod_1.z.boolean('Active status must be true or false').optional(),
})
    .strict();
class CreateAmenityDto extends (0, nestjs_zod_1.createZodDto)(exports.CreateAmenitySchema) {
}
exports.CreateAmenityDto = CreateAmenityDto;
//# sourceMappingURL=create-amenity.dto.js.map