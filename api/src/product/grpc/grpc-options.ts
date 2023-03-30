import 'dotenv/config';
import { ClientOptions, Transport } from '@nestjs/microservices';
import { join } from 'node:path';

const protoFilePath = join('src', 'product', 'grpc', 'proto', 'product.proto');

export const productMicroserviceOptions: ClientOptions = {
  transport: Transport.GRPC,
  options: {
    package: 'product',
    protoPath: protoFilePath,
    url: `${process.env.GRPC_PRODUCT_SERVER_HOST}:${process.env.GRPC_PRODUCT_SERVER_PORT}`,
    loader: {
      keepCase: true,
      defaults: true,
      objects: true,
    },
  },
};
