jest.mock('@prisma/adapter-pg', () => ({
  PrismaPg: jest
    .fn()
    .mockImplementation((pool, options) => ({ pool, options })),
}));

jest.mock('pg', () => ({
  Pool: jest.fn().mockImplementation((options) => ({
    options,
    totalCount: 0,
    idleCount: 0,
    waitingCount: 0,
    on: jest.fn(),
  })),
}));

jest.mock('../config', () => ({ env: { DATABASE_POOL_MAX: 4 } }));

jest.mock('../generated/prisma/client', () => ({
  PrismaClient: class {
    $connect = jest.fn();
    $disconnect = jest.fn();
    $on = jest.fn();

    constructor(public readonly options: unknown) {}
  },
}));

import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';

import { PrismaService } from './prisma.service';

describe('PrismaService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    process.env.DATABASE_URL =
      'postgresql://test:test@localhost:5432/nivara_test';
  });

  it('uses the configured pool and closes it through the adapter lifecycle', async () => {
    const prisma = new PrismaService();
    const pool = (Pool as jest.Mock).mock.results[0].value;
    const adapterOptions = (PrismaPg as jest.Mock).mock.calls[0][1];
    const connect = Reflect.get(prisma, '$connect') as jest.Mock;
    const disconnect = Reflect.get(prisma, '$disconnect') as jest.Mock;
    const subscribe = Reflect.get(prisma, '$on') as jest.Mock;
    const onPoolEvent = Reflect.get(pool, 'on') as jest.Mock;

    expect(Pool).toHaveBeenCalledWith({
      connectionString: process.env.DATABASE_URL,
      max: 4,
      connectionTimeoutMillis: 15000,
      idleTimeoutMillis: 30000,
    });
    expect(PrismaPg).toHaveBeenCalledWith(
      pool,
      expect.objectContaining({ disposeExternalPool: true }),
    );
    expect(subscribe).toHaveBeenCalledWith('query', expect.any(Function));

    await prisma.onModuleInit();
    await prisma.onModuleDestroy();

    expect(connect).toHaveBeenCalledTimes(1);
    expect(disconnect).toHaveBeenCalledTimes(1);
    expect(onPoolEvent).toHaveBeenCalledWith('acquire', expect.any(Function));
    expect(adapterOptions.onPoolError).toEqual(expect.any(Function));
  });
});
