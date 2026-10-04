"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateAmenityDto = exports.UpdateAmenitySchema = void 0;
const nestjs_zod_1 = require("nestjs-zod");
const create_amenity_dto_1 = require("./create-amenity.dto");
exports.UpdateAmenitySchema = create_amenity_dto_1.CreateAmenitySchema.partial()
    .strict()
    .refine((amenity) => Object.keys(amenity).length > 0, {
    message: 'Provide at least one amenity field to update',
});
class UpdateAmenityDto extends (0, nestjs_zod_1.createZodDto)(exports.UpdateAmenitySchema) {
}
exports.UpdateAmenityDto = UpdateAmenityDto;
//# sourceMappingURL=update-amenity.dto.js.map