import { Module } from '@nestjs/common';

import { PrismaModule } from '../../prisma/prisma.module';
import { EmailsModule } from '../emails/emails.module';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  imports: [PrismaModule, EmailsModule],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
