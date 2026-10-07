import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Query,
} from '@nestjs/common';

import { apiResponse } from '../../common/helpers';
import { ValidationPipe } from '../../common/pipes';

import {
  BookingAvailabilityQueryDto,
  BookingAvailabilityQuerySchema,
} from './dto/available-rooms-query.dto';
import {
  CreateBookingDto,
  CreateBookingSchema,
} from './dto/create-booking.dto';
import { BookingsService } from './bookings.service';

@Controller('bookings')
export class BookingsController {
  constructor(private readonly bookingsService: BookingsService) {}

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
