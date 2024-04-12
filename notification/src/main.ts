import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { Logger } from 'nestjs-pino';
import { json } from 'express';
import { ResponseWrapperInterceptor } from './utils/interceptors/responseWrapper.interceptor';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: true,
  });

  const config = app.get<ConfigService>(ConfigService);
  const logger = app.get<Logger>(Logger);

  app.setGlobalPrefix(config.get('APP_PREFIX'));
  app.use(json({ limit: '50mb' }));
  app.useGlobalInterceptors(new ResponseWrapperInterceptor());

  const swaggerDocumentOptions = new DocumentBuilder()
    .setTitle('Notifications service')
    .setDescription('This is a notification service for multiple applications')
    .setVersion('1.0')
    .addTag('Purchase')
    .build();

  const document = SwaggerModule.createDocument(app, swaggerDocumentOptions);

  SwaggerModule.setup('api', app, document);

  await app.listen(config.get('PORT'), () => {
    logger.log(`Notification service is running on: ${config.get('PORT')}`);
  });
}
bootstrap();
