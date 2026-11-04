import { z } from 'zod';

import 'dotenv/config';

const normalizedNodeEnv = z
  .string()
  .trim()
  .transform((value) => value.toLowerCase())
  .pipe(z.enum(['development', 'production']));

const corsOriginSchema = z
  .string()
  .transform((value) =>
    value
      .split(',')
      .map((item) => item.trim())
      .filter(Boolean),
  )
  .pipe(z.array(z.string().url()));

const envSchema = z.object({
  NODE_ENV: normalizedNodeEnv.default('development'),
  PORT: z.coerce.number().default(3000),
  HOTEL_TIME_ZONE: z
    .string()
    .refine((timeZone) => {
      try {
        new Intl.DateTimeFormat('en', { timeZone });
        return true;
      } catch {
        return false;
      }
    }, 'HOTEL_TIME_ZONE must be a valid IANA timezone')
    .default('Asia/Kolkata'),
  CORS_ORIGIN: corsOriginSchema.default(['http://localhost:5173']),
  HOST_NAME: z.string().default('0.0.0.0'),
  JWT_ACCESS_SECRET: z.string().min(32),
  DATABASE_URL: z.string().url(),
  APPWRITE_ENDPOINT: z.string().url(),
  APPWRITE_PROJECT_ID: z.string(),
  APPWRITE_API_KEY: z.string(),
  APPWRITE_BUCKET_ID: z.string(),
  APPWRITE_BUCKET_NAME: z.string(),
  EMAIL_USER: z.string(),
  EMAIL_PASS: z.string(),
  RAZORPAY_KEY_ID: z.string(),
  RAZORPAY_KEY_SECRET: z.string().trim().min(1),
  RAZORPAY_WEBHOOK_SECRET: z.string().min(1),
});

export type Env = z.infer<typeof envSchema>;

const parsed = envSchema.safeParse(process.env);

if (!parsed.success) {
  console.error('❌ Invalid environment variables:');
  console.error(z.prettifyError(parsed.error));
  process.exit(1);
}

export const env = parsed.data;
