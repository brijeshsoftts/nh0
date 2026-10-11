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

import { CurrentUser, Roles } from '../../common/decorators';
import { AuthGuard, RoleGuard } from '../../common/guards';
import {
  apiListResponse,
  apiMessageResponse,
  apiResponse,
} from '../../common/helpers';
import { ValidationPipe } from '../../common/pipes';
import { UserRole } from '../../types/prisma.types';

import { CreateTaskDto, CreateTaskSchema } from './dto/create-task.dto';
import { TasksQueryDto, TasksQuerySchema } from './dto/tasks-query.dto';
import { UpdateTaskDto, UpdateTaskSchema } from './dto/update-task.dto';
import {
  UpdateTaskStatusDto,
  UpdateTaskStatusSchema,
} from './dto/update-task-status.dto';
import { TASK_SUCCESS_MSG } from './tasks.constants';
import { TasksService } from './tasks.service';

@UseGuards(AuthGuard, RoleGuard)
@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Roles('ADMIN', 'MANAGER')
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(
    @Body(new ValidationPipe(CreateTaskSchema)) body: CreateTaskDto,
  ) {
    const data = await this.tasksService.create(body);
    return apiResponse({ data, message: TASK_SUCCESS_MSG.CREATED });
  }

  @Roles('ADMIN', 'MANAGER')
  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  async update(
    @Param('id') id: string,
    @Body(new ValidationPipe(UpdateTaskSchema)) body: UpdateTaskDto,
  ) {
    const data = await this.tasksService.update(id, body);
    return apiResponse({ data, message: TASK_SUCCESS_MSG.UPDATED });
  }

  @Roles('ADMIN', 'MANAGER')
  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  async delete(@Param('id') id: string) {
    await this.tasksService.delete(id);
    return apiMessageResponse(TASK_SUCCESS_MSG.DELETED);
  }

  @Roles('ADMIN', 'MANAGER', 'STAFF')
  @Patch(':id/status')
  @HttpCode(HttpStatus.OK)
  async updateStatus(
    @Param('id') id: string,
    @Body(new ValidationPipe(UpdateTaskStatusSchema))
    body: UpdateTaskStatusDto,
    @CurrentUser('id') userId: string,
    @CurrentUser('role') role: UserRole,
  ) {
    const data = await this.tasksService.updateStatus(
      id,
      body.status,
      userId,
      role,
    );
    return apiResponse({ data, message: TASK_SUCCESS_MSG.UPDATED });
  }

  @Roles('ADMIN', 'MANAGER', 'STAFF')
  @Get('stats')
  @HttpCode(HttpStatus.OK)
  async getStats(
    @CurrentUser('id') userId: string,
    @CurrentUser('role') role: UserRole,
  ) {
    const data = await this.tasksService.getStats(userId, role);
    return apiResponse({ data });
  }

  @Roles('ADMIN', 'MANAGER', 'STAFF')
  @Get()
  @HttpCode(HttpStatus.OK)
  async findAll(
    @Query(new ValidationPipe(TasksQuerySchema)) query: TasksQueryDto,
    @CurrentUser('id') userId: string,
    @CurrentUser('role') role: UserRole,
  ) {
    const { data, meta } = await this.tasksService.findAll(query, userId, role);
    return apiListResponse({ data, meta });
  }
}
