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
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AnyFilesInterceptor } from '@nestjs/platform-express';
import type {} from 'multer';

import { MAX_FILE_SIZE, MAX_FILES } from '../../common/constants';
import { CurrentUser, Roles } from '../../common/decorators';
import { AuthGuard, RoleGuard } from '../../common/guards';
import {
  apiListResponse,
  apiMessageResponse,
  apiResponse,
} from '../../common/helpers';
import { fileValidationPipe, ValidationPipe } from '../../common/pipes';
import { UserRole } from '../../types/prisma.types';

import {
  CreateRoomTypeDto,
  CreateRoomTypeSchema,
} from './dto/create-room-type.dto';
import {
  RoomTypeQueryDto,
  RoomTypeQuerySchema,
} from './dto/room-type-query.dto';
import {
  UpdateRoomTypeDto,
  UpdateRoomTypeSchema,
} from './dto/update-room-type.dto';
import { ROOM_TYPE_SUCCESS_MSG } from './room-types.constants';
import { RoomTypesService } from './room-types.service';

@UseGuards(AuthGuard, RoleGuard)
@Controller('room-types')
export class RoomTypesController {
  constructor(private readonly roomTypesService: RoomTypesService) {}

  @Roles('ADMIN')
  @UseInterceptors(
    AnyFilesInterceptor(fileValidationPipe(MAX_FILE_SIZE, MAX_FILES)),
  )
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(
    @Body(new ValidationPipe(CreateRoomTypeSchema)) body: CreateRoomTypeDto,
    @UploadedFiles() files,
  ) {
    const data = await this.roomTypesService.create(files, body);
    return apiResponse({ data, message: ROOM_TYPE_SUCCESS_MSG.CREATED });
  }

  @Roles('ADMIN')
  @UseInterceptors(
    AnyFilesInterceptor(fileValidationPipe(MAX_FILE_SIZE, MAX_FILES)),
  )
  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  async update(
    @Param('id') id: string,
    @Body(new ValidationPipe(UpdateRoomTypeSchema)) body: UpdateRoomTypeDto,
    @UploadedFiles() files: Express.Multer.File[],
  ) {
    await this.roomTypesService.update(id, body, files);
    return apiMessageResponse(ROOM_TYPE_SUCCESS_MSG.UPDATED);
  }

  @Roles('ADMIN', 'MANAGER', 'STAFF', 'CUSTOMER')
  @Get()
  @HttpCode(HttpStatus.OK)
  async findAll(
    @Query(new ValidationPipe(RoomTypeQuerySchema)) query: RoomTypeQueryDto,
    @CurrentUser('role') role: UserRole,
  ) {
    const { data, meta } = await this.roomTypesService.findAll(query, role);
    return apiListResponse({ data, meta });
  }

  @Roles('ADMIN', 'MANAGER', 'STAFF')
  @Get(':slug')
  @HttpCode(HttpStatus.OK)
  async findOne(@Param('slug') slug: string) {
    const data = await this.roomTypesService.findOne(slug);
    return apiResponse({ data });
  }
}
