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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const constants_1 = require("../../common/constants");
const helpers_1 = require("../../common/helpers");
const config_1 = require("../../config");
const prisma_service_1 = require("../../prisma/prisma.service");
const auth_constants_1 = require("./auth.constants");
let AuthService = class AuthService {
    prismaService;
    jwtService;
    constructor(prismaService, jwtService) {
        this.prismaService = prismaService;
        this.jwtService = jwtService;
    }
    async login(dto, res) {
        const user = await this.prismaService.user.findFirst({
            where: {
                email: dto.email,
            },
            select: {
                id: true,
                fullName: true,
                email: true,
                passwordHash: true,
                role: true,
                staff: {
                    select: {
                        category: true,
                    },
                },
                isActive: true,
            },
        });
        if (!user) {
            throw new common_1.UnauthorizedException(auth_constants_1.AUTH_ERROR_MSG.INVALID_CREDENTIALS);
        }
        if (!user.isActive) {
            throw new common_1.ForbiddenException(auth_constants_1.AUTH_ERROR_MSG.ACCOUNT_NOT_ACTIVE);
        }
        const isPasswordValid = await (0, helpers_1.comparePassword)(dto.password, user.passwordHash);
        if (!isPasswordValid) {
            throw new common_1.UnauthorizedException(auth_constants_1.AUTH_ERROR_MSG.INVALID_CREDENTIALS);
        }
        const { accessToken, refreshToken } = await this.generateTokens(user.id, user.email, user.role);
        (0, helpers_1.setCookies)(res, accessToken, refreshToken);
    }
    async logout(userId, req, res) {
        const refreshToken = req.cookies[constants_1.COOKIE_NAME.REFRESH_TOKEN];
        if (!refreshToken) {
            throw new common_1.UnauthorizedException(auth_constants_1.AUTH_ERROR_MSG.INVALID_REFRESH_TOKEN);
        }
        const refreshTokenHash = (0, helpers_1.hashRandomStr)(refreshToken);
        const session = await this.prismaService.refreshToken.findFirst({
            where: {
                userId,
                tokenHash: refreshTokenHash,
                expiresAt: { gt: new Date() },
            },
            select: {
                id: true,
            },
        });
        if (!session) {
            throw new common_1.UnauthorizedException(auth_constants_1.AUTH_ERROR_MSG.INVALID_REFRESH_TOKEN);
        }
        await this.prismaService.refreshToken.update({
            where: { id: session.id },
            data: {
                revokedAt: new Date(),
            },
        });
        (0, helpers_1.clearCookies)(res);
    }
    async refresh(req, res) {
        const refreshToken = req.cookies[constants_1.COOKIE_NAME.REFRESH_TOKEN];
        if (!refreshToken) {
            throw new common_1.UnauthorizedException(auth_constants_1.AUTH_ERROR_MSG.INVALID_REFRESH_TOKEN);
        }
        const refreshTokenHash = (0, helpers_1.hashRandomStr)(refreshToken);
        const session = await this.prismaService.refreshToken.findUnique({
            where: { tokenHash: refreshTokenHash },
            select: {
                id: true,
                userId: true,
                tokenHash: true,
                expiresAt: true,
                user: {
                    select: {
                        id: true,
                        role: true,
                        email: true,
                    },
                },
            },
        });
        if (!session || session.expiresAt <= new Date()) {
            throw new common_1.UnauthorizedException(auth_constants_1.AUTH_ERROR_MSG.INVALID_REFRESH_TOKEN);
        }
        const newRefreshToken = (0, helpers_1.generateRandomStr)();
        const newRefreshTokenHash = (0, helpers_1.hashRandomStr)(newRefreshToken);
        const payload = {
            sub: session.userId,
            email: session.user.email,
            role: session.user.role,
        };
        const newAccessToken = await this.jwtService.signAsync(payload, {
            secret: config_1.env.JWT_ACCESS_SECRET,
            expiresIn: '1h',
        });
        await this.prismaService.$transaction([
            this.prismaService.refreshToken.update({
                where: { id: session.id },
                data: {
                    expiresAt: new Date(Date.now() + constants_1.COOKIE_EXPIRATION.REFRESH_TOKEN),
                    tokenHash: newRefreshTokenHash,
                    usedAt: new Date(),
                },
            }),
        ]);
        (0, helpers_1.setCookies)(res, newAccessToken, newRefreshToken);
    }
    async generateTokens(userId, email, role) {
        const payload = {
            sub: userId,
            email,
            role,
        };
        const accessToken = await this.jwtService.signAsync(payload, {
            secret: config_1.env.JWT_ACCESS_SECRET,
            expiresIn: '1h',
        });
        const refreshToken = (0, helpers_1.generateRandomStr)();
        const refreshTokenHash = (0, helpers_1.hashRandomStr)(refreshToken);
        await this.prismaService.refreshToken.create({
            data: {
                expiresAt: new Date(Date.now() + constants_1.COOKIE_EXPIRATION.REFRESH_TOKEN),
                tokenHash: refreshTokenHash,
                userId: userId,
            },
        });
        return { accessToken, refreshToken };
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        jwt_1.JwtService])
], AuthService);
//# sourceMappingURL=auth.service.js.map