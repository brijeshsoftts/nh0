import { z } from 'zod';
import 'dotenv/config';
declare const envSchema: z.ZodObject<{
    NODE_ENV: z.ZodDefault<z.ZodEnum<{
        development: "development";
        production: "production";
    }>>;
    PORT: z.ZodDefault<z.ZodCoercedNumber<unknown>>;
    CORS_ORIGIN: z.ZodURL;
    HOST_NAME: z.ZodString;
    JWT_ACCESS_SECRET: z.ZodString;
    DATABASE_URL: z.ZodURL;
    APPWRITE_ENDPOINT: z.ZodURL;
    APPWRITE_PROJECT_ID: z.ZodString;
    APPWRITE_API_KEY: z.ZodString;
    APPWRITE_BUCKET_ID: z.ZodString;
    APPWRITE_BUCKET_NAME: z.ZodString;
}, z.core.$strip>;
export type Env = z.infer<typeof envSchema>;
export declare const env: {
    NODE_ENV: "development" | "production";
    PORT: number;
    CORS_ORIGIN: string;
    HOST_NAME: string;
    JWT_ACCESS_SECRET: string;
    DATABASE_URL: string;
    APPWRITE_ENDPOINT: string;
    APPWRITE_PROJECT_ID: string;
    APPWRITE_API_KEY: string;
    APPWRITE_BUCKET_ID: string;
    APPWRITE_BUCKET_NAME: string;
};
export {};
