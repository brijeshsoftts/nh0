import { Module } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';

import { PrismaModule } from '../../prisma/prisma.module';

import { AuditLogsController } from './audit-logs.controller';
import { AuditLogsInterceptor } from './audit-logs.interceptor';
import { AuditLogsService } from './audit-logs.service';

@Module({
  imports: [PrismaModule],
  controllers: [AuditLogsController],
  providers: [
    AuditLogsService,
    { provide: APP_INTERCEPTOR, useClass: AuditLogsInterceptor },
  ],
})
export class AuditLogsModule {}
