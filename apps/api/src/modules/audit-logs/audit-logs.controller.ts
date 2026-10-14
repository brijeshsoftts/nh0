import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Query,
  UseGuards,
} from '@nestjs/common';

import { Roles } from '../../common/decorators';
import { AuthGuard, RoleGuard } from '../../common/guards';
import { apiListResponse } from '../../common/helpers';
import { ValidationPipe } from '../../common/pipes';

import {
  AuditLogsQueryDto,
  AuditLogsQuerySchema,
} from './dto/audit-logs-query.dto';
import { AuditLogsService } from './audit-logs.service';

@UseGuards(AuthGuard, RoleGuard)
@Roles('ADMIN')
@Controller('audit-logs')
export class AuditLogsController {
  constructor(private readonly auditLogsService: AuditLogsService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  async findAll(
    @Query(new ValidationPipe(AuditLogsQuerySchema)) query: AuditLogsQueryDto,
  ) {
    const { data, meta } = await this.auditLogsService.findAll(query);
    return apiListResponse({ data, meta });
  }
}
