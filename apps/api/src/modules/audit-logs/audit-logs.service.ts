import { Injectable } from '@nestjs/common';

import { PrismaService } from '../../prisma/prisma.service';
import { ListResponse } from '../../types/api.types';
import { Prisma } from '../../types/prisma.types';

import { AuditLogsQueryDto } from './dto/audit-logs-query.dto';

const AUDIT_LOG_SELECT = {
  id: true,
  userId: true,
  action: true,
  entityType: true,
  entityId: true,
  oldValues: true,
  newValues: true,
  createdAt: true,
  user: {
    select: {
      id: true,
      fullName: true,
      email: true,
    },
  },
} satisfies Prisma.AuditLogSelect;

type AuditLogRecord = Prisma.AuditLogGetPayload<{
  select: typeof AUDIT_LOG_SELECT;
}>;

@Injectable()
export class AuditLogsService {
  constructor(private readonly prismaService: PrismaService) {}

  async findAll(
    query: AuditLogsQueryDto,
  ): Promise<ListResponse<AuditLogRecord>> {
    const { search, entityType, page, limit } = query;
    const where: Prisma.AuditLogWhereInput = {
      ...(entityType && { entityType }),
      ...(search && {
        OR: [
          { action: { contains: search, mode: 'insensitive' } },
          { entityType: { contains: search, mode: 'insensitive' } },
          { entityId: { contains: search, mode: 'insensitive' } },
          {
            user: {
              is: {
                OR: [
                  { fullName: { contains: search, mode: 'insensitive' } },
                  { email: { contains: search, mode: 'insensitive' } },
                ],
              },
            },
          },
        ],
      }),
    };

    const [data, total] = await this.prismaService.$transaction([
      this.prismaService.auditLog.findMany({
        where,
        skip: (page - 1) * limit,
        take: limit,
        orderBy: [{ createdAt: 'desc' }, { id: 'desc' }],
        select: AUDIT_LOG_SELECT,
      }),
      this.prismaService.auditLog.count({ where }),
    ]);

    return {
      data,
      meta: { page, limit, total },
    };
  }
}
