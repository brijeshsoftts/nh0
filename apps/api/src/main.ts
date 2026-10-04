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
  });

  app.use(helmet());

  app.use(cookieParser());

  app.enableCors({
    origin: env.CORS_ORIGIN,
    credentials: true,
  });

  app.setGlobalPrefix('api/v1');

  const port = Number(env.PORT);
  const host = env.HOST_NAME;

  await app.listen(port, host);

  logger.log(`🚀 Application running on: ${await app.getUrl()}`);
  logger.log(`🌍 Environment: ${env.NODE_ENV}`);
}

bootstrap().catch((error) => {
  console.error('Error starting application:', error);
});
