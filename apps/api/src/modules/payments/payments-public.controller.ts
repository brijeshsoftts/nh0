import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';

import { apiResponse } from '../../common/helpers';
import { ValidationPipe } from '../../common/pipes';

import {
  PublicPaymentAccessDto,
  PublicPaymentAccessSchema,
  PublicPaymentStatusDto,
  PublicPaymentStatusSchema,
  PublicVerifyPaymentDto,
  PublicVerifyPaymentSchema,
} from './dto/public-payment.dto';
import { PAYMENTS_SUCCESS_MSG } from './payments.constants';
import { PaymentsService } from './payments.service';

@Controller('payments/public')
export class PaymentsPublicController {
  constructor(private readonly paymentsService: PaymentsService) {}

  @Post('orders')
  @HttpCode(HttpStatus.CREATED)
  async createOrder(
    @Body(new ValidationPipe(PublicPaymentAccessSchema))
    body: PublicPaymentAccessDto,
  ) {
    const data = await this.paymentsService.createPublicOrder(
      body.bookingId,
      body.checkoutToken,
    );
    return apiResponse({
      data,
      message: PAYMENTS_SUCCESS_MSG.ONLINE_INITIATED,
    });
  }

  @Post('verify')
  @HttpCode(HttpStatus.OK)
  async verifyPayment(
    @Body(new ValidationPipe(PublicVerifyPaymentSchema))
    body: PublicVerifyPaymentDto,
  ) {
    const { checkoutToken, ...payment } = body;
    const data = await this.paymentsService.verifyPublicPayment(
      payment,
      checkoutToken,
    );
    return apiResponse({ data, message: PAYMENTS_SUCCESS_MSG.ONLINE_VERIFIED });
  }

  @Post('status')
  @HttpCode(HttpStatus.OK)
  async getStatus(
    @Body(new ValidationPipe(PublicPaymentStatusSchema))
    body: PublicPaymentStatusDto,
  ) {
    const data = await this.paymentsService.getPublicPaymentStatus(
      body.paymentId,
      body.checkoutToken,
    );
    return apiResponse({ data });
  }
}
