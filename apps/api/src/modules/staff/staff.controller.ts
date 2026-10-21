import {
  BadRequestException,
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
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileFieldsInterceptor } from '@nestjs/platform-express';

import { MAX_FILE_SIZE, MAX_FILES } from '../../common/constants';
import { Roles } from '../../common/decorators';
import { AuthGuard, RoleGuard } from '../../common/guards';
import {
  apiListResponse,
  apiMessageResponse,
  apiResponse,
} from '../../common/helpers';
import { fileValidationPipe, ValidationPipe } from '../../common/pipes';

import { CreateStaffDto, CreateStaffSchema } from './dto/create-staff.dto';
import {
  StaffLookupQueryDto,
  StaffLookupQuerySchema,
} from './dto/staff-lookup-query.dto';
import { StaffQueryDto, StaffQuerySchema } from './dto/staff-query.dto';
import { UpdateStaffDto, UpdateStaffSchema } from './dto/update-staff.dto';
import {
  UpdateStaffStatusDto,
  UpdateStaffStatusSchema,
} from './dto/update-staff-status.dto';
import { STAFF_ERROR_MSG, STAFF_SUCCESS_MSG } from './staff.constants';
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
  @Get('lookup')
  @HttpCode(HttpStatus.OK)
  async lookup(
    @Query(new ValidationPipe(StaffLookupQuerySchema))
    query: StaffLookupQueryDto,
  ) {
    const data = await this.staffService.lookup(query);
    return apiResponse({ data });
  }

  @Roles('ADMIN', 'MANAGER')
  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async findOne(@Param('id') id: string) {
    const data = await this.staffService.findOne(id);
    return apiResponse({ data });
  }

  @Roles('ADMIN', 'MANAGER')
  @UseInterceptors(
    FileFieldsInterceptor(
      [
        { name: 'idProof', maxCount: 1 },
        { name: 'signature', maxCount: 1 },
      ],
      fileValidationPipe(MAX_FILE_SIZE, MAX_FILES),
    ),
  )
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(
    @Body(new ValidationPipe(CreateStaffSchema)) body: CreateStaffDto,
    @UploadedFiles() files,
  ) {
    if (!files?.idProof?.[0] || !files?.signature?.[0]) {
      throw new BadRequestException(STAFF_ERROR_MSG.DOCUMENTS_REQUIRED);
    }
    await this.staffService.create(files, body);
    return apiMessageResponse(STAFF_SUCCESS_MSG.CREATED);
  }

  @Roles('ADMIN', 'MANAGER')
  @UseInterceptors(
    FileFieldsInterceptor(
      [
        { name: 'idProof', maxCount: 1 },
        { name: 'signature', maxCount: 1 },
      ],
      fileValidationPipe(MAX_FILE_SIZE, MAX_FILES),
    ),
  )
  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  async update(
    @Param('id') id: string,
    @Body(new ValidationPipe(UpdateStaffSchema)) body: UpdateStaffDto,
    @UploadedFiles() files,
  ) {
    await this.staffService.update(id, body, files);
    return apiMessageResponse(STAFF_SUCCESS_MSG.UPDATED);
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
