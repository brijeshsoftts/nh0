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
import { StatItem } from '../../types/shared.types';

import { PaymentsQueryDto } from './dto/payments-query.dto';
import { StaysQueryDto } from './dto/stays-query.dto';
import { DashboardPayments, Stays, TaskItem } from './dashboard.types';

type RevenueTrendPoint = { date: string; value: number };
type BookingStatusCount = { status: BookingStatus; count: number };

@Injectable()
export class DashboardService {
  constructor(private readonly prismaService: PrismaService) {}

  async getStats(
    userId: string,
    role: UserRole,
    category?: Category,
  ): Promise<StatItem[]> {
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
          customerName: booking.customer.fullName,
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
            customerName: booking.customer.fullName,
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

  async getBookingStatus(): Promise<BookingStatusCount[]> {
    const bookingCounts = await this.prismaService.booking.groupBy({
      by: ['status'],
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
        guestName: invoice.booking.customer.fullName,
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

  private async housekeeperStats(userId: string): Promise<StatItem[]> {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    const [myTasksToday, pendingTasks, inProgressTasks, completedToday] =
      await Promise.all([
        this.prismaService.housekeepingTask.count({
          where: {
            assignedTo: userId,
            scheduledDate: { gte: today, lt: tomorrow },
          },
        }),
        this.prismaService.housekeepingTask.count({
          where: {
            assignedTo: userId,
            scheduledDate: { gte: today, lt: tomorrow },
            status: TaskStatus.PENDING,
          },
        }),
        this.prismaService.housekeepingTask.count({
          where: {
            assignedTo: userId,
            scheduledDate: { gte: today, lt: tomorrow },
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
      ]);

    return [
      {
        id: 'my-tasks-today',
        title: 'My tasks today',
        value: String(myTasksToday),
        description: 'Tasks assigned to me',
        icon: 'ClipboardList',
        tone: 'gold',
      },
      {
        id: 'pending-tasks',
        title: 'Pending',
        value: String(pendingTasks),
        description: 'Not started',
        icon: 'Clock',
        tone: 'rose',
      },
      {
        id: 'in-progress-tasks',
        title: 'In progress',
        value: String(inProgressTasks),
        description: 'Currently working on',
        icon: 'LoaderCircle',
        tone: 'sky',
      },
      {
        id: 'completed-today',
        title: 'Completed today',
        value: String(completedToday),
        description: 'Tasks finished today',
        icon: 'CircleCheck',
        tone: 'emerald',
      },
    ];
  }

  private async customerStats(userId: string): Promise<StatItem[]> {
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
    const formatAmount = (amount: number) =>
      `₹${amount.toLocaleString('en-IN')}`;

    const stats: StatItem[] = [
      {
        id: 'upcoming-bookings',
        title: 'Upcoming bookings',
        value: String(upcomingBookings),
        description: 'Confirmed future stays',
        icon: 'CalendarCheck',
        tone: 'gold',
      },
    ];

    if (currentStay) {
      const roomNumber = currentStay.bookingRoom?.assignedRoom?.roomNumber;
      stats.push({
        id: 'current-stay',
        title: 'Current stay',
        value: roomNumber ? `Room ${roomNumber}` : 'Checked in',
        description: 'Currently checked in',
        icon: 'KeyRound',
        tone: 'emerald',
      });
    }

    stats.push(
      {
        id: 'outstanding-balance',
        title: 'Outstanding balance',
        value: formatAmount(outstandingBalance),
        description: 'Across eligible bookings',
        icon: 'IndianRupee',
        tone: 'rose',
      },
      {
        id: 'past-stays',
        title: 'Past stays',
        value: String(pastStays),
        description: 'Completed bookings',
        icon: 'History',
        tone: 'sky',
      },
    );

    return stats;
  }

  private async adminStats(): Promise<StatItem[]> {
    const now = new Date();
    const today = new Date(now);
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);
    const nextMonth = new Date(now.getFullYear(), now.getMonth() + 1, 1);

    const [activeRooms, occupiedRooms, arrivals, monthlyRevenue, openIssues] =
      await Promise.all([
        this.prismaService.room.count({ where: { isActive: true } }),
        this.prismaService.room.count({
          where: {
            isActive: true,
            occupancyStatus: OccupancyStatus.OCCUPIED,
          },
        }),
        this.prismaService.booking.count({
          where: {
            checkInDate: { gte: today, lt: tomorrow },
            status: { in: [BookingStatus.PENDING, BookingStatus.CONFIRMED] },
          },
        }),
        this.prismaService.payment.aggregate({
          where: {
            paymentStatus: PaymentStatus.COMPLETED,
            paidAt: { gte: monthStart, lt: nextMonth },
          },
          _sum: { amount: true },
        }),
        this.prismaService.issue.count({
          where: {
            status: { in: [IssueStatus.OPEN, IssueStatus.IN_PROGRESS] },
          },
        }),
      ]);

    const occupancyRate = activeRooms
      ? Math.round((occupiedRooms / activeRooms) * 100)
      : 0;
    const revenue = monthlyRevenue._sum.amount ?? 0;
    const formattedRevenue = new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      notation: 'compact',
      maximumFractionDigits: 1,
    }).format(revenue);

    return [
      {
        id: 'occupancy-rate',
        title: 'Occupancy rate',
        value: `${occupancyRate}%`,
        description: 'Occupied rooms ÷ active rooms',
        icon: 'BedDouble',
        tone: 'emerald',
      },
      {
        id: 'todays-arrivals',
        title: "Today's arrivals",
        value: String(arrivals),
        description: 'Expected check-ins',
        icon: 'LogIn',
        tone: 'gold',
      },
      {
        id: 'monthly-revenue',
        title: 'Revenue this month',
        value: formattedRevenue,
        description: 'Successful payments received',
        icon: 'IndianRupee',
        tone: 'teal',
      },
      {
        id: 'open-issues',
        title: 'Open issues',
        value: String(openIssues),
        description: 'Unresolved maintenance issues',
        icon: 'Wrench',
        tone: 'rose',
      },
    ];
  }

  private async receptionistStats(): Promise<StatItem[]> {
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
        id: 'expected-arrivals',
        title: 'Expected arrivals',
        value: String(arrivals),
        description: 'Bookings scheduled to check in today',
        icon: 'LogIn',
        tone: 'gold',
      },
      {
        id: 'expected-departures',
        title: 'Expected departures',
        value: String(departures),
        description: 'Bookings scheduled to check out today',
        icon: 'LogOut',
        tone: 'violet',
      },
      {
        id: 'available-rooms',
        title: 'Available rooms',
        value: String(availableRooms),
        description: 'Vacant, clean, active rooms',
        icon: 'BedDouble',
        link: 'rooms?occupancyStatus=VACANT&housekeepingStatus=CLEAN&isActive=true',
        tone: 'emerald',
      },
      {
        id: 'pending-payments',
        title: 'Pending payments',
        value: String(pendingPayments),
        description: 'Unpaid or partially paid bookings',
        icon: 'CreditCard',
        tone: 'rose',
      },
    ];
  }
}
