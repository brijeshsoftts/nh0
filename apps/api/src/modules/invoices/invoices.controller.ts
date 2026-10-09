import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
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
  InvoicesQueryDto,
  InvoicesQuerySchema,
} from './dto/invoices-query.dto';
import {
  UpdateInvoiceDto,
  UpdateInvoiceSchema,
} from './dto/update-invoice.dto';
import { INVOICES_SUCCESS_MSG } from './invoices.constants';
import { InvoicesService } from './invoices.service';

@UseGuards(AuthGuard, RoleGuard)
@Controller('invoices')
export class InvoicesController {
  constructor(private readonly invoicesService: InvoicesService) {}

  @Roles('ADMIN', 'MANAGER', 'STAFF')
  @Get('stats')
  @HttpCode(HttpStatus.OK)
  async getStats() {
    const data = await this.invoicesService.getStats();
    return apiResponse({ data });
  }

  @Roles('ADMIN', 'MANAGER', 'STAFF', 'CUSTOMER')
  @Get()
  @HttpCode(HttpStatus.OK)
  async findAll(
    @Query(new ValidationPipe(InvoicesQuerySchema)) query: InvoicesQueryDto,
    @CurrentUser('id') userId: string,
    @CurrentUser('role') role: UserRole,
  ) {
    const { data, meta } = await this.invoicesService.findAll(
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
    const data = await this.invoicesService.findOne(id, userId, role);
    return apiResponse({ data });
  }

  @Roles('ADMIN', 'MANAGER')
  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  async update(
    @Param('id') id: string,
    @Body(new ValidationPipe(UpdateInvoiceSchema)) body: UpdateInvoiceDto,
  ) {
    const data = await this.invoicesService.update(id, body);
    return apiResponse({ data, message: INVOICES_SUCCESS_MSG.UPDATED });
  }

  @Roles('ADMIN', 'MANAGER')
  @Post(':id/cancel')
  @HttpCode(HttpStatus.OK)
  async cancel(@Param('id') id: string) {
    await this.invoicesService.cancel(id);
    return apiMessageResponse(INVOICES_SUCCESS_MSG.CANCELLED);
  }
}
