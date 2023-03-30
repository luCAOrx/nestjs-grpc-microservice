import { Product } from '@domain/entities/Product';
import { NameValidation } from '@domain/entities/validations';
import { CreateProductRequest } from '@domain/useCases/CreateProductUseCase';
import { ProductViewModel } from '@infra/viewModels/productViewModel';
import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { CreateProductService } from './CreateProduct.service';

@Controller('product')
export class CreateProductController {
  constructor(private createProductService: CreateProductService) {}

  @GrpcMethod('ProductService', 'CreateProduct')
  async createProduct({
    availability,
    ingredients,
    name,
    price,
    thumbnail,
    volume,
    others,
  }: CreateProductRequest) {
    try {
      const product = await this.createProductService.createProduct({
        availability,
        ingredients,
        name,
        price,
        thumbnail,
        volume,
        others,
      });

      const response = ProductViewModel.toHTTP(product.value as Product);

      return { product: response };
    } catch (error) {
      if (error instanceof NameValidation) {
        return {
          error: {
            statusCode: 400,
            message: error.message,
            error: 'Bad Request',
          },
        };
      }
    }
  }
}
