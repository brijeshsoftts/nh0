"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AmenitiesController = void 0;
const common_1 = require("@nestjs/common");
const decorators_1 = require("../../common/decorators");
const guards_1 = require("../../common/guards");
const helpers_1 = require("../../common/helpers");
const pipes_1 = require("../../common/pipes");
const create_amenity_dto_1 = require("./dto/create-amenity.dto");
const update_amenity_dto_1 = require("./dto/update-amenity.dto");
const amenities_constants_1 = require("./amenities.constants");
const amenities_service_1 = require("./amenities.service");
let AmenitiesController = class AmenitiesController {
    amenitiesService;
    constructor(amenitiesService) {
        this.amenitiesService = amenitiesService;
    }
    async create(body) {
        const data = await this.amenitiesService.create(body);
        return (0, helpers_1.apiResponse)({ data, message: amenities_constants_1.AMENITIES_SUCCESS_MSG.CREATED });
    }
    async findAll() {
        const data = await this.amenitiesService.findAll();
        return (0, helpers_1.apiResponse)({ data });
    }
    async update(id, body) {
        const data = await this.amenitiesService.update(id, body);
        return (0, helpers_1.apiResponse)({ data, message: amenities_constants_1.AMENITIES_SUCCESS_MSG.UPDATED });
    }
    async delete(id) {
        await this.amenitiesService.delete(id);
        return (0, helpers_1.apiMessageResponse)(amenities_constants_1.AMENITIES_SUCCESS_MSG.DELETED);
    }
};
exports.AmenitiesController = AmenitiesController;
__decorate([
    (0, common_1.UseGuards)(guards_1.AuthGuard, guards_1.RoleGuard),
    (0, decorators_1.Roles)('ADMIN'),
    (0, common_1.Post)(),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    __param(0, (0, common_1.Body)(new pipes_1.ValidationPipe(create_amenity_dto_1.CreateAmenitySchema))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_amenity_dto_1.CreateAmenityDto]),
    __metadata("design:returntype", Promise)
], AmenitiesController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AmenitiesController.prototype, "findAll", null);
__decorate([
    (0, common_1.UseGuards)(guards_1.AuthGuard, guards_1.RoleGuard),
    (0, decorators_1.Roles)('ADMIN', 'MANAGER'),
    (0, common_1.Patch)(':id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)(new pipes_1.ValidationPipe(update_amenity_dto_1.UpdateAmenitySchema))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_amenity_dto_1.UpdateAmenityDto]),
    __metadata("design:returntype", Promise)
], AmenitiesController.prototype, "update", null);
__decorate([
    (0, common_1.UseGuards)(guards_1.AuthGuard, guards_1.RoleGuard),
    (0, decorators_1.Roles)('ADMIN'),
    (0, common_1.Delete)(':id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AmenitiesController.prototype, "delete", null);
exports.AmenitiesController = AmenitiesController = __decorate([
    (0, common_1.Controller)('amenities'),
    __metadata("design:paramtypes", [amenities_service_1.AmenitiesService])
], AmenitiesController);
//# sourceMappingURL=amenities.controller.js.map