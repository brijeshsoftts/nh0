import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';

import { CurrentUser, Roles } from '../../common/decorators';
import { AuthGuard, RoleGuard } from '../../common/guards';
import { apiListResponse, apiResponse } from '../../common/helpers';
import { ValidationPipe } from '../../common/pipes';
import { UserRole } from '../../types/prisma.types';

import { CreateIssueDto, CreateIssueSchema } from './dto/create-issue.dto';
import { IssuesQueryDto, IssuesQuerySchema } from './dto/issues-query.dto';
import { ISSUE_SUCCESS_MSG } from './issue.constants';
import { IssuesService } from './issues.service';

@UseGuards(AuthGuard, RoleGuard)
@Controller('issues')
export class IssuesController {
  constructor(private readonly issuesService: IssuesService) {}

  @Roles('ADMIN', 'MANAGER', 'CUSTOMER')
  @Get()
  @HttpCode(HttpStatus.OK)
  async findAll(
    @Query(new ValidationPipe(IssuesQuerySchema)) query: IssuesQueryDto,
    @CurrentUser('id') userId: string,
    @CurrentUser('role') role: UserRole,
  ) {
    const { data, meta } = await this.issuesService.findAll(
      query,
      userId,
      role,
    );
    return apiListResponse({ data, meta });
  }

  @Roles('ADMIN', 'MANAGER', 'CUSTOMER')
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(
    @Body(new ValidationPipe(CreateIssueSchema)) body: CreateIssueDto,
    @CurrentUser('id') userId: string,
    @CurrentUser('role') role: UserRole,
  ) {
    const data = await this.issuesService.create(userId, role, body);
    return apiResponse({ data, message: ISSUE_SUCCESS_MSG.CREATED });
  }
}
