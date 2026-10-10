import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Query,
  UseGuards,
} from '@nestjs/common';

import { CurrentUser, Roles } from '../../common/decorators';
import { AuthGuard, RoleGuard } from '../../common/guards';
import { apiResponse } from '../../common/helpers';
import { ValidationPipe } from '../../common/pipes';
import { Category, UserRole } from '../../types/prisma.types';

import {
  PaymentsQueryDto,
  PaymentsQuerySchema,
} from './dto/payments-query.dto';
import {
  RevenueTrendQueryDto,
  RevenueTrendQuerySchema,
} from './dto/revenue-trend-query.dto';
import { StaysQueryDto, StaysQuerySchema } from './dto/stays-query.dto';
import { DashboardService } from './dashboard.service';

@UseGuards(AuthGuard, RoleGuard)
@Controller('dashboard')
export class DashboardController {
  constructor(private readonly dashboardService: DashboardService) {}

  @Roles('ADMIN', 'MANAGER', 'STAFF', 'CUSTOMER')
  @Get('stats')
  @HttpCode(HttpStatus.OK)
  async getStats(
    @CurrentUser('id') userId: string,
    @CurrentUser('role') role: UserRole,
    @CurrentUser('category') category?: Category,
  ) {
    const data = await this.dashboardService.getStats(userId, role, category);
    return apiResponse({ data });
  }

  @Roles('ADMIN', 'MANAGER')
  @Get('revenue-trend')
  @HttpCode(HttpStatus.OK)
  async getRevenueTrend(
    @Query(new ValidationPipe(RevenueTrendQuerySchema))
    query: RevenueTrendQueryDto,
  ) {
    const data = await this.dashboardService.getRevenueTrend(query.range);
    return apiResponse({ data });
  }

  @Roles('ADMIN', 'MANAGER')
  @Get('booking-status')
  @HttpCode(HttpStatus.OK)
  async getBookingStatus() {
    const data = await this.dashboardService.getBookingStatus();
    return apiResponse({ data });
  }

  @Roles('ADMIN', 'MANAGER', 'STAFF')
  @Get('stays')
  @HttpCode(HttpStatus.OK)
  async getStays(
    @Query(new ValidationPipe(StaysQuerySchema)) query: StaysQueryDto,
  ) {
    const data = await this.dashboardService.getStays(query);
    return apiResponse({ data });
  }

  @Roles('STAFF')
  @Get('tasks')
  @HttpCode(HttpStatus.OK)
  async getTasks(@CurrentUser('id') userId: string) {
    const data = await this.dashboardService.getTasks(userId);
    return apiResponse({ data });
  }

  @Roles('STAFF')
  @Get('payments')
  @HttpCode(HttpStatus.OK)
  async getPaymentsRequiringAttention(
    @CurrentUser('id') userId: string,
    @Query(new ValidationPipe(PaymentsQuerySchema))
    query: PaymentsQueryDto,
  ) {
    const data = await this.dashboardService.getPaymentsRequiringAttention(
      userId,
      query,
    );
    return apiResponse({ data });
  }
}
