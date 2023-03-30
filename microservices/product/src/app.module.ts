import { ProductModule } from '@infra/grpc/product.module';
import { RepositoryModule } from '@infra/repositories/repository.module';
import { Module } from '@nestjs/common';

@Module({
  imports: [ProductModule],
  providers: [RepositoryModule],
})
export class AppModule {}
