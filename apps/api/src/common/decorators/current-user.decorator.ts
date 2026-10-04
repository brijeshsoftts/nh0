import {
  createParamDecorator,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';

import { CurrentUser as CUser } from '../../types/shared.types';

export const CurrentUser = createParamDecorator(
  (data: keyof CUser, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const user = request.user;
    if (!user) {
      throw new UnauthorizedException();
    }

    return data ? user?.[data] : user;
  },
);
