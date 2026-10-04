import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Query,
} from '@nestjs/common';

import { apiListResponse, apiResponse } from '../../common/helpers';
import { ValidationPipe } from '../../common/pipes';

import {
  AmenitiesQueryDto,
  AmenitiesQuerySchema,
} from './dto/amenities-query.dto';
import {
  AvailableRoomQueryDto,
  AvailableRoomQuerySchema,
} from './dto/available-room-query.dot';
import {
  AvailableRoomsQueryDto,
  AvailableRoomsQuerySchema,
} from './dto/available-rooms-query.dto';
import { PublicService } from './public.service';

@Controller('public')
export class PublicController {
  constructor(private readonly publicService: PublicService) {}

  @Get('amenities')
  @HttpCode(HttpStatus.OK)
  async findAmenities(
    @Query(new ValidationPipe(AmenitiesQuerySchema))
    query: AmenitiesQueryDto,
  ) {
    const { data, meta } = await this.publicService.findAmenities(query);
    return apiListResponse({ data, meta });
  }

  @Get('rooms/:slug')
  @HttpCode(HttpStatus.OK)
  async findAvailableRoom(
    @Param('slug') slug: string,
    @Query(new ValidationPipe(AvailableRoomQuerySchema))
    query: AvailableRoomQueryDto,
  ) {
    const data = await this.publicService.findAvailableRoom(slug, query);
    return apiResponse({ data });
  }

  @Get('rooms')
  @HttpCode(HttpStatus.OK)
  async findAvailableRooms(
    @Query(new ValidationPipe(AvailableRoomsQuerySchema))
    query: AvailableRoomsQueryDto,
  ) {
    const { data, meta } = await this.publicService.findAvailableRooms(query);
    return apiListResponse({ data, meta });
  }
}
