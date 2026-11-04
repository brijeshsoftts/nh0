import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import cookieParser from 'cookie-parser';
import helmet from 'helmet';

import { AppModule } from './app.module';
import { env } from './config';

async function bootstrap() {
  const logger = new Logger('Bootstrap');
  const app = await NestFactory.create(AppModule, {
    logger: ['error', 'warn', 'debug', 'log'],
    rawBody: true,
  });

  app.use(helmet());
  app.use(cookieParser());

  const allowedOrigins = Array.isArray(env.CORS_ORIGIN)
    ? env.CORS_ORIGIN
    : [env.CORS_ORIGIN];

  app.enableCors({
    origin: allowedOrigins,
    credentials: true,
  });

  app.setGlobalPrefix('api/v1');

  if (process.env.VERCEL) {
    await app.init();
    const expressApp = app.getHttpAdapter().getInstance();

    logger.log('✅ Nest app initialized for Vercel serverless runtime');
    return expressApp;
  }

  const port = Number(env.PORT || 3000);
  const host = env.HOST_NAME || '0.0.0.0';

  await app.listen(port, host);

  logger.log(`🚀 Application running on: ${await app.getUrl()}`);
  logger.log(`🌍 Environment: ${env.NODE_ENV}`);

  return app.getHttpAdapter().getInstance();
}

let appPromise: Promise<any>;

if (process.env.VERCEL) {
  appPromise = bootstrap();
} else {
  appPromise = bootstrap();
  appPromise.catch((error) => {
    console.error('Error starting application:', error);
  });
}

export default async function handler(req: any, res: any, next?: any) {
  const app = await appPromise;
  return app(req, res, next);
}
