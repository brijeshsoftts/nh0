import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';

import { Roles } from '../../common/decorators';
import { AuthGuard, RoleGuard } from '../../common/guards';
import { apiListResponse, apiResponse } from '../../common/helpers';
import { ValidationPipe } from '../../common/pipes';

import {
  BookingAvailabilityQueryDto,
  BookingAvailabilityQuerySchema,
} from './dto/available-rooms-query.dto';
import {
  CreateBookingDto,
  CreateBookingSchema,
} from './dto/create-booking.dto';
import {
  BookingsQueryDto,
  BookingsQuerySchema,
} from './dto/bookings-query.dto';
import { BookingsService } from './bookings.service';

@Controller('bookings')
export class BookingsController {
  constructor(private readonly bookingsService: BookingsService) {}

  @UseGuards(AuthGuard, RoleGuard)
  @Roles('ADMIN', 'MANAGER', 'STAFF')
  @Get()
  @HttpCode(HttpStatus.OK)
  async findAll(
    @Query(new ValidationPipe(BookingsQuerySchema)) query: BookingsQueryDto,
  ) {
    const { data, meta } = await this.bookingsService.findAll(query);
    return apiListResponse({ data, meta });
  }

  @Get('available-rooms')
  @HttpCode(HttpStatus.OK)
  async findAvailableRooms(
    @Query(new ValidationPipe(BookingAvailabilityQuerySchema))
    query: BookingAvailabilityQueryDto,
  ) {
    const data = await this.bookingsService.findAvailableRooms(query);
    return apiResponse({ data });
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(
    @Body(new ValidationPipe(CreateBookingSchema)) body: CreateBookingDto,
  ) {
    const data = await this.bookingsService.create(body);
    return apiResponse({ data });
  }
}
