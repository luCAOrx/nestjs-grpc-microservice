import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const logger = new Logger();
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());

  await app.listen(process.env.SERVER_PORT || 3333);

  logger.log(
    `Application is running on: ${process.env.GRPC_PRODUCT_SERVER_HOST}:${process.env.GRPC_PRODUCT_SERVER_PORT}`,
    'NestMicroservice',
  );
}
bootstrap();
