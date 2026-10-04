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
  UseGuards,
} from '@nestjs/common';

import { Roles } from '../../common/decorators';
import { AuthGuard, RoleGuard } from '../../common/guards';
import { apiMessageResponse, apiResponse } from '../../common/helpers';
import { ValidationPipe } from '../../common/pipes';

import {
  CreateAmenityDto,
  CreateAmenitySchema,
} from './dto/create-amenity.dto';
import {
  UpdateAmenityDto,
  UpdateAmenitySchema,
} from './dto/update-amenity.dto';
import { AMENITIES_SUCCESS_MSG } from './amenities.constants';
import { AmenitiesService } from './amenities.service';

@Controller('amenities')
export class AmenitiesController {
  constructor(private readonly amenitiesService: AmenitiesService) {}

  @UseGuards(AuthGuard, RoleGuard)
  @Roles('ADMIN')
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(
    @Body(new ValidationPipe(CreateAmenitySchema)) body: CreateAmenityDto,
  ) {
    const data = await this.amenitiesService.create(body);
    return apiResponse({ data, message: AMENITIES_SUCCESS_MSG.CREATED });
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  async findAll() {
    const data = await this.amenitiesService.findAll();
    return apiResponse({ data });
  }

  @UseGuards(AuthGuard, RoleGuard)
  @Roles('ADMIN', 'MANAGER')
  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  async update(
    @Param('id') id: string,
    @Body(new ValidationPipe(UpdateAmenitySchema)) body: UpdateAmenityDto,
  ) {
    const data = await this.amenitiesService.update(id, body);
    return apiResponse({ data, message: AMENITIES_SUCCESS_MSG.UPDATED });
  }

  @UseGuards(AuthGuard, RoleGuard)
  @Roles('ADMIN')
  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  async delete(@Param('id') id: string) {
    await this.amenitiesService.delete(id);
    return apiMessageResponse(AMENITIES_SUCCESS_MSG.DELETED);
  }
}
