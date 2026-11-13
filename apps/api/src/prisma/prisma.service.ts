import {
  Injectable,
  Logger,
  OnModuleDestroy,
  OnModuleInit,
} from '@nestjs/common';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';

import { env } from '../config';
import { Prisma, PrismaClient } from '../generated/prisma/client';

@Injectable()
export class PrismaService
  extends PrismaClient<
    Prisma.PrismaClientOptionsWithAdapter & {
      log: { emit: 'event'; level: 'query' }[];
    },
    'query'
  >
  implements OnModuleInit, OnModuleDestroy
{
  private readonly logger = new Logger(PrismaService.name);

  constructor() {
    const pool = new Pool({
      connectionString: process.env.DATABASE_URL,
      max: env.DATABASE_POOL_MAX,
      connectionTimeoutMillis: 15000,
      idleTimeoutMillis: 30000,
    });

    super({
      adapter: new PrismaPg(pool, {
        disposeExternalPool: true,
        onPoolError: (error) => {
          const code = 'code' in error ? String(error.code) : undefined;
          this.logger.error(
            `PostgreSQL pool error (${error.name}${code ? `, code=${code}` : ''})`,
          );
        },
      }),
      log: [{ emit: 'event', level: 'query' }],
    });

    pool.on('acquire', () => {
      if (pool.waitingCount > 0) {
        this.logger.warn(
          JSON.stringify({
            event: 'postgres_pool_waiting',
            total: pool.totalCount,
            idle: pool.idleCount,
            waiting: pool.waitingCount,
            max: pool.options.max,
          }),
        );
      }
    });

    this.$on('query', (event) => {
      if (event.duration >= 1000) {
        this.logger.warn(
          JSON.stringify({
            event: 'slow_prisma_query',
            durationMs: event.duration,
            poolTotal: pool.totalCount,
            poolIdle: pool.idleCount,
            poolWaiting: pool.waitingCount,
            poolMax: pool.options.max,
          }),
        );
      }
    });
  }

  async onModuleInit() {
    await this.$connect();
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }
}
