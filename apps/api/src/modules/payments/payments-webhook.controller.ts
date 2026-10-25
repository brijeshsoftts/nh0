import {
  BadRequestException,
  Controller,
  Headers,
  HttpCode,
  HttpStatus,
  Post,
  type RawBodyRequest,
  Req,
} from '@nestjs/common';
import type { Request } from 'express';

import { apiMessageResponse } from '../../common/helpers';

import { PAYMENTS_SUCCESS_MSG } from './payments.constants';
import { PaymentsService } from './payments.service';

@Controller('payments')
export class PaymentsWebhookController {
  constructor(private readonly paymentsService: PaymentsService) {}

  @Post('webhook')
  @HttpCode(HttpStatus.OK)
  async handleWebhook(
    @Req() request: RawBodyRequest<Request>,
    @Headers('x-razorpay-signature') signature?: string,
    @Headers('x-razorpay-event-id') eventId?: string,
  ) {
    if (!request.rawBody || !signature || !eventId) {
      throw new BadRequestException(
        'Webhook signature and event ID are required.',
      );
    }

    await this.paymentsService.handleWebhook(
      request.rawBody,
      signature,
      eventId,
    );

    return apiMessageResponse(PAYMENTS_SUCCESS_MSG.WEBHOOK_PROCESSED);
  }
}
