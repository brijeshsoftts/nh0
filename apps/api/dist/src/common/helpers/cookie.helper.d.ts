import type { Response } from 'express';
export declare function setCookies(response: Response, accessToken: string, refreshToken?: string): void;
export declare function clearCookies(response: Response): void;
