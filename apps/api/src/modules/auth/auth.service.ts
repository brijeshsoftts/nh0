import {
  ConflictException,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import type { Request, Response } from 'express';

import { COOKIE_EXPIRATION, COOKIE_NAME } from '../../common/constants';
import {
  clearCookies,
  comparePassword,
  generateRandomStr,
  hashPassword,
  hashRandomStr,
  setCookies,
} from '../../common/helpers';
import { env } from '../../config';
import { PrismaService } from '../../prisma/prisma.service';
import { Category, UserRole } from '../../types/prisma.types';
import { EmailsService } from '../emails/emails.service';

import { ForgotPasswordDto } from './dto/forgot-password.dto';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { AUTH_ERROR_MSG } from './auth.constants';
import { JwtPayload } from './auth.types';

@Injectable()
export class AuthService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly jwtService: JwtService,
    private readonly emailsService: EmailsService,
  ) {
    // (async () => {
    //   await this.prismaService.user.create({
    //     data: {
    //       fullName: 'Brijesh',
    //       email: 'admin@duck.com',
    //       passwordHash: await hashPassword('password'),
    //       role: UserRole.ADMIN,
    //       phone: '1234567890',
    //     },
    //   });
    // })();
  }

  async register(dto: RegisterDto): Promise<void> {
    const passwordHash = await hashPassword(dto.password);

    try {
      await this.prismaService.user.create({
        data: {
          fullName: dto.fullName,
          email: dto.email,
          phone: '',
          passwordHash,
          role: UserRole.CUSTOMER,
        },
        select: { id: true },
      });
    } catch (error) {
      if (
        typeof error === 'object' &&
        error !== null &&
        'code' in error &&
        error.code === 'P2002'
      ) {
        throw new ConflictException(AUTH_ERROR_MSG.CONFLICT_EMAIL);
      }
      throw error;
    }
  }

  async forgotPassword(dto: ForgotPasswordDto): Promise<void> {
    const user = await this.prismaService.user.findFirst({
      where: {
        email: dto.email,
        softDeletedAt: null,
      },
      select: {
        id: true,
        fullName: true,
        email: true,
      },
    });

    if (!user) {
      return;
    }

    const token = generateRandomStr();
    const tokenHash = hashRandomStr(token);
    const now = new Date();
    const expiresAt = new Date(now.getTime() + 30 * 60 * 1000);

    await this.prismaService.$transaction([
      this.prismaService.passwordResetToken.updateMany({
        where: {
          userId: user.id,
          usedAt: null,
          expiresAt: { gt: now },
        },
        data: { usedAt: now },
      }),
      this.prismaService.passwordResetToken.create({
        data: {
          userId: user.id,
          tokenHash,
          expiresAt,
        },
        select: { id: true },
      }),
    ]);

    await this.emailsService.resetPassword(user.fullName, token, '30 minutes');
  }

  async resetPassword(token: string, dto: ResetPasswordDto): Promise<void> {
    const now = new Date();
    const resetToken = await this.prismaService.passwordResetToken.findFirst({
      where: {
        tokenHash: hashRandomStr(token),
        usedAt: null,
        expiresAt: { gt: now },
        user: { is: { softDeletedAt: null } },
      },
      select: {
        id: true,
        userId: true,
      },
    });

    if (!resetToken) {
      throw new UnauthorizedException(
        AUTH_ERROR_MSG.INVALID_PASSWORD_RESET_TOKEN,
      );
    }

    const passwordHash = await hashPassword(dto.password);

    await this.prismaService.$transaction(async (transaction) => {
      const consumedToken = await transaction.passwordResetToken.updateMany({
        where: {
          id: resetToken.id,
          usedAt: null,
          expiresAt: { gt: now },
        },
        data: { usedAt: now },
      });

      if (consumedToken.count !== 1) {
        throw new UnauthorizedException(
          AUTH_ERROR_MSG.INVALID_PASSWORD_RESET_TOKEN,
        );
      }

      await transaction.passwordResetToken.updateMany({
        where: {
          userId: resetToken.userId,
          usedAt: null,
        },
        data: { usedAt: now },
      });
      await transaction.user.update({
        where: { id: resetToken.userId },
        data: { passwordHash },
      });
      await transaction.refreshToken.updateMany({
        where: {
          userId: resetToken.userId,
          revokedAt: null,
        },
        data: { revokedAt: now },
      });
    });
  }

  async login(dto: LoginDto, res: Response): Promise<void> {
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
      throw new UnauthorizedException(AUTH_ERROR_MSG.INVALID_CREDENTIALS);
    }

    if (!user.isActive) {
      throw new ForbiddenException(AUTH_ERROR_MSG.ACCOUNT_NOT_ACTIVE);
    }

    const isPasswordValid = await comparePassword(
      dto.password,
      user.passwordHash,
    );

    if (!isPasswordValid) {
      throw new UnauthorizedException(AUTH_ERROR_MSG.INVALID_CREDENTIALS);
    }

    const { accessToken, refreshToken } = await this.generateTokens(
      user.id,
      user.email,
      user.role,
      user.staff?.category,
    );

    setCookies(res, accessToken, refreshToken);
  }

  async logout(userId: string, req: Request, res: Response): Promise<void> {
    const refreshToken = req.cookies[COOKIE_NAME.REFRESH_TOKEN] as string;
    if (!refreshToken) {
      throw new UnauthorizedException(AUTH_ERROR_MSG.INVALID_REFRESH_TOKEN);
    }

    const refreshTokenHash = hashRandomStr(refreshToken);

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
      throw new UnauthorizedException(AUTH_ERROR_MSG.INVALID_REFRESH_TOKEN);
    }

    await this.prismaService.refreshToken.update({
      where: { id: session.id },
      data: {
        revokedAt: new Date(),
      },
    });

    clearCookies(res);
  }

  async refresh(req: Request, res: Response): Promise<void> {
    const refreshToken = req.cookies[COOKIE_NAME.REFRESH_TOKEN] as string;
    if (!refreshToken) {
      throw new UnauthorizedException(AUTH_ERROR_MSG.INVALID_REFRESH_TOKEN);
    }

    const refreshTokenHash = hashRandomStr(refreshToken);

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
            staff: {
              select: {
                category: true,
              },
            },
          },
        },
      },
    });

    if (!session || session.expiresAt <= new Date()) {
      throw new UnauthorizedException(AUTH_ERROR_MSG.INVALID_REFRESH_TOKEN);
    }

    const newRefreshToken = generateRandomStr();
    const newRefreshTokenHash = hashRandomStr(newRefreshToken);

    const payload: JwtPayload = {
      sub: session.userId,
      email: session.user.email,
      role: session.user.role,
      category: session.user.staff?.category,
    };

    const newAccessToken = await this.jwtService.signAsync(payload, {
      secret: env.JWT_ACCESS_SECRET,
      expiresIn: '1h',
    });

    await this.prismaService.$transaction([
      this.prismaService.refreshToken.update({
        where: { id: session.id },
        data: {
          expiresAt: new Date(Date.now() + COOKIE_EXPIRATION.REFRESH_TOKEN),
          tokenHash: newRefreshTokenHash,
          usedAt: new Date(),
        },
      }),
    ]);

    setCookies(res, newAccessToken, newRefreshToken);
  }

  private async generateTokens(
    userId: string,
    email: string,
    role: UserRole,
    category?: Category,
  ): Promise<{ accessToken: string; refreshToken: string }> {
    const payload: JwtPayload = {
      sub: userId,
      email,
      role,
      category,
    };

    const accessToken = await this.jwtService.signAsync(payload, {
      secret: env.JWT_ACCESS_SECRET,
      expiresIn: '1h',
    });

    const refreshToken = generateRandomStr();
    const refreshTokenHash = hashRandomStr(refreshToken);

    await this.prismaService.refreshToken.create({
      data: {
        expiresAt: new Date(Date.now() + COOKIE_EXPIRATION.REFRESH_TOKEN),
        tokenHash: refreshTokenHash,
        userId: userId,
      },
    });

    return { accessToken, refreshToken };
  }
}
