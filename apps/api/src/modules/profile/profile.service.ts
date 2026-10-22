import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';

import { comparePassword, hashPassword } from '../../common/helpers';
import { uploadFile } from '../../config';
import { PrismaService } from '../../prisma/prisma.service';
import { Prisma } from '../../types/prisma.types';

import { ChangePasswordDto } from './dto/change-password.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { PROFILE_ERROR_MSG } from './profile.constants';
import { Profile, ProfileDetails, ProfileUploadFile } from './profile.types';

const PROFILE_SELECT = {
  id: true,
  fullName: true,
  email: true,
  phone: true,
  role: true,
  isActive: true,
  createdAt: true,
  lastLoginAt: true,
  profile: { select: { id: true, url: true, altText: true } },
  staff: { select: { category: true } },
} satisfies Prisma.UserSelect;

type ProfileRecord = Prisma.UserGetPayload<{ select: typeof PROFILE_SELECT }>;

const PROFILE_DETAILS_SELECT = {
  ...PROFILE_SELECT,
  staff: {
    select: {
      category: true,
      idProofNumber: true,
      experience: true,
      qualification: true,
      emergencyContact: true,
      address: true,
      idProofImage: { select: { id: true, url: true, altText: true } },
      signatureImage: { select: { id: true, url: true, altText: true } },
    },
  },
  customer: {
    select: {
      idProofNumber: true,
      address: true,
      idProofImage: { select: { id: true, url: true, altText: true } },
      signatureImage: { select: { id: true, url: true, altText: true } },
    },
  },
} satisfies Prisma.UserSelect;

type ProfileDetailsRecord = Prisma.UserGetPayload<{
  select: typeof PROFILE_DETAILS_SELECT;
}>;

@Injectable()
export class ProfileService {
  constructor(private readonly prismaService: PrismaService) {}

  async findMe(userId: string): Promise<Profile> {
    const user = await this.prismaService.user.findFirst({
      where: { id: userId, softDeletedAt: null },
      select: PROFILE_SELECT,
    });

    if (!user) {
      throw new NotFoundException(PROFILE_ERROR_MSG.NOT_FOUND);
    }

    return this.mapProfile(user);
  }

  async findDetails(userId: string): Promise<ProfileDetails> {
    const user = await this.prismaService.user.findFirst({
      where: { id: userId, softDeletedAt: null },
      select: PROFILE_DETAILS_SELECT,
    });

    if (!user) {
      throw new NotFoundException(PROFILE_ERROR_MSG.NOT_FOUND);
    }

    const roleDetails = user.staff ?? user.customer;

    return {
      ...this.mapProfile(user),
      idProofNumber: roleDetails?.idProofNumber ?? null,
      experience: user.staff?.experience ?? null,
      qualification: user.staff?.qualification ?? null,
      emergencyContact: user.staff?.emergencyContact ?? null,
      address: roleDetails?.address ?? null,
      idProofImage:
        user.staff?.idProofImage ?? user.customer?.idProofImage ?? null,
      signatureImage:
        user.staff?.signatureImage ?? user.customer?.signatureImage ?? null,
    };
  }

  async updateMe(userId: string, dto: UpdateProfileDto): Promise<Profile> {
    const existingUser = await this.prismaService.user.findFirst({
      where: { id: userId, softDeletedAt: null },
      select: { id: true, email: true },
    });

    if (!existingUser) {
      throw new NotFoundException(PROFILE_ERROR_MSG.NOT_FOUND);
    }

    const email = dto.email?.trim().toLowerCase();
    if (email && email !== existingUser.email) {
      const emailOwner = await this.prismaService.user.findUnique({
        where: { email },
        select: { id: true },
      });

      if (emailOwner && emailOwner.id !== userId) {
        throw new ConflictException(PROFILE_ERROR_MSG.CONFLICT_EMAIL);
      }
    }

    try {
      const user = await this.prismaService.user.update({
        where: { id: userId },
        data: {
          ...(dto.fullName !== undefined && { fullName: dto.fullName }),
          ...(email && { email }),
          ...(dto.phone !== undefined && { phone: dto.phone }),
        },
        select: PROFILE_SELECT,
      });

      return this.mapProfile(user);
    } catch (error) {
      if (this.isPrismaError(error, 'P2002')) {
        throw new ConflictException(PROFILE_ERROR_MSG.CONFLICT_EMAIL);
      }
      throw error;
    }
  }

  async changePassword(userId: string, dto: ChangePasswordDto): Promise<void> {
    const user = await this.prismaService.user.findFirst({
      where: { id: userId, softDeletedAt: null },
      select: { id: true, passwordHash: true },
    });

    if (!user) {
      throw new NotFoundException(PROFILE_ERROR_MSG.NOT_FOUND);
    }

    const isCurrentPasswordValid = await comparePassword(
      dto.oldPassword,
      user.passwordHash,
    );

    if (!isCurrentPasswordValid) {
      throw new UnauthorizedException(PROFILE_ERROR_MSG.INVALID_PASSWORD);
    }

    const passwordHash = await hashPassword(dto.newPassword);
    await this.prismaService.user.update({
      where: { id: userId },
      data: { passwordHash },
    });
  }

  async updateAvatar(
    userId: string,
    file: ProfileUploadFile,
  ): Promise<Profile> {
    const existingUser = await this.prismaService.user.findFirst({
      where: { id: userId, softDeletedAt: null },
      select: { id: true, fullName: true, profileId: true },
    });

    if (!existingUser) {
      throw new NotFoundException(PROFILE_ERROR_MSG.NOT_FOUND);
    }

    const uploaded = await uploadFile(file);

    const user = await this.prismaService.$transaction(async (tx) => {
      const image = await tx.image.create({
        data: {
          url: uploaded.url,
          altText: `${existingUser.fullName} avatar`,
        },
        select: { id: true },
      });

      const updated = await tx.user.update({
        where: { id: userId },
        data: { profileId: image.id },
        select: PROFILE_SELECT,
      });

      if (existingUser.profileId) {
        await tx.image
          .delete({
            where: { id: existingUser.profileId },
          })
          .catch(() => {});
      }

      return updated;
    });

    return this.mapProfile(user);
  }

  async removeAvatar(userId: string): Promise<Profile> {
    const existingUser = await this.prismaService.user.findFirst({
      where: { id: userId, softDeletedAt: null },
      select: { id: true, profileId: true },
    });

    if (!existingUser) {
      throw new NotFoundException(PROFILE_ERROR_MSG.NOT_FOUND);
    }

    const user = await this.prismaService.$transaction(async (tx) => {
      const updated = await tx.user.update({
        where: { id: userId },
        data: { profileId: null },
        select: PROFILE_SELECT,
      });

      if (existingUser.profileId) {
        await tx.image
          .delete({
            where: { id: existingUser.profileId },
          })
          .catch(() => {});
      }

      return updated;
    });

    return this.mapProfile(user);
  }

  private mapProfile(user: ProfileRecord | ProfileDetailsRecord): Profile {
    return {
      id: user.id,
      fullName: user.fullName,
      email: user.email,
      phone: user.phone,
      role: user.role,
      category: user.staff?.category ?? null,
      avatar: user.profile,
      isActive: user.isActive,
      createdAt: user.createdAt.toISOString(),
      lastLoginAt: user.lastLoginAt?.toISOString() ?? null,
    };
  }

  private isPrismaError(error: unknown, code: string): boolean {
    return (
      typeof error === 'object' &&
      error !== null &&
      'code' in error &&
      error.code === code
    );
  }
}
