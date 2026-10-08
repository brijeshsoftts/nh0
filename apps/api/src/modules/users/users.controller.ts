import {
  Body,
  Controller,
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
import { UpdateUserDto, UpdateUserSchema } from './dto/update-user.dto';
import { UsersQueryDto, UsersQuerySchema } from './dto/users-query.dto';
import { USER_SUCCESS_MSG } from './users.constants';
import { UsersService } from './users.service';

@UseGuards(AuthGuard, RoleGuard)
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Roles('ADMIN')
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(
    @Body(new ValidationPipe(CreateUserSchema)) body: CreateUserDto,
  ) {
    await this.usersService.create(body);
    return apiMessageResponse(USER_SUCCESS_MSG.CREATED);
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

  @Get('me')
  @HttpCode(HttpStatus.OK)
  async findOne(@CurrentUser('id') userId: string) {
    const data = await this.usersService.findOne(userId);
    return apiResponse({ data });
  }

  @UseGuards(AuthGuard, RoleGuard)
  @Patch('me')
  @HttpCode(HttpStatus.OK)
  async updateProfile(
    @CurrentUser('id') userId: string,
    @Body(new ValidationPipe(UpdateUserSchema)) body: UpdateUserDto,
  ) {
    const data = await this.usersService.update(userId, body);
    return apiResponse({ data, message: USER_SUCCESS_MSG.UPDATED });
  }

  @UseGuards(AuthGuard, RoleGuard)
  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  async update(
    @Param('id') id: string,
    @CurrentUser('role') role: string,
    @CurrentUser('id') userId: string,
    @Body(new ValidationPipe(UpdateUserSchema)) body: UpdateUserDto,
  ) {
    const data = await this.usersService.update(id, body, role, userId);
    return apiResponse({ data, message: USER_SUCCESS_MSG.UPDATED });
  }
}
