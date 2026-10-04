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

import { Roles } from '../../common/decorators';
import { AuthGuard, RoleGuard } from '../../common/guards';
import {
  apiListResponse,
  apiMessageResponse,
  apiResponse,
} from '../../common/helpers';
import { ValidationPipe } from '../../common/pipes';

import { CreateRoomDto, CreateRoomSchema } from './dto/create-room.dto';
import { RoomsQueryDto, RoomsQuerySchema } from './dto/rooms-query.dto';
import { UpdateRoomDto, UpdateRoomSchema } from './dto/update-room.dto';
import { ROOM_SUCCESS_MSG } from './rooms.constants';
import { RoomsService } from './rooms.service';

@UseGuards(AuthGuard, RoleGuard)
@Controller('rooms')
export class RoomsController {
  constructor(private readonly roomsService: RoomsService) {}

  @Roles('ADMIN')
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body(new ValidationPipe(CreateRoomSchema)) dto: CreateRoomDto) {
    const data = await this.roomsService.create(dto);
    return apiResponse({ data, message: ROOM_SUCCESS_MSG.CREATED });
  }

  @Roles('ADMIN', 'MANAGER', 'STAFF')
  @Get()
  @HttpCode(HttpStatus.OK)
  async findAll(
    @Query(new ValidationPipe(RoomsQuerySchema)) query: RoomsQueryDto,
  ) {
    const { data, meta } = await this.roomsService.findAll(query);
    return apiListResponse({ data, meta });
  }

  @Roles('ADMIN', 'MANAGER', 'STAFF')
  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async findOne(@Param('id') id: string) {
    const data = await this.roomsService.findOne(id);
    return apiResponse({ data });
  }

  @Roles('ADMIN', 'MANAGER')
  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  async update(
    @Param('id') id: string,
    @Body(new ValidationPipe(UpdateRoomSchema)) dto: UpdateRoomDto,
  ) {
    await this.roomsService.update(id, dto);
    return apiMessageResponse(ROOM_SUCCESS_MSG.UPDATED);
  }

  @Roles('ADMIN')
  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  async delete(@Param('id') id: string) {
    await this.roomsService.delete(id);
    return apiMessageResponse(ROOM_SUCCESS_MSG.DELETED);
  }
}
