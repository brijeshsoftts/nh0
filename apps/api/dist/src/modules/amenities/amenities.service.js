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
Object.defineProperty(exports, "__esModule", { value: true });
exports.AmenitiesService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
const amenities_constants_1 = require("./amenities.constants");
let AmenitiesService = class AmenitiesService {
    prismaService;
    constructor(prismaService) {
        this.prismaService = prismaService;
    }
    async create(dto) {
        try {
            return await this.prismaService.amenity.create({
                data: dto,
                select: {
                    id: true,
                    name: true,
                    description: true,
                    icon: true,
                    category: true,
                    isActive: true,
                    createdAt: true,
                    updatedAt: true,
                },
            });
        }
        catch (error) {
            if (typeof error === 'object' &&
                error !== null &&
                'code' in error &&
                error.code === 'P2002') {
                throw new common_1.ConflictException(amenities_constants_1.AMENITIES_ERROR_MSG.NAME_ALREADY_EXISTS);
            }
            throw error;
        }
    }
    async findAll() {
        return await this.prismaService.amenity.findMany({
            orderBy: { name: 'asc' },
            select: {
                id: true,
                name: true,
                description: true,
                icon: true,
                category: true,
                isActive: true,
                createdAt: true,
                updatedAt: true,
            },
        });
    }
    async update(id, dto) {
        try {
            return await this.prismaService.amenity.update({
                where: { id },
                data: dto,
                select: {
                    id: true,
                    name: true,
                    description: true,
                    icon: true,
                    category: true,
                    isActive: true,
                    createdAt: true,
                    updatedAt: true,
                },
            });
        }
        catch (error) {
            if (typeof error === 'object' &&
                error !== null &&
                'code' in error &&
                error.code === 'P2002') {
                throw new common_1.ConflictException(amenities_constants_1.AMENITIES_ERROR_MSG.NAME_ALREADY_EXISTS);
            }
            if (typeof error === 'object' &&
                error !== null &&
                'code' in error &&
                error.code === 'P2025') {
                throw new common_1.NotFoundException(amenities_constants_1.AMENITIES_ERROR_MSG.NOT_FOUND);
            }
            throw error;
        }
    }
    async delete(id) {
        try {
            await this.prismaService.amenity.delete({
                where: { id },
                select: { id: true },
            });
        }
        catch (error) {
            if (typeof error === 'object' &&
                error !== null &&
                'code' in error &&
                error.code === 'P2025') {
                throw new common_1.NotFoundException(amenities_constants_1.AMENITIES_ERROR_MSG.NOT_FOUND);
            }
            throw error;
        }
    }
};
exports.AmenitiesService = AmenitiesService;
exports.AmenitiesService = AmenitiesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], AmenitiesService);
//# sourceMappingURL=amenities.service.js.map