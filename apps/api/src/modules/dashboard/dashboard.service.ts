import { ForbiddenException, Injectable } from '@nestjs/common';

import { PrismaService } from '../../prisma/prisma.service';
import {
  BookingStatus,
  Category,
  HousekeepingStatus,
  InvoiceStatus,
  IssueStatus,
  OccupancyStatus,
  PaymentStatus,
  TaskStatus,
  UserRole,
} from '../../types/prisma.types';

import { PaymentsQueryDto } from './dto/payments-query.dto';
import { StaysQueryDto } from './dto/stays-query.dto';
import {
  CustomerNextBooking,
  DashboardPayments,
  DashboardStat,
  RoomStatusCount,
  Stays,
  TaskItem,
} from './dashboard.types';

type RevenueTrendPoint = { date: string; value: number };
type BookingStatusCount = { status: BookingStatus; count: number };

@Injectable()
export class DashboardService {
  constructor(private readonly prismaService: PrismaService) {}

  async getStats(
    userId: string,
    role: UserRole,
    category?: Category,
  ): Promise<DashboardStat[]> {
    if (role === UserRole.ADMIN || role === UserRole.MANAGER) {
      return this.adminStats();
    }

    if (role === UserRole.STAFF && category === Category.RECEPTIONIST) {
      return this.receptionistStats();
    }

    if (role === UserRole.STAFF && category === Category.HOUSEKEEPER) {
      return this.housekeeperStats(userId);
    }

    if (role === UserRole.CUSTOMER) {
      return this.customerStats(userId);
    }

    throw new ForbiddenException('Access denied');
  }

  async getNextBooking(userId: string): Promise<CustomerNextBooking | null> {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const booking = await this.prismaService.booking.findFirst({
      where: {
        customerId: userId,
        status: { in: [BookingStatus.PENDING, BookingStatus.CONFIRMED] },
        checkInDate: { gte: today },
      },
      orderBy: [{ checkInDate: 'asc' }, { createdAt: 'desc' }],
      select: {
        bookingReference: true,
        status: true,
        checkInDate: true,
        checkOutDate: true,
        bookingRoom: {
          select: {
            roomType: { select: { name: true } },
          },
        },
      },
    });

    if (!booking) return null;

    return {
      bookingReference: booking.bookingReference,
      status: booking.status,
      checkInDate: booking.checkInDate.toISOString(),
      checkOutDate: booking.checkOutDate.toISOString(),
      roomTypeName: booking.bookingRoom?.roomType.name ?? null,
    };
  }

  async getRevenueTrend(
    range: '7d' | '14d' | '28d',
  ): Promise<RevenueTrendPoint[]> {
    const days = Number.parseInt(range, 10);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const startDate = new Date(today);
    startDate.setDate(startDate.getDate() - days + 1);
    const endDate = new Date(today);
    endDate.setDate(endDate.getDate() + 1);

    const revenueByDay = await this.prismaService.$queryRaw<
      { date: string; value: bigint }[]
    >`
      SELECT TO_CHAR(DATE_TRUNC('day', "paidAt"), 'YYYY-MM-DD') AS "date",
        SUM("amount")::bigint AS "value"
      FROM "Payment"
      WHERE "paymentStatus" = ${PaymentStatus.COMPLETED}
        AND "paidAt" >= ${startDate}
        AND "paidAt" < ${endDate}
      GROUP BY DATE_TRUNC('day', "paidAt")
      ORDER BY DATE_TRUNC('day', "paidAt")
    `;

    const valuesByDate = new Map(
      revenueByDay.map(({ date, value }) => [date, Number(value)]),
    );
    return Array.from({ length: days }, (_, index) => {
      const date = new Date(startDate);
      date.setDate(startDate.getDate() + index);
      const dateKey = [
        date.getFullYear(),
        String(date.getMonth() + 1).padStart(2, '0'),
        String(date.getDate()).padStart(2, '0'),
      ].join('-');

      return {
        date: String(date.getDate()),
        value: valuesByDate.get(dateKey) ?? 0,
      };
    });
  }

