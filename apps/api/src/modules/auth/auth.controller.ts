import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import type { Request, Response } from 'express';

import { CurrentUser } from '../../common/decorators';
import { AuthGuard } from '../../common/guards';
import { apiMessageResponse } from '../../common/helpers';
import { ValidationPipe } from '../../common/pipes';

import { LoginDto, LoginSchema } from './dto/login.dto';
import { AUTH_SUCCESS_MSG } from './auth.constants';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(
    @Body(new ValidationPipe(LoginSchema)) body: LoginDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    await this.authService.login(body, res);
    return apiMessageResponse(AUTH_SUCCESS_MSG.LOGIN);
  }

  @UseGuards(AuthGuard)
  @Post('logout')
  @HttpCode(HttpStatus.OK)
  async logout(
    @CurrentUser('id') userId: string,
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ) {
    await this.authService.logout(userId, req, res);
    return apiMessageResponse(AUTH_SUCCESS_MSG.LOGOUT);
  }

  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  async refresh(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ) {
    await this.authService.refresh(req, res);
    return apiMessageResponse(AUTH_SUCCESS_MSG.REFRESH_TOKEN);
  }
}
