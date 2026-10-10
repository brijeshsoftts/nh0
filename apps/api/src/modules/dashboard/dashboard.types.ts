import type {
  BookingStatus,
  InvoiceStatus,
  IssuePriority,
  PaymentStatus,
  TaskStatus,
  TaskType,
} from '../../types/prisma.types';

export type ArrivalItem = {
  bookingId: string;
  bookingReference: string;
  customerName: string;
  roomTypeName: string;
  roomNumber: string | null;
  checkIn: string;
  bookingStatus: BookingStatus;
};

export type DepartureItem = {
  bookingId: string;
  bookingReference: string;
  customerName: string;
  roomTypeName: string;
  roomNumber: string | null;
  checkOut: string;
  paymentStatus: PaymentStatus;
  outstandingBalance: number;
};

export type Stays = {
  date: string;
  arrivals: {
    items: ArrivalItem[];
    total: number;
  };
  departures: {
    items: DepartureItem[];
    total: number;
  };
};

export type TaskItem = {
  taskId: string;
  taskType: TaskType;
  roomNumber: string;
  roomName: string | null;
  priority: IssuePriority | null;
  due: string;
  status: TaskStatus;
};

export type DashboardPaymentItem = {
  invoiceId: string;
  bookingId: string;
  bookingReference: string;
  guestName: string;
  total: number;
  due: number;
  status: InvoiceStatus;
};

export type DashboardPayments = {
  items: DashboardPaymentItem[];
  total: number;
};
