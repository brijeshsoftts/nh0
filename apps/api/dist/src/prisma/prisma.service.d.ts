import { PrismaClient } from '../types/prisma.types';
export declare class PrismaService extends PrismaClient {
    constructor();
    onModuleInit(): Promise<void>;
    onModuleDestroy(): Promise<void>;
}
