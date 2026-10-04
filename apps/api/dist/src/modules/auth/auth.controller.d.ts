import type { Request, Response } from 'express';
import { LoginDto } from './dto/login.dto';
import { AuthService } from './auth.service';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    login(body: LoginDto, res: Response): Promise<import("../../types/api.types").ApiMessageResponse>;
    logout(userId: string, req: Request, res: Response): Promise<import("../../types/api.types").ApiMessageResponse>;
    refresh(req: Request, res: Response): Promise<import("../../types/api.types").ApiMessageResponse>;
}
