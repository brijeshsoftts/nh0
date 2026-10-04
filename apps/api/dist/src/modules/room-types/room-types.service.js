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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoomTypesService = void 0;
const common_1 = require("@nestjs/common");
const slugify_1 = __importDefault(require("slugify"));
const config_1 = require("../../config");
const prisma_service_1 = require("../../prisma/prisma.service");
const room_types_constants_1 = require("./room-types.constants");
let RoomTypesService = class RoomTypesService {
    prismaService;
    constructor(prismaService) {
        this.prismaService = prismaService;
    }
    async create(files, dto) {
        if (!files?.length) {
            throw new common_1.BadRequestException('At least one primary image is required');
        }
        const name = dto.name.trim();
        const slug = (0, slugify_1.default)(name);
        const existingRoomType = await this.prismaService.roomType.findFirst({
            where: {
                OR: [
                    { name: { equals: name, mode: 'insensitive' } },
                    { slug: { equals: slug, mode: 'insensitive' } },
                ],
            },
            select: {
                id: true,
            },
        });
        if (existingRoomType) {
            throw new common_1.ConflictException(room_types_constants_1.ROOM_TYPE_ERROR_MSG.CONFLICT_NAME);
        }
        const uploadedImages = await Promise.all(files.map(async (file, index) => {
            const { name: fileName, url } = await (0, config_1.uploadFile)(file);
            return {
                altText: fileName,
                url,
                isPrimary: index === 0,
                sortOrder: index,
            };
        }));
        return this.prismaService.$transaction(async (tx) => {
            const roomType = await tx.roomType.create({
                data: {
                    name,
                    slug,
                    description: dto.description?.trim(),
                    maxGuests: dto.maxGuests,
                    basePrice: dto.basePrice,
                    bedType: dto.bedType,
                    adults: dto.adults,
                    children: dto.children,
                    bedCount: dto.bedCount,
                    ...(dto.amenities?.length && {
                        amenities: {
                            connect: dto.amenities.map((id) => ({ id })),
                        },
                    }),
                },
                select: {
                    id: true,
                    name: true,
                    maxGuests: true,
                    basePrice: true,
                    slug: true,
                    createdAt: true,
                    isActive: true,
                },
            });
            await tx.image.createMany({
                data: uploadedImages.map((image) => ({
                    ...image,
                    roomTypeId: roomType.id,
                })),
            });
            return roomType;
        });
    }
};
exports.RoomTypesService = RoomTypesService;
exports.RoomTypesService = RoomTypesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], RoomTypesService);
//# sourceMappingURL=room-types.service.js.map