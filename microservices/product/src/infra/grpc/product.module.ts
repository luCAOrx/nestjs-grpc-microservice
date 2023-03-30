import { Module } from '@nestjs/common';
import { CloneProductController } from './implementations/cloneProduct/CloneProduct.controller';
import { CloneProductService } from './implementations/cloneProduct/CloneProduct.service';
import { CreateProductController } from './implementations/createProduct/CreateProduct.controller';
import { CreateProductService } from './implementations/createProduct/CreateProduct.service';

@Module({
  imports: [],
  controllers: [CreateProductController, CloneProductController],
  providers: [CreateProductService, CloneProductService],
})
export class ProductModule {}
