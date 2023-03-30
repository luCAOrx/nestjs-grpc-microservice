import { ProductRepository } from '@domain/repositories/ProductRepository';
import { Module } from '@nestjs/common';
import { PrismaProductRepository } from './prisma/PrismaProductRepository';

@Module({
  providers: [
    {
      provide: ProductRepository,
      useClass: PrismaProductRepository,
    },
  ],
})
export class RepositoryModule {}