  async getStays(query: StaysQueryDto): Promise<Stays> {
    const selectedDate =
      query.date === 'today' ? new Date() : new Date(`${query.date}T00:00:00`);
    const startDate = new Date(selectedDate);
    startDate.setHours(0, 0, 0, 0);
    const endDate = new Date(startDate);
    endDate.setDate(endDate.getDate() + 1);
    const arrivalWhere = {
      checkInDate: { gte: startDate, lt: endDate },
      status: { in: [BookingStatus.PENDING, BookingStatus.CONFIRMED] },
    };
    const departureWhere = {
      checkOutDate: { gte: startDate, lt: endDate },
      status: BookingStatus.CHECKED_IN,
    };

    const [arrivalBookings, arrivalsTotal, departureBookings, departuresTotal] =
      await this.prismaService.$transaction([
        this.prismaService.booking.findMany({
          where: arrivalWhere,
          take: query.limit,
          orderBy: { checkInDate: 'asc' },
          select: {
            id: true,
            bookingReference: true,
            checkInDate: true,
            status: true,
            guestName: true,
            customer: { select: { fullName: true } },
            bookingRoom: {
              select: {
                roomType: { select: { name: true } },
                assignedRoom: { select: { roomNumber: true } },
              },
            },
          },
        }),
        this.prismaService.booking.count({ where: arrivalWhere }),
        this.prismaService.booking.findMany({
          where: departureWhere,
          take: query.limit,
          orderBy: { checkOutDate: 'asc' },
          select: {
            id: true,
            bookingReference: true,
            checkOutDate: true,
            guestName: true,
            customer: { select: { fullName: true } },
            bookingRoom: {
              select: {
                roomType: { select: { name: true } },
                assignedRoom: { select: { roomNumber: true } },
              },
            },
            invoice: {
              select: {
                totalAmount: true,
                status: true,
                payments: {
                  orderBy: { createdAt: 'desc' },
                  take: 1,
                  select: { paymentStatus: true },
                },
              },
            },
          },
        }),
        this.prismaService.booking.count({ where: departureWhere }),
      ]);

    const paymentsByBooking = departureBookings.length
      ? await this.prismaService.payment.groupBy({
          by: ['bookingId'],
          where: {
            bookingId: { in: departureBookings.map(({ id }) => id) },
            paymentStatus: PaymentStatus.COMPLETED,
          },
          _sum: { amount: true },
        })
      : [];
    const paidAmountByBooking = new Map(
      paymentsByBooking.map(({ bookingId, _sum }) => [
        bookingId,
        _sum.amount ?? 0,
      ]),
    );

    return {
      date:
        query.date === 'today'
          ? [
              startDate.getFullYear(),
              String(startDate.getMonth() + 1).padStart(2, '0'),
              String(startDate.getDate()).padStart(2, '0'),
            ].join('-')
          : query.date,
      arrivals: {
        items: arrivalBookings.map((booking) => ({
          bookingId: booking.id,
          bookingReference: booking.bookingReference,
          customerName:
            booking.customer?.fullName ?? booking.guestName ?? 'Guest',
          roomTypeName: booking.bookingRoom?.roomType.name ?? 'Unassigned',
          roomNumber: booking.bookingRoom?.assignedRoom?.roomNumber ?? null,
          checkIn: booking.checkInDate.toISOString(),
          bookingStatus: booking.status,
        })),
        total: arrivalsTotal,
      },
      departures: {
        items: departureBookings.map((booking) => {
          const outstandingBalance =
            booking.invoice?.status === InvoiceStatus.UNPAID ||
            booking.invoice?.status === InvoiceStatus.PARTIALLY_PAID
              ? Math.max(
                  0,
                  booking.invoice.totalAmount -
                    (paidAmountByBooking.get(booking.id) ?? 0),
                )
              : 0;

          return {
            bookingId: booking.id,
            bookingReference: booking.bookingReference,
            customerName:
              booking.customer?.fullName ?? booking.guestName ?? 'Guest',
            roomTypeName: booking.bookingRoom?.roomType.name ?? 'Unassigned',
            roomNumber: booking.bookingRoom?.assignedRoom?.roomNumber ?? null,
            checkOut: booking.checkOutDate.toISOString(),
            paymentStatus:
              booking.invoice?.payments[0]?.paymentStatus ??
              PaymentStatus.PENDING,
            outstandingBalance,
          };
        }),
        total: departuresTotal,
      },
    };
  }

