jest.mock('../../common/helpers', () => ({ hashPassword: jest.fn() }));
jest.mock('../../config', () => ({ uploadFile: jest.fn() }));
jest.mock('../../prisma/prisma.service', () => ({
  PrismaService: class PrismaService {},
}));
jest.mock('../../types/prisma.types', () => ({
  BookingStatus: {
    PENDING: 'PENDING',
    CONFIRMED: 'CONFIRMED',
    CHECKED_IN: 'CHECKED_IN',
  },
  InvoiceStatus: {
    UNPAID: 'UNPAID',
    PARTIALLY_PAID: 'PARTIALLY_PAID',
    PAID: 'PAID',
    REFUNDED: 'REFUNDED',
  },
  PaymentStatus: {
    PENDING: 'PENDING',
    COMPLETED: 'COMPLETED',
    FAILED: 'FAILED',
    REFUNDED: 'REFUNDED',
  },
  UserRole: { CUSTOMER: 'CUSTOMER' },
}));

import { NotFoundException } from '@nestjs/common';

import { PrismaService } from '../../prisma/prisma.service';
import { UserRole } from '../../types/prisma.types';
import { PaymentsQueryDto } from '../payments/dto/payments-query.dto';

import { CustomersService } from './customers.service';

describe('CustomersService.getPayments', () => {
  const findCustomer = jest.fn();
  const findPayments = jest.fn();
  const countPayments = jest.fn();
  const transaction = jest.fn((queries: readonly Promise<unknown>[]) =>
    Promise.all(queries),
  );

  const prismaService = {
    user: { findFirst: findCustomer },
    payment: { findMany: findPayments, count: countPayments },
    $transaction: transaction,
  } as unknown as PrismaService;

  const service = new CustomersService(prismaService);

  beforeEach(() => {
    jest.clearAllMocks();
    findCustomer.mockResolvedValue({ id: 'customer-user-1', fullName: 'Asha' });
    findPayments.mockResolvedValue([]);
    countPayments.mockResolvedValue(0);
  });

  it('returns all payment attempts linked through the customer booking', async () => {
    findPayments.mockResolvedValue([
      {
        id: 'payment-pending',
        bookingId: 'booking-1',
        paymentReference: 'PAY-PENDING',
        transactionId: null,
        amount: 8000,
        currency: 'INR',
        paymentMethod: 'ONLINE',
        paymentStatus: 'PENDING',
        paidAt: null,
        createdAt: new Date('2026-10-28T11:00:00.000Z'),
        invoice: {
          invoiceNumber: 'INV-1',
          booking: { bookingReference: 'BK-1' },
        },
        recorder: null,
      },
      {
        id: 'payment-complete',
        bookingId: 'booking-1',
        paymentReference: 'PAY-COMPLETE',
        transactionId: 'gateway-ref-1',
        amount: 8000,
        currency: 'INR',
        paymentMethod: 'ONLINE',
        paymentStatus: 'COMPLETED',
        paidAt: new Date('2026-10-28T10:00:00.000Z'),
        createdAt: new Date('2026-10-28T09:00:00.000Z'),
        invoice: {
          invoiceNumber: 'INV-1',
          booking: { bookingReference: 'BK-1' },
        },
        recorder: { fullName: 'Reception One' },
      },
      {
        id: 'payment-failed',
        bookingId: 'booking-1',
        paymentReference: 'PAY-FAILED',
        transactionId: 'gateway-ref-failed',
        amount: 8000,
        currency: 'INR',
        paymentMethod: 'ONLINE',
        paymentStatus: 'FAILED',
        paidAt: null,
        createdAt: new Date('2026-10-28T08:00:00.000Z'),
        invoice: {
          invoiceNumber: 'INV-1',
          booking: { bookingReference: 'BK-1' },
        },
        recorder: null,
      },
    ]);
    countPayments.mockResolvedValue(3);

    const query: PaymentsQueryDto = { page: 1, limit: 10 };
    const result = await service.getPayments('customer-user-1', query);

    expect(findCustomer).toHaveBeenCalledWith({
      where: {
        id: 'customer-user-1',
        role: UserRole.CUSTOMER,
        softDeletedAt: null,
      },
      select: { id: true, fullName: true },
    });
    expect(findPayments).toHaveBeenCalledWith(
      expect.objectContaining({
        where: {
          invoice: {
            is: { booking: { is: { customerId: 'customer-user-1' } } },
          },
        },
        skip: 0,
        take: 10,
        orderBy: [{ createdAt: 'desc' }, { id: 'desc' }],
      }),
    );
    expect(result.data).toHaveLength(3);
    expect(result.data.map((payment) => payment.paymentStatus)).toEqual([
      'PENDING',
      'COMPLETED',
      'FAILED',
    ]);
    expect(result.data[0]).toMatchObject({
      paymentReference: 'PAY-PENDING',
      bookingReference: 'BK-1',
      invoiceNumber: 'INV-1',
      transactionId: null,
      recordedByName: null,
    });
    expect(result.data[1].recordedByName).toBe('Reception One');
    expect(result.meta).toEqual({ page: 1, limit: 10, total: 3 });
  });

  it('rejects IDs that are not active customer accounts', async () => {
    findCustomer.mockResolvedValue(null);

    await expect(
      service.getPayments('not-a-customer', {
        page: 1,
        limit: 10,
      }),
    ).rejects.toBeInstanceOf(NotFoundException);
    expect(findPayments).not.toHaveBeenCalled();
  });
});
