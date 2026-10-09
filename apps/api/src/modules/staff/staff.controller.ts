import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';

import { Roles } from '../../common/decorators';
import { AuthGuard, RoleGuard } from '../../common/guards';
import {
  apiListResponse,
  apiMessageResponse,
  apiResponse,
} from '../../common/helpers';
import { ValidationPipe } from '../../common/pipes';

import { CreateStaffDto, CreateStaffSchema } from './dto/create-staff.dto';
import { StaffQueryDto, StaffQuerySchema } from './dto/staff-query.dto';
import { UpdateStaffDto, UpdateStaffSchema } from './dto/update-staff.dto';
import {
  UpdateStaffStatusDto,
  UpdateStaffStatusSchema,
} from './dto/update-staff-status.dto';
import { STAFF_SUCCESS_MSG } from './staff.constants';
import { StaffService } from './staff.service';

@UseGuards(AuthGuard, RoleGuard)
@Controller('staff')
export class StaffController {
  constructor(private readonly staffService: StaffService) {}

  @Roles('ADMIN', 'MANAGER')
  @Get('stats')
  @HttpCode(HttpStatus.OK)
  async getStats() {
    const data = await this.staffService.getStats();
    return apiResponse({ data });
  }

  @Roles('ADMIN', 'MANAGER')
  @Get()
  @HttpCode(HttpStatus.OK)
  async findAll(
    @Query(new ValidationPipe(StaffQuerySchema)) query: StaffQueryDto,
  ) {
    const { data, meta } = await this.staffService.findAll(query);
    return apiListResponse({ data, meta });
  }

  @Roles('ADMIN', 'MANAGER')
  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async findOne(@Param('id') id: string) {
    const data = await this.staffService.findOne(id);
    return apiResponse({ data });
  }

  @Roles('ADMIN', 'MANAGER')
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(
    @Body(new ValidationPipe(CreateStaffSchema)) body: CreateStaffDto,
  ) {
    const data = await this.staffService.create(body);
    return apiResponse({ data, message: STAFF_SUCCESS_MSG.CREATED });
  }

  @Roles('ADMIN', 'MANAGER')
  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  async update(
    @Param('id') id: string,
    @Body(new ValidationPipe(UpdateStaffSchema)) body: UpdateStaffDto,
  ) {
    const data = await this.staffService.update(id, body);
    return apiResponse({ data, message: STAFF_SUCCESS_MSG.UPDATED });
  }

  @Roles('ADMIN', 'MANAGER')
  @Patch(':id/status')
  @HttpCode(HttpStatus.OK)
  async updateStatus(
    @Param('id') id: string,
    @Body(new ValidationPipe(UpdateStaffStatusSchema))
    body: UpdateStaffStatusDto,
  ) {
    await this.staffService.updateStatus(id, body.isActive);
    return apiMessageResponse(STAFF_SUCCESS_MSG.STATUS_UPDATED);
  }

  @Roles('ADMIN')
  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  async delete(@Param('id') id: string) {
    const result = await this.staffService.delete(id);
    return apiMessageResponse(
      result === 'DELETED'
        ? STAFF_SUCCESS_MSG.DELETED
        : STAFF_SUCCESS_MSG.DEACTIVATED,
    );
  }
}
