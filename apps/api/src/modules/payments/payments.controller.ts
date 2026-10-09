import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
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
import { UserRole } from '../../types/prisma.types';

import {
  CreatePaymentDto,
  CreatePaymentSchema,
} from './dto/create-payment.dto';
import {
  PaymentsQueryDto,
  PaymentsQuerySchema,
} from './dto/payments-query.dto';
import { PAYMENTS_SUCCESS_MSG } from './payments.constants';
import { PaymentsService } from './payments.service';

@UseGuards(AuthGuard, RoleGuard)
@Controller('payments')
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  @Roles('ADMIN', 'MANAGER', 'STAFF')
  @Get('stats')
  @HttpCode(HttpStatus.OK)
  async getStats() {
    const data = await this.paymentsService.getStats();
    return apiResponse({ data });
  }

  @Roles('ADMIN', 'MANAGER', 'STAFF', 'CUSTOMER')
  @Get()
  @HttpCode(HttpStatus.OK)
  async findAll(
    @Query(new ValidationPipe(PaymentsQuerySchema)) query: PaymentsQueryDto,
    @CurrentUser('id') userId: string,
    @CurrentUser('role') role: UserRole,
  ) {
    const { data, meta } = await this.paymentsService.findAll(
      query,
      userId,
      role,
    );
    return apiListResponse({ data, meta });
  }

  @Roles('ADMIN', 'MANAGER', 'STAFF', 'CUSTOMER')
  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async findOne(
    @Param('id') id: string,
    @CurrentUser('id') userId: string,
    @CurrentUser('role') role: UserRole,
  ) {
    const data = await this.paymentsService.findOne(id, userId, role);
    return apiResponse({ data });
  }

  @Roles('ADMIN', 'MANAGER', 'STAFF')
  @Post('cash')
  @HttpCode(HttpStatus.CREATED)
  async createCash(
    @Body(new ValidationPipe(CreatePaymentSchema)) body: CreatePaymentDto,
    @CurrentUser('id') userId: string,
  ) {
    const data = await this.paymentsService.createCash(body, userId);
    return apiResponse({ data, message: PAYMENTS_SUCCESS_MSG.CASH_RECORDED });
  }

  @Roles('CUSTOMER')
  @Post('online')
  @HttpCode(HttpStatus.CREATED)
  async createOnline(
    @Body(new ValidationPipe(CreatePaymentSchema)) body: CreatePaymentDto,
    @CurrentUser('id') userId: string,
  ) {
    const data = await this.paymentsService.createOnline(body, userId);
    return apiResponse({
      data,
      message: PAYMENTS_SUCCESS_MSG.ONLINE_INITIATED,
    });
  }

  @Roles('ADMIN', 'MANAGER')
  @Post(':id/refund')
  @HttpCode(HttpStatus.OK)
  async refund(@Param('id') id: string) {
    await this.paymentsService.refund(id);
    return apiMessageResponse(PAYMENTS_SUCCESS_MSG.REFUNDED);
  }
}
