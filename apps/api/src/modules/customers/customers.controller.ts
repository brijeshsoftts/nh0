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

import {
  CreateCustomerDto,
  CreateCustomerSchema,
} from './dto/create-customer.dto';
import {
  CustomersQueryDto,
  CustomersQuerySchema,
} from './dto/customers-query.dto';
import {
  UpdateCustomerDto,
  UpdateCustomerSchema,
} from './dto/update-customer.dto';
import {
  CUSTOMER_ERROR_MSG,
  CUSTOMER_SUCCESS_MSG,
} from './customers.constants';
import { type CustomerFiles, CustomersService } from './customers.service';

@Controller('customers')
export class CustomersController {
  constructor(private readonly customersService: CustomersService) {}

  @UseGuards(AuthGuard, RoleGuard)
  @Roles('ADMIN')
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
    @Body(new ValidationPipe(CreateCustomerSchema)) body: CreateCustomerDto,
    @UploadedFiles() files: CustomerFiles,
  ) {
    if (!files?.idProof?.[0] || !files?.signature?.[0]) {
      throw new BadRequestException(CUSTOMER_ERROR_MSG.DOCUMENTS_REQUIRED);
    }
    await this.customersService.create(files, body);
    return apiMessageResponse(CUSTOMER_SUCCESS_MSG.CREATED);
  }

  @UseGuards(AuthGuard, RoleGuard)
  @Roles('ADMIN', 'MANAGER', 'STAFF')
  @Get()
  @HttpCode(HttpStatus.OK)
  async getAll(
    @Query(new ValidationPipe(CustomersQuerySchema)) query: CustomersQueryDto,
  ) {
    const { data, meta } = await this.customersService.getAll(query);
    return apiListResponse({ data, meta });
  }

  @UseGuards(AuthGuard, RoleGuard)
  @Roles('ADMIN', 'MANAGER', 'STAFF')
  @Get('stats')
  @HttpCode(HttpStatus.OK)
  async getStats() {
    const data = await this.customersService.getStats();
    return apiResponse({ data });
  }

  @UseGuards(AuthGuard, RoleGuard)
  @Roles('ADMIN', 'MANAGER', 'STAFF')
  @Get('search')
  @HttpCode(HttpStatus.OK)
  async search(@Query('q') query?: string) {
    const data = await this.customersService.search(query);
    return apiResponse({ data });
  }

  @UseGuards(AuthGuard, RoleGuard)
  @Roles('ADMIN', 'MANAGER', 'STAFF')
  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async getOne(@Param('id') id: string) {
    const data = await this.customersService.getOne(id);
    return apiResponse({ data });
  }

  @UseGuards(AuthGuard, RoleGuard)
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
    @Body(new ValidationPipe(UpdateCustomerSchema)) body: UpdateCustomerDto,
    @UploadedFiles() files: CustomerFiles,
  ) {
    await this.customersService.update(id, body, files);
    return apiMessageResponse(CUSTOMER_SUCCESS_MSG.UPDATED);
  }

  @UseGuards(AuthGuard, RoleGuard)
  @Roles('ADMIN')
  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  async delete(@Param('id') id: string) {
    await this.customersService.delete(id);
    return apiMessageResponse(CUSTOMER_SUCCESS_MSG.DELETED);
  }
}
