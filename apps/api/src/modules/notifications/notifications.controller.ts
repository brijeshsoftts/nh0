import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  UseGuards,
} from '@nestjs/common';

import { CurrentUser, Roles } from '../../common/decorators';
import { AuthGuard, RoleGuard } from '../../common/guards';
import { apiMessageResponse, apiResponse } from '../../common/helpers';
import { Category, UserRole } from '../../types/prisma.types';

import { NOTIFICATIONS_SUCCESS_MSG } from './notifications.constants';
import { NotificationsService } from './notifications.service';

@Controller('notifications')
export class NotificationsController {
  constructor(private readonly notificationsService: NotificationsService) {}

  @UseGuards(AuthGuard, RoleGuard)
  @Roles('ADMIN', 'MANAGER', 'STAFF', 'CUSTOMER')
  @Get('unread')
  @HttpCode(HttpStatus.OK)
  async findUnread(
    @CurrentUser('id') userId: string,
    @CurrentUser('role') role: UserRole,
    @CurrentUser('category') category?: Category,
  ) {
    const data = await this.notificationsService.findUnread(
      userId,
      role,
      category,
    );

    return apiResponse({ data });
  }

  @UseGuards(AuthGuard, RoleGuard)
  @Roles('ADMIN', 'MANAGER', 'STAFF', 'CUSTOMER')
  @Patch('read-all')
  @HttpCode(HttpStatus.OK)
  async markAllAsRead(
    @CurrentUser('id') userId: string,
    @CurrentUser('role') role: UserRole,
    @CurrentUser('category') category?: Category,
  ) {
    const data = await this.notificationsService.markAllAsRead(
      userId,
      role,
      category,
    );

    return apiResponse({ data });
  }

  @UseGuards(AuthGuard, RoleGuard)
  @Roles('ADMIN', 'MANAGER', 'STAFF', 'CUSTOMER')
  @Patch(':id/read')
  @HttpCode(HttpStatus.OK)
  async markAsRead(
    @Param('id') id: string,
    @CurrentUser('id') userId: string,
    @CurrentUser('role') role: UserRole,
    @CurrentUser('category') category?: Category,
  ) {
    await this.notificationsService.markAsRead(id, userId, role, category);

    return apiMessageResponse(NOTIFICATIONS_SUCCESS_MSG.MARKED_AS_READ);
  }
}
