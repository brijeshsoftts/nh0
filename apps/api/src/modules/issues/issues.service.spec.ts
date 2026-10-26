import {
  BadRequestException,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';

import type { PrismaService } from '../../prisma/prisma.service';
import { IssuePriority, IssueStatus, UserRole } from '../../types/prisma.types';

import { IssuesService } from './issues.service';

jest.mock('../../types/prisma.types', () => ({
  BookingStatus: { CHECKED_IN: 'CHECKED_IN' },
  IssuePriority: {
    LOW: 'LOW',
    MEDIUM: 'MEDIUM',
    HIGH: 'HIGH',
    URGENT: 'URGENT',
  },
  IssueStatus: {
    OPEN: 'OPEN',
    IN_PROGRESS: 'IN_PROGRESS',
    COMPLETED: 'COMPLETED',
    RESOLVED: 'RESOLVED',
    CANCELLED: 'CANCELLED',
  },
  UserRole: { CUSTOMER: 'CUSTOMER', MANAGER: 'MANAGER' },
}));
jest.mock('../../prisma/prisma.service', () => ({
  PrismaService: class PrismaService {},
}));

const issueRecord = (overrides: Record<string, unknown> = {}) =>
  ({
    id: 'issue-id',
    reference: 'ISS-1',
    title: 'Leaking tap',
    description: 'The bathroom tap is leaking.',
    category: 'PLUMBING',
    priority: IssuePriority.HIGH,
    status: IssueStatus.OPEN,
    reportedAt: new Date('2026-10-01T10:00:00.000Z'),
    startedAt: null,
    completedAt: null,
    resolvedAt: null,
    createdAt: new Date('2026-10-01T10:00:00.000Z'),
    updatedAt: new Date('2026-10-01T10:00:00.000Z'),
    room: { id: 'room-id', roomNumber: '101', name: 'Room 101', floor: 1 },
    reporter: { id: 'customer-id', fullName: 'Customer Name' },
    assignee: null,
    image: null,
    ...overrides,
  }) as never;

function createService() {
  const issueModel = {
    findFirst: jest.fn(),
    findUnique: jest.fn(),
    updateMany: jest.fn(),
  };
  const transactionClient = { issue: issueModel };
  const prismaService = {
    issue: issueModel,
    $transaction: jest.fn(
      (
        operation: (transaction: typeof transactionClient) => Promise<unknown>,
      ) => operation(transactionClient),
    ),
  } as unknown as PrismaService;

  return { service: new IssuesService(prismaService), issueModel };
}

describe('IssuesService', () => {
  it('limits customer detail lookup to issues reported by that customer', async () => {
    const { service, issueModel } = createService();
    issueModel.findFirst.mockResolvedValue(null);

    await expect(
      service.findOne('issue-id', 'customer-id', UserRole.CUSTOMER),
    ).rejects.toBeInstanceOf(NotFoundException);
    expect(issueModel.findFirst).toHaveBeenCalledWith(
      expect.objectContaining({
        where: { id: 'issue-id', reportedById: 'customer-id' },
      }),
    );
  });

  it('updates an issue and returns the persisted details', async () => {
    const { service, issueModel } = createService();
    issueModel.findUnique
      .mockResolvedValueOnce({
        status: IssueStatus.OPEN,
        startedAt: null,
        completedAt: null,
        resolvedAt: null,
      })
      .mockResolvedValueOnce(issueRecord({ priority: IssuePriority.URGENT }));
    issueModel.updateMany.mockResolvedValue({ count: 1 });

    const result = await service.update('issue-id', {
      priority: IssuePriority.URGENT,
    });

    expect(result.priority).toBe(IssuePriority.URGENT);
    expect(issueModel.updateMany).toHaveBeenCalledWith(
      expect.objectContaining({
        where: { id: 'issue-id', status: IssueStatus.OPEN },
        data: { priority: IssuePriority.URGENT },
      }),
    );
  });

  it('rejects a status update that does not change the current status', async () => {
    const { service, issueModel } = createService();
    issueModel.findUnique.mockResolvedValue({
      status: IssueStatus.OPEN,
      startedAt: null,
      completedAt: null,
      resolvedAt: null,
    });

    await expect(
      service.update('issue-id', { status: IssueStatus.OPEN }),
    ).rejects.toBeInstanceOf(BadRequestException);
    expect(issueModel.updateMany).not.toHaveBeenCalled();
  });

  it('rejects an update if the issue status changed concurrently', async () => {
    const { service, issueModel } = createService();
    issueModel.findUnique.mockResolvedValue({
      status: IssueStatus.OPEN,
      startedAt: null,
      completedAt: null,
      resolvedAt: null,
    });
    issueModel.updateMany.mockResolvedValue({ count: 0 });

    await expect(
      service.update('issue-id', { priority: IssuePriority.HIGH }),
    ).rejects.toBeInstanceOf(ConflictException);
  });
});
