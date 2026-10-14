import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Patch,
  UseGuards,
} from '@nestjs/common';

import { CurrentUser } from '../../common/decorators';
import { AuthGuard, RoleGuard } from '../../common/guards';
import { apiMessageResponse, apiResponse } from '../../common/helpers';
import { ValidationPipe } from '../../common/pipes';

import {
  ChangePasswordDto,
  ChangePasswordSchema,
} from './dto/change-password.dto';
import {
  UpdateProfileDto,
  UpdateProfileSchema,
} from './dto/update-profile.dto';
import { PROFILE_SUCCESS_MSG } from './profile.constants';
import { ProfileService } from './profile.service';

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
