"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.env = void 0;
const zod_1 = require("zod");
require("dotenv/config");
const envSchema = zod_1.z.object({
    NODE_ENV: zod_1.z.enum(['development', 'production']).default('development'),
    PORT: zod_1.z.coerce.number().default(3000),
    CORS_ORIGIN: zod_1.z.url(),
    HOST_NAME: zod_1.z.string(),
    JWT_ACCESS_SECRET: zod_1.z.string().min(32),
    DATABASE_URL: zod_1.z.url(),
    APPWRITE_ENDPOINT: zod_1.z.url(),
    APPWRITE_PROJECT_ID: zod_1.z.string(),
    APPWRITE_API_KEY: zod_1.z.string(),
    APPWRITE_BUCKET_ID: zod_1.z.string(),
    APPWRITE_BUCKET_NAME: zod_1.z.string(),
});
const parsed = envSchema.safeParse(process.env);
if (!parsed.success) {
    console.error('❌ Invalid environment variables:');
    console.error(zod_1.z.prettifyError(parsed.error));
    process.exit(1);
}
exports.env = parsed.data;
//# sourceMappingURL=env.config.js.map