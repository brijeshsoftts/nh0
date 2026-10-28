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
import { Category, UserRole } from '../../types/prisma.types';

import { CreateOrderDto, CreateOrderSchema } from './dto/create-order.dto';
import {
  CreatePaymentDto,
  CreatePaymentSchema,
} from './dto/create-payment.dto';
import {
  PaymentsQueryDto,
  PaymentsQuerySchema,
} from './dto/payments-query.dto';
import {
  RecordQrPaymentDto,
  RecordQrPaymentSchema,
} from './dto/record-qr-payment.dto';
import {
  VerifyPaymentDto,
  VerifyPaymentSchema,
} from './dto/verify-payment.dto';
import { PAYMENTS_SUCCESS_MSG } from './payments.constants';
import { PaymentsService } from './payments.service';

@UseGuards(AuthGuard, RoleGuard)
@Controller('payments')
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  @Roles('ADMIN', 'MANAGER', 'STAFF')
  @Get('stats')
  @HttpCode(HttpStatus.OK)
  async getStats(
    @CurrentUser('role') role: UserRole,
    @CurrentUser('category') category: Category | undefined,
  ) {
    const data = await this.paymentsService.getStats(role, category);
    return apiResponse({ data });
  }

  @Roles('ADMIN', 'MANAGER', 'STAFF', 'CUSTOMER')
  @Get()
  @HttpCode(HttpStatus.OK)
  async findAll(
    @Query(new ValidationPipe(PaymentsQuerySchema)) query: PaymentsQueryDto,
    @CurrentUser('id') userId: string,
    @CurrentUser('role') role: UserRole,
    @CurrentUser('category') category: Category | undefined,
  ) {
    const { data, meta } = await this.paymentsService.findAll(
      query,
      userId,
      role,
      category,
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
    @CurrentUser('category') category: Category | undefined,
  ) {
    const data = await this.paymentsService.findOne(id, userId, role, category);
    return apiResponse({ data });
  }

  @Roles('ADMIN', 'MANAGER', 'STAFF')
  @Post('cash')
  @HttpCode(HttpStatus.CREATED)
  async createCash(
    @Body(new ValidationPipe(CreatePaymentSchema)) body: CreatePaymentDto,
    @CurrentUser('id') userId: string,
    @CurrentUser('role') role: UserRole,
    @CurrentUser('category') category: Category | undefined,
  ) {
    const data = await this.paymentsService.createCash(
      body,
      userId,
      role,
      category,
    );
    return apiResponse({ data, message: PAYMENTS_SUCCESS_MSG.CASH_RECORDED });
  }

  @Roles('ADMIN', 'MANAGER', 'STAFF')
  @Post('qr')
  @HttpCode(HttpStatus.CREATED)
  async recordQrPayment(
    @Body(new ValidationPipe(RecordQrPaymentSchema)) body: RecordQrPaymentDto,
    @CurrentUser('id') userId: string,
    @CurrentUser('role') role: UserRole,
    @CurrentUser('category') category: Category | undefined,
  ) {
    const data = await this.paymentsService.recordQrPayment(
      body,
      userId,
      role,
      category,
    );
    return apiResponse({ data, message: PAYMENTS_SUCCESS_MSG.QR_RECORDED });
  }

  @Roles('CUSTOMER', 'STAFF', 'ADMIN', 'MANAGER')
  @Post('orders')
  @HttpCode(HttpStatus.CREATED)
  async createOrder(
    @Body(new ValidationPipe(CreateOrderSchema)) body: CreateOrderDto,
    @CurrentUser('id') userId: string,
    @CurrentUser('role') role: UserRole,
    @CurrentUser('category') category: Category | undefined,
  ) {
    const data = await this.paymentsService.createOrder(
      body.bookingId,
      userId,
      role,
      category,
      body.paymentId,
    );
    return apiResponse({
      data,
      message: PAYMENTS_SUCCESS_MSG.ONLINE_INITIATED,
    });
  }

  @Roles('CUSTOMER', 'STAFF', 'ADMIN', 'MANAGER')
  @Post('verify')
  @HttpCode(HttpStatus.OK)
  async verifyPayment(
    @Body(new ValidationPipe(VerifyPaymentSchema)) body: VerifyPaymentDto,
    @CurrentUser('id') userId: string,
    @CurrentUser('role') role: UserRole,
    @CurrentUser('category') category: Category | undefined,
  ) {
    const data = await this.paymentsService.verifyPayment(
      body,
      userId,
      role,
      category,
    );
    return apiResponse({ data, message: PAYMENTS_SUCCESS_MSG.ONLINE_VERIFIED });
  }

  @Roles('ADMIN', 'MANAGER')
  @Post(':id/refund')
  @HttpCode(HttpStatus.OK)
  async refund(@Param('id') id: string) {
    await this.paymentsService.refund(id);
    return apiMessageResponse(PAYMENTS_SUCCESS_MSG.REFUNDED);
  }
}