  async getBookingStatus(
    range: 'all' | '7d' | '14d' | '28d',
  ): Promise<BookingStatusCount[]> {
    const where =
      range === 'all'
        ? undefined
        : (() => {
            const today = new Date();
            today.setHours(0, 0, 0, 0);
            const startDate = new Date(today);
            startDate.setDate(
              startDate.getDate() - Number.parseInt(range, 10) + 1,
            );
            const endDate = new Date(today);
            endDate.setDate(endDate.getDate() + 1);
            return { createdAt: { gte: startDate, lt: endDate } };
          })();
    const bookingCounts = await this.prismaService.booking.groupBy({
      by: ['status'],
      where,
      _count: { _all: true },
    });
    const countByStatus = new Map(
      bookingCounts.map(({ status, _count }) => [status, _count._all]),
    );

    return Object.values(BookingStatus).map((status) => ({
      status,
      count: countByStatus.get(status) ?? 0,
    }));
  }

  async getRoomStatus(): Promise<RoomStatusCount[]> {
    const roomCounts = await this.prismaService.room.groupBy({
      by: ['occupancyStatus'],
      where: { isActive: true },
      _count: { _all: true },
    });
    const countByStatus = new Map(
      roomCounts.map(({ occupancyStatus, _count }) => [
        occupancyStatus,
        _count._all,
      ]),
    );

    return Object.values(OccupancyStatus).map((status) => ({
      status,
      count: countByStatus.get(status) ?? 0,
    }));
  }

