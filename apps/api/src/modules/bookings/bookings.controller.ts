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
import { Category, UserRole } from '../../types/prisma.types';

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
  CreatePublicBookingDto,
  CreatePublicBookingSchema,
} from './dto/create-public-booking.dto';
import {
  UpdateBookingStatusDto,
  UpdateBookingStatusSchema,
} from './dto/update-booking-status.dto';
import { BookingsService } from './bookings.service';

@Controller('bookings')
export class BookingsController {
  constructor(private readonly bookingsService: BookingsService) {}

  @UseGuards(AuthGuard, RoleGuard)
  @Roles('ADMIN', 'MANAGER', 'STAFF', 'CUSTOMER')
  @Get()
  @HttpCode(HttpStatus.OK)
  async findAll(
    @Query(new ValidationPipe(BookingsQuerySchema)) query: BookingsQueryDto,
    @CurrentUser('id') userId: string,
    @CurrentUser('role') role: UserRole,
    @CurrentUser('category') category: Category | undefined,
  ) {
    const { data, meta } = await this.bookingsService.findAll(
      query,
      userId,
      role,
      category,
    );
    return apiListResponse({ data, meta });
  }

  @UseGuards(AuthGuard, RoleGuard)
  @Roles('ADMIN', 'MANAGER', 'STAFF', 'CUSTOMER')
  @Get('stats')
  @HttpCode(HttpStatus.OK)
  async getStats(
    @CurrentUser('id') userId: string,
    @CurrentUser('role') role: UserRole,
    @CurrentUser('category') category: Category | undefined,
  ) {
    const data = await this.bookingsService.getStats(userId, role, category);
    return apiResponse({ data });
  }

  @UseGuards(AuthGuard, RoleGuard)
  @Roles('ADMIN', 'MANAGER', 'STAFF')
  @Patch(':id/status')
  @HttpCode(HttpStatus.OK)
  async updateStatus(
    @Param('id') id: string,
    @Body(new ValidationPipe(UpdateBookingStatusSchema))
    body: UpdateBookingStatusDto,
    @CurrentUser('role') role: UserRole,
    @CurrentUser('category') category: Category | undefined,
  ) {
    const data = await this.bookingsService.updateStatus(
      id,
      body.status,
      role,
      category,
    );
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

  @Post('public')
  @HttpCode(HttpStatus.CREATED)
  async createPublic(
    @Body(new ValidationPipe(CreatePublicBookingSchema))
    body: CreatePublicBookingDto,
  ) {
    const data = await this.bookingsService.createPublic(body);
    return apiResponse({ data });
  }

  @UseGuards(AuthGuard, RoleGuard)
  @Roles('ADMIN', 'MANAGER', 'STAFF', 'CUSTOMER')
  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async findOne(
    @Param('id') id: string,
    @CurrentUser('id') userId: string,
    @CurrentUser('role') role: UserRole,
    @CurrentUser('category') category: Category | undefined,
  ) {
    const data = await this.bookingsService.findOne(id, userId, role, category);
    return apiResponse({ data });
  }

  @UseGuards(AuthGuard, RoleGuard)
  @Roles('ADMIN', 'MANAGER', 'STAFF', 'CUSTOMER')
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(
    @Body(new ValidationPipe(CreateBookingSchema)) body: CreateBookingDto,
    @CurrentUser('id') userId: string,
    @CurrentUser('role') role: UserRole,
    @CurrentUser('category') category: Category | undefined,
  ) {
    const data = await this.bookingsService.create(
      userId,
      role,
      category,
      body,
    );
    return apiResponse({ data });
  }
}
