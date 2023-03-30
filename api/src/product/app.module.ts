import { Module } from '@nestjs/common';
import { CreateProductController } from '@controller/createProduct/createProduct.controller';
import { CloneProductController } from '@controller/cloneProduct/cloneProduct.controller';

@Module({
  imports: [],
  controllers: [CreateProductController, CloneProductController],
  providers: [],
})
export class AppModule {}
