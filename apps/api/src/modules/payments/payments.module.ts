import { Module } from '@nestjs/common';

import { PrismaModule } from '../../prisma/prisma.module';
import { NotificationsModule } from '../notifications/notifications.module';

import { PaymentsController } from './payments.controller';
import { PaymentsService } from './payments.service';
import { PaymentsPublicController } from './payments-public.controller';
import { PaymentsWebhookController } from './payments-webhook.controller';

@Module({
  imports: [PrismaModule, NotificationsModule],
  controllers: [
    PaymentsController,
    PaymentsPublicController,
    PaymentsWebhookController,
  ],
  providers: [PaymentsService],
})
export class PaymentsModule {}
