import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

import { AmenitiesModule } from './modules/amenities/amenities.module';
import { AuthModule } from './modules/auth/auth.module';
import { RoomTypesModule } from './modules/room-types/room-types.module';
import { UsersModule } from './modules/users/users.module';
import { PrismaModule } from './prisma/prisma.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { env } from './config';
import { PublicModule } from './modules/public/public.module';
import { RoomsModule } from './modules/rooms/rooms.module';

@Module({
  imports: [
    PrismaModule,
    JwtModule.register({
      global: true,
      secret: env.JWT_ACCESS_SECRET,
      signOptions: { expiresIn: '1h' },
    }),
    AuthModule,
    UsersModule,
    AmenitiesModule,
    RoomTypesModule,
    PublicModule,
    RoomsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
