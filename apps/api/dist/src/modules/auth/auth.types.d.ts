import { Category } from '../../types/prisma.types';
export type JwtPayload = {
    sub: string;
    email: string;
    role: string;
    category?: Category;
};
