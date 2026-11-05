import { Module } from '@nestjs/common';

import { PrismaModule } from '../../prisma/prisma.module';
import { NotificationsModule } from '../notifications/notifications.module';

import { IssuesController } from './issues.controller';
import { IssuesService } from './issues.service';

@Module({
  imports: [PrismaModule, NotificationsModule],
  controllers: [IssuesController],
  providers: [IssuesService],
})
export class IssuesModule {}
