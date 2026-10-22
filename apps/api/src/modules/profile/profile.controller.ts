import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Patch,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';

import { MAX_FILE_SIZE } from '../../common/constants';
import { CurrentUser } from '../../common/decorators';
import { AuthGuard, RoleGuard } from '../../common/guards';
import { apiMessageResponse, apiResponse } from '../../common/helpers';
import { fileValidationPipe, ValidationPipe } from '../../common/pipes';

import {
  ChangePasswordDto,
  ChangePasswordSchema,
} from './dto/change-password.dto';
import {
  UpdateProfileDto,
  UpdateProfileSchema,
} from './dto/update-profile.dto';
import { PROFILE_ERROR_MSG, PROFILE_SUCCESS_MSG } from './profile.constants';
import { ProfileService } from './profile.service';
import type { ProfileUploadFile } from './profile.types';

@UseGuards(AuthGuard, RoleGuard)
@Controller('profile')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @Get('me')
  @HttpCode(HttpStatus.OK)
  async findMe(@CurrentUser('id') userId: string) {
    const data = await this.profileService.findMe(userId);
    return apiResponse({ data });
  }

  @Get('details')
  @HttpCode(HttpStatus.OK)
  async findDetails(@CurrentUser('id') userId: string) {
    const data = await this.profileService.findDetails(userId);
    return apiResponse({ data });
  }

  @Patch('me')
  @HttpCode(HttpStatus.OK)
  async updateMe(
    @CurrentUser('id') userId: string,
    @Body(new ValidationPipe(UpdateProfileSchema)) body: UpdateProfileDto,
  ) {
    const data = await this.profileService.updateMe(userId, body);
    return apiResponse({ data, message: PROFILE_SUCCESS_MSG.UPDATED });
  }

  @Patch('avatar')
  @UseInterceptors(
    FileInterceptor('avatar', fileValidationPipe(MAX_FILE_SIZE, 1)),
  )
  @HttpCode(HttpStatus.OK)
  async updateAvatar(
    @CurrentUser('id') userId: string,
    @UploadedFile() file?: ProfileUploadFile,
  ) {
    if (!file) {
      throw new BadRequestException(PROFILE_ERROR_MSG.IMAGE_REQUIRED);
    }
    const data = await this.profileService.updateAvatar(userId, file);
    return apiResponse({ data, message: PROFILE_SUCCESS_MSG.AVATAR_UPDATED });
  }

  @Delete('avatar')
  @HttpCode(HttpStatus.OK)
  async removeAvatar(@CurrentUser('id') userId: string) {
    const data = await this.profileService.removeAvatar(userId);
    return apiResponse({ data, message: PROFILE_SUCCESS_MSG.AVATAR_REMOVED });
  }

  @Patch('change-password')
  @HttpCode(HttpStatus.OK)
  async changePassword(
    @CurrentUser('id') userId: string,
    @Body(new ValidationPipe(ChangePasswordSchema)) body: ChangePasswordDto,
  ) {
    await this.profileService.changePassword(userId, body);
    return apiMessageResponse(PROFILE_SUCCESS_MSG.PASSWORD_CHANGED);
  }
}
