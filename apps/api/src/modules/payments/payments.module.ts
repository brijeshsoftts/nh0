import { Module } from '@nestjs/common';

import { PrismaModule } from '../../prisma/prisma.module';

import { PaymentsController } from './payments.controller';
import { PaymentsPublicController } from './payments-public.controller';
import { PaymentsService } from './payments.service';
import { PaymentsWebhookController } from './payments-webhook.controller';

@Module({
  imports: [PrismaModule],
  controllers: [
    PaymentsController,
    PaymentsPublicController,
    PaymentsWebhookController,
  ],
  providers: [PaymentsService],
})
export class PaymentsModule {}
