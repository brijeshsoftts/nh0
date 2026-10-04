import { PrismaService } from '../../prisma/prisma.service';
import { UserDetails } from './users.types';
export declare class UsersService {
    private readonly prismaService;
    constructor(prismaService: PrismaService);
    getOne(userId: string): Promise<UserDetails>;
}
