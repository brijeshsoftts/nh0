import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Query,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import type { Request, Response } from 'express';

import { CurrentUser } from '../../common/decorators';
import { AuthGuard } from '../../common/guards';
import { apiMessageResponse } from '../../common/helpers';
import { ValidationPipe } from '../../common/pipes';

import {
  ForgotPasswordDto,
  ForgotPasswordSchema,
} from './dto/forgot-password.dto';
import { LoginDto, LoginSchema } from './dto/login.dto';
import {
  ResetPasswordDto,
  ResetPasswordQueryDto,
  ResetPasswordQuerySchema,
  ResetPasswordSchema,
} from './dto/reset-password.dto';
import { RegisterDto, RegisterSchema } from './dto/register.dto';
import { AUTH_SUCCESS_MSG } from './auth.constants';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  async register(@Body(new ValidationPipe(RegisterSchema)) body: RegisterDto) {
    await this.authService.register(body);
    return apiMessageResponse(AUTH_SUCCESS_MSG.REGISTER);
  }

  @Post('forgot-password')
  @HttpCode(HttpStatus.OK)
  async forgotPassword(
    @Body(new ValidationPipe(ForgotPasswordSchema)) body: ForgotPasswordDto,
  ) {
    await this.authService.forgotPassword(body);
    return apiMessageResponse(AUTH_SUCCESS_MSG.PASSWORD_RESET_EMAIL_SENT);
  }

  @Post('reset-password')
  @HttpCode(HttpStatus.OK)
  async resetPassword(
    @Query(new ValidationPipe(ResetPasswordQuerySchema))
    query: ResetPasswordQueryDto,
    @Body(new ValidationPipe(ResetPasswordSchema)) body: ResetPasswordDto,
  ) {
    await this.authService.resetPassword(query.token, body);
    return apiMessageResponse(AUTH_SUCCESS_MSG.PASSWORD_RESET);
  }

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
