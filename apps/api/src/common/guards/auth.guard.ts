import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import type { Request } from 'express';

import { env } from '../../config';
import { COOKIE_NAME } from '../constants';

@Injectable()
export class AuthGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    const token = request.cookies[COOKIE_NAME.ACCESS_TOKEN] as string;
    if (!token) {
      throw new UnauthorizedException();
    }
    try {
      const user = await new JwtService().verifyAsync(token, {
        secret: env.JWT_ACCESS_SECRET,
      });
      request['user'] = {
        id: user.sub,
        email: user.email,
        role: user.role,
        category: user?.category,
      };
    } catch {
      throw new UnauthorizedException();
    }
    return true;
  }
}
