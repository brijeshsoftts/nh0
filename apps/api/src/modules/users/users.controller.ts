import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';

import { CurrentUser, Roles } from '../../common/decorators';
import { AuthGuard, RoleGuard } from '../../common/guards';
import {
  apiListResponse,
  apiMessageResponse,
  apiResponse,
} from '../../common/helpers';
import { ValidationPipe } from '../../common/pipes';

import { CreateUserDto, CreateUserSchema } from './dto/create-user.dto';
import {
  UpdateMyProfileDto,
  UpdateMyProfileSchema,
  UpdateUserDto,
  UpdateUserSchema,
} from './dto/update-user.dto';
import {
  UpdateUserStatusDto,
  UpdateUserStatusSchema,
} from './dto/update-user-status.dto';
import { UsersQueryDto, UsersQuerySchema } from './dto/users-query.dto';
import { USER_SUCCESS_MSG } from './users.constants';
import { UsersService } from './users.service';

@UseGuards(AuthGuard, RoleGuard)
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Roles('ADMIN')
  @Get('stats')
  @HttpCode(HttpStatus.OK)
  async getStats() {
    const data = await this.usersService.getStats();
    return apiResponse({ data });
  }

  @Roles('ADMIN')
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(
    @Body(new ValidationPipe(CreateUserSchema)) body: CreateUserDto,
  ) {
    await this.usersService.create(body);
    return apiMessageResponse(USER_SUCCESS_MSG.CREATED);
  }

  @Get('me')
  @HttpCode(HttpStatus.OK)
  async findMe(@CurrentUser('id') userId: string) {
    const data = await this.usersService.findMe(userId);
    return apiResponse({ data });
  }

  @Roles('ADMIN')
  @Get()
  @HttpCode(HttpStatus.OK)
  async findAll(
    @Query(new ValidationPipe(UsersQuerySchema)) query: UsersQueryDto,
  ) {
    const { data, meta } = await this.usersService.findAll(query);
    return apiListResponse({ data, meta });
  }

  @Roles('ADMIN')
  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async findOne(@Param('id') id: string) {
    const data = await this.usersService.findOne(id);
    return apiResponse({ data });
  }

  @Patch('me')
  @HttpCode(HttpStatus.OK)
  async updateProfile(
    @CurrentUser('id') userId: string,
    @Body(new ValidationPipe(UpdateMyProfileSchema))
    body: UpdateMyProfileDto,
  ) {
    const data = await this.usersService.updateMyProfile(userId, body);
    return apiResponse({ data, message: USER_SUCCESS_MSG.UPDATED });
  }

  @Roles('ADMIN')
  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  async update(
    @Param('id') id: string,
    @Body(new ValidationPipe(UpdateUserSchema)) body: UpdateUserDto,
  ) {
    const data = await this.usersService.update(id, body);
    return apiResponse({ data, message: USER_SUCCESS_MSG.UPDATED });
  }

  @Roles('ADMIN')
  @Patch(':id/status')
  @HttpCode(HttpStatus.OK)
  async updateStatus(
    @Param('id') id: string,
    @Body(new ValidationPipe(UpdateUserStatusSchema))
    body: UpdateUserStatusDto,
  ) {
    const data = await this.usersService.updateStatus(id, body.isActive);
    return apiResponse({ data, message: USER_SUCCESS_MSG.UPDATED });
  }

  @Roles('ADMIN')
  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  async delete(@Param('id') id: string) {
    await this.usersService.delete(id);
    return apiMessageResponse(USER_SUCCESS_MSG.DELETED);
  }
}
