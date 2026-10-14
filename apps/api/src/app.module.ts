import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

import { AmenitiesModule } from './modules/amenities/amenities.module';
import { AuditLogsModule } from './modules/audit-logs/audit-logs.module';
import { AuthModule } from './modules/auth/auth.module';
import { BookingsModule } from './modules/bookings/bookings.module';
import { CustomersModule } from './modules/customers/customers.module';
import { DashboardModule } from './modules/dashboard/dashboard.module';
import { InvoicesModule } from './modules/invoices/invoices.module';
import { IssuesModule } from './modules/issues/issues.module';
import { PaymentsModule } from './modules/payments/payments.module';
import { ProfileModule } from './modules/profile/profile.module';
import { PublicModule } from './modules/public/public.module';
import { RoomTypesModule } from './modules/room-types/room-types.module';
import { RoomsModule } from './modules/rooms/rooms.module';
import { StaffModule } from './modules/staff/staff.module';
import { TasksModule } from './modules/tasks/tasks.module';
import { UsersModule } from './modules/users/users.module';
import { PrismaModule } from './prisma/prisma.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { env } from './config';

@Module({
  imports: [
    PrismaModule,
    JwtModule.register({
      global: true,
      secret: env.JWT_ACCESS_SECRET,
      signOptions: { expiresIn: '1h' },
    }),
    AuthModule,
    AuditLogsModule,
    UsersModule,
    AmenitiesModule,
    RoomTypesModule,
    PublicModule,
    RoomsModule,
    BookingsModule,
    CustomersModule,
    PaymentsModule,
    InvoicesModule,
    StaffModule,
    DashboardModule,
    IssuesModule,
    TasksModule,
    ProfileModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
