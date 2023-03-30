import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import { serverOptions } from '@infra/grpc/server.options';
import { MicroserviceOptions } from '@nestjs/microservices';

async function bootstrap() {
  const logger = new Logger();

  const app = await NestFactory.create(AppModule);
  app.connectMicroservice<MicroserviceOptions>(serverOptions);

  await app.startAllMicroservices();

  logger.log(
    `Application is running on: ${process.env.GRPC_PRODUCT_SERVER_HOST}:${process.env.GRPC_PRODUCT_SERVER_PORT}`,
    'NestMicroservice',
  );
}
bootstrap();
