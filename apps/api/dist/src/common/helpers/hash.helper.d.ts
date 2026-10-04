export declare const hashPassword: (str: string) => Promise<string>;
export declare const comparePassword: (raw: string, hashedStr: string) => Promise<boolean>;
export declare const generateRandomStr: (length?: number) => string;
export declare const hashRandomStr: (token: string) => string;
