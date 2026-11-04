import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
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

import {
  AmenitiesQueryDto,
  AmenitiesQuerySchema,
} from './dto/amenities-query.dto';
import {
  AvailableRoomQueryDto,
  AvailableRoomQuerySchema,
} from './dto/available-room-query.dot';
import {
  AvailableRoomsQueryDto,
  AvailableRoomsQuerySchema,
} from './dto/available-rooms-query.dto';
import {
  PublicContactMessageDto,
  PublicContactMessageSchema,
} from './dto/contact-message.dto';
import {
  InquiriesQueryDto,
  InquiriesQuerySchema,
} from './dto/inquiries-query.dto';
import { PublicService } from './public.service';

@Controller('public')
export class PublicController {
  constructor(private readonly publicService: PublicService) {}

  @Get('inquiries')
  @UseGuards(AuthGuard, RoleGuard)
  @Roles('ADMIN', 'MANAGER')
  @HttpCode(HttpStatus.OK)
  async findInquiries(
    @Query(new ValidationPipe(InquiriesQuerySchema)) query: InquiriesQueryDto,
  ) {
    const { data, meta } = await this.publicService.findInquiries(query);
    return apiListResponse({ data, meta });
  }

  @Delete('inquiries/:id')
  @UseGuards(AuthGuard, RoleGuard)
  @Roles('ADMIN', 'MANAGER')
  @HttpCode(HttpStatus.OK)
  async deleteInquiry(@Param('id') id: string) {
    await this.publicService.deleteInquiry(id);
    return apiMessageResponse('Inquiry deleted successfully.');
  }

  @Post('contact')
  @HttpCode(HttpStatus.OK)
  async sendContactMessage(
    @Body(new ValidationPipe(PublicContactMessageSchema))
    body: PublicContactMessageDto,
  ) {
    await this.publicService.createInquiry(body);
    return apiResponse({
      data: { message: 'Your message has been sent successfully.' },
    });
  }

  @Get('amenities')
  @HttpCode(HttpStatus.OK)
  async findAmenities(
    @Query(new ValidationPipe(AmenitiesQuerySchema))
    query: AmenitiesQueryDto,
  ) {
    const { data, meta } = await this.publicService.findAmenities(query);
    return apiListResponse({ data, meta });
  }

  @Get('rooms/:slug')
  @HttpCode(HttpStatus.OK)
  async findAvailableRoom(
    @Param('slug') slug: string,
    @Query(new ValidationPipe(AvailableRoomQuerySchema))
    query: AvailableRoomQueryDto,
  ) {
    const data = await this.publicService.findAvailableRoom(slug, query);
    return apiResponse({ data });
  }

  @Get('rooms')
  @HttpCode(HttpStatus.OK)
  async findAvailableRooms(
    @Query(new ValidationPipe(AvailableRoomsQuerySchema))
    query: AvailableRoomsQueryDto,
  ) {
    const { data, meta } = await this.publicService.findAvailableRooms(query);
    return apiListResponse({ data, meta });
  }
}
