import { CloneProductRequestDTO } from '@domain/dtos/ProductDTO';
import { Product } from '@domain/entities/Product';
import { ProductViewModel } from '@infra/viewModels/productViewModel';
import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { CloneProductService } from './CloneProduct.service';

@Controller('product')
export class CloneProductController {
  constructor(private cloneProductService: CloneProductService) {}

  @GrpcMethod('ProductService', 'CloneProduct')
  async cloneProduct({ productId }: CloneProductRequestDTO) {
    const product = await this.cloneProductService.cloneProduct({
      productId,
    });

    const response = ProductViewModel.toHTTP(product.value as Product);

    return { product: response };
  }
}
