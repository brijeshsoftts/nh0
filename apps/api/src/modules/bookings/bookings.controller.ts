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
import { apiListResponse, apiResponse } from '../../common/helpers';
import { ValidationPipe } from '../../common/pipes';

import {
  BookingAvailabilityQueryDto,
  BookingAvailabilityQuerySchema,
} from './dto/available-rooms-query.dto';
import {
  BookingsQueryDto,
  BookingsQuerySchema,
} from './dto/bookings-query.dto';
import {
  CreateBookingDto,
  CreateBookingSchema,
} from './dto/create-booking.dto';
import {
  UpdateBookingStatusDto,
  UpdateBookingStatusSchema,
} from './dto/update-booking-status.dto';
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

  @UseGuards(AuthGuard, RoleGuard)
  @Roles('ADMIN', 'MANAGER', 'STAFF')
  @Patch(':id/status')
  @HttpCode(HttpStatus.OK)
  async updateStatus(
    @Param('id') id: string,
    @Body(new ValidationPipe(UpdateBookingStatusSchema))
    body: UpdateBookingStatusDto,
  ) {
    const data = await this.bookingsService.updateStatus(id, body.status);
    return apiResponse({ data });
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

  @UseGuards(AuthGuard, RoleGuard)
  @Roles('ADMIN', 'MANAGER', 'STAFF')
  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async findOne(@Param('id') id: string) {
    const data = await this.bookingsService.findOne(id);
    return apiResponse({ data });
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(
    @Body(new ValidationPipe(CreateBookingSchema)) body: CreateBookingDto,
    @CurrentUser('id') userId: string,
  ) {
    const data = await this.bookingsService.create(userId, body);
    return apiResponse({ data });
  }
}
