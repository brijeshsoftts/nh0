import { JwtService } from '@nestjs/jwt';
import type { Request, Response } from 'express';
import { PrismaService } from '../../prisma/prisma.service';
import { LoginDto } from './dto/login.dto';
export declare class AuthService {
    private readonly prismaService;
    private readonly jwtService;
    constructor(prismaService: PrismaService, jwtService: JwtService);
    login(dto: LoginDto, res: Response): Promise<void>;
    logout(userId: string, req: Request, res: Response): Promise<void>;
    refresh(req: Request, res: Response): Promise<void>;
    private generateTokens;
}