  async getTasks(userId: string): Promise<TaskItem[]> {
    const staff = await this.prismaService.staff.findUnique({
      where: { userId },
      select: { category: true },
    });

    if (staff?.category !== Category.HOUSEKEEPER) {
      throw new ForbiddenException('Access denied');
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    const tasks = await this.prismaService.housekeepingTask.findMany({
      where: {
        assignedTo: userId,
        scheduledDate: { gte: today, lt: tomorrow },
      },
      orderBy: { scheduledDate: 'asc' },
      select: {
        id: true,
        taskType: true,
        status: true,
        scheduledDate: true,
        room: {
          select: {
            roomNumber: true,
            name: true,
            issues: {
              where: {
                status: { in: [IssueStatus.OPEN, IssueStatus.IN_PROGRESS] },
              },
              orderBy: { priority: 'desc' },
              take: 1,
              select: { priority: true },
            },
          },
        },
      },
    });

    return tasks.map((task) => ({
      taskId: task.id,
      taskType: task.taskType,
      roomNumber: task.room.roomNumber,
      roomName: task.room.name,
      priority: task.room.issues[0]?.priority ?? null,
      due: task.scheduledDate.toISOString(),
      status: task.status,
    }));
  }

  async getPaymentsRequiringAttention(
    userId: string,
    query: PaymentsQueryDto,
  ): Promise<DashboardPayments> {
    const staff = await this.prismaService.staff.findUnique({
      where: { userId },
      select: { category: true },
    });

    if (staff?.category !== Category.RECEPTIONIST) {
      throw new ForbiddenException('Access denied');
    }

    const where = { status: { in: query.status } };
    const [invoices, total] = await this.prismaService.$transaction([
      this.prismaService.invoice.findMany({
        where,
        orderBy: { issuedAt: 'asc' },
        take: query.limit,
        select: {
          id: true,
          totalAmount: true,
          status: true,
          booking: {
            select: {
              id: true,
              bookingReference: true,
              guestName: true,
              customer: { select: { fullName: true } },
            },
          },
        },
      }),
      this.prismaService.invoice.count({ where }),
    ]);

    const completedPayments = invoices.length
      ? await this.prismaService.payment.groupBy({
          by: ['invoiceId'],
          where: {
            invoiceId: { in: invoices.map(({ id }) => id) },
            paymentStatus: PaymentStatus.COMPLETED,
          },
          _sum: { amount: true },
        })
      : [];
    const paidAmountByInvoice = new Map(
      completedPayments.map(({ invoiceId, _sum }) => [
        invoiceId,
        _sum.amount ?? 0,
      ]),
    );

    return {
      items: invoices.map((invoice) => ({
        invoiceId: invoice.id,
        bookingId: invoice.booking.id,
        bookingReference: invoice.booking.bookingReference,
        guestName:
          invoice.booking.customer?.fullName ??
          invoice.booking.guestName ??
          'Guest',
        total: invoice.totalAmount,
        due: Math.max(
          0,
          invoice.totalAmount - (paidAmountByInvoice.get(invoice.id) ?? 0),
        ),
        status: invoice.status,
      })),
      total,
    };
  }

  private async housekeeperStats(userId: string): Promise<DashboardStat[]> {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    const [pendingTasks, inProgressTasks, completedToday, overdueTasks] =
      await Promise.all([
        this.prismaService.housekeepingTask.count({
          where: {
            assignedTo: userId,
            status: TaskStatus.PENDING,
          },
        }),
        this.prismaService.housekeepingTask.count({
          where: {
            assignedTo: userId,
            status: TaskStatus.IN_PROGRESS,
          },
        }),
        this.prismaService.housekeepingTask.count({
          where: {
            assignedTo: userId,
            status: TaskStatus.COMPLETED,
            completedAt: { gte: today, lt: tomorrow },
          },
        }),
        this.prismaService.housekeepingTask.count({
          where: {
            assignedTo: userId,
            status: { in: [TaskStatus.PENDING, TaskStatus.IN_PROGRESS] },
            scheduledDate: { lt: today },
          },
        }),
      ]);

    return [
      {
        label: 'My pending tasks',
        value: pendingTasks,
        link: '/dashboard/tasks?status=PENDING',
        icon: 'ClipboardList',
      },
      {
        label: 'In progress',
        value: inProgressTasks,
        link: '/dashboard/tasks?status=IN_PROGRESS',
        icon: 'LoaderCircle',
      },
      {
        label: 'Completed today',
        value: completedToday,
        link: '/dashboard/tasks?status=COMPLETED',
        icon: 'CircleCheck',
      },
      {
        label: 'Overdue tasks',
        value: overdueTasks,
        link: '/dashboard/tasks?status=PENDING',
        icon: 'CalendarOff',
      },
    ];
  }

  private async customerStats(userId: string): Promise<DashboardStat[]> {
    const now = new Date();
    const today = new Date(now);
    today.setHours(0, 0, 0, 0);
    const outstandingStatuses = [
      InvoiceStatus.UNPAID,
      InvoiceStatus.PARTIALLY_PAID,
    ];

    const [
      upcomingBookings,
      currentStay,
      outstandingInvoices,
      completedPayments,
      pastStays,
    ] = await Promise.all([
      this.prismaService.booking.count({
        where: {
          customerId: userId,
          status: BookingStatus.CONFIRMED,
          checkInDate: { gte: today },
        },
      }),
      this.prismaService.booking.findFirst({
        where: {
          customerId: userId,
          status: BookingStatus.CHECKED_IN,
        },
        orderBy: { checkedInAt: 'desc' },
        select: {
          bookingRoom: {
            select: {
              assignedRoom: { select: { roomNumber: true } },
            },
          },
        },
      }),
      this.prismaService.invoice.aggregate({
        where: {
          customerId: userId,
          status: { in: outstandingStatuses },
        },
        _sum: { totalAmount: true },
      }),
      this.prismaService.payment.aggregate({
        where: {
          customerId: userId,
          paymentStatus: PaymentStatus.COMPLETED,
          invoice: {
            is: {
              status: { in: outstandingStatuses },
            },
          },
        },
        _sum: { amount: true },
      }),
      this.prismaService.booking.count({
        where: {
          customerId: userId,
          status: BookingStatus.CHECKED_OUT,
        },
      }),
    ]);

    const outstandingBalance = Math.max(
      0,
      (outstandingInvoices._sum.totalAmount ?? 0) -
        (completedPayments._sum.amount ?? 0),
    );
    return [
      {
        label: 'Upcoming bookings',
        value: upcomingBookings,
        link: '/dashboard/bookings',
        icon: 'CalendarCheck',
      },
      {
        label: 'Active stay',
        value: currentStay ? 1 : 0,
        link: '/dashboard/bookings',
        icon: 'KeyRound',
      },
      {
        label: 'Pending balance (INR)',
        value: outstandingBalance,
        link: '/dashboard/invoices',
        icon: 'IndianRupee',
      },
      {
        label: 'Past bookings',
        value: pastStays,
        link: '/dashboard/bookings',
        icon: 'CalendarCheck',
      },
    ];
  }

  private async adminStats(): Promise<DashboardStat[]> {
    const now = new Date();
    const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);
    const nextMonth = new Date(now.getFullYear(), now.getMonth() + 1, 1);
    const [totalRooms, totalCustomers, totalStaff, monthlyRevenue] =
      await Promise.all([
        this.prismaService.room.count(),
        this.prismaService.user.count({
          where: { role: UserRole.CUSTOMER, softDeletedAt: null },
        }),
        this.prismaService.staff.count({
          where: { user: { is: { softDeletedAt: null } } },
        }),
        this.prismaService.payment.aggregate({
          where: {
            paymentStatus: PaymentStatus.COMPLETED,
            paidAt: { gte: monthStart, lt: nextMonth },
          },
          _sum: { amount: true },
        }),
      ]);

    return [
      {
        label: 'Total rooms',
        value: totalRooms,
        link: '/dashboard/rooms',
        icon: 'BedDouble',
      },
      {
        label: 'Total customers',
        value: totalCustomers,
        link: '/dashboard/customers',
        icon: 'Users',
      },
      {
        label: 'Total staff',
        value: totalStaff,
        link: '/dashboard/staff',
        icon: 'UserCheck',
      },
      {
        label: 'Revenue',
        value: monthlyRevenue._sum.amount ?? 0,
        link: '/dashboard/payments',
        icon: 'IndianRupee',
      },
    ];
  }

  private async receptionistStats(): Promise<DashboardStat[]> {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    const [arrivals, departures, availableRooms, pendingPayments] =
      await Promise.all([
        this.prismaService.booking.count({
          where: {
            checkInDate: { gte: today, lt: tomorrow },
            status: { in: [BookingStatus.PENDING, BookingStatus.CONFIRMED] },
          },
        }),
        this.prismaService.booking.count({
          where: {
            checkOutDate: { gte: today, lt: tomorrow },
            status: BookingStatus.CHECKED_IN,
          },
        }),
        this.prismaService.room.count({
          where: {
            isActive: true,
            occupancyStatus: OccupancyStatus.VACANT,
            housekeepingStatus: HousekeepingStatus.CLEAN,
          },
        }),
        this.prismaService.booking.count({
          where: {
            invoice: {
              is: {
                status: {
                  in: [InvoiceStatus.UNPAID, InvoiceStatus.PARTIALLY_PAID],
                },
              },
            },
          },
        }),
      ]);

    return [
      {
        label: 'Expected arrivals',
        value: arrivals,
        link: '/dashboard/bookings',
        icon: 'LogIn',
      },
      {
        label: 'Expected departures',
        value: departures,
        link: '/dashboard/bookings',
        icon: 'LogOut',
      },
      {
        label: 'Available rooms',
        value: availableRooms,
        link: '/dashboard/rooms?occupancyStatus=VACANT&housekeepingStatus=CLEAN&isActive=true',
        icon: 'BedDouble',
      },
      {
        label: 'Pending payments',
        value: pendingPayments,
        link: '/dashboard/payments',
        icon: 'CreditCard',
      },
    ];
  }
}
