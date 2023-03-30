import { NameValidation } from '@domain/entities/validations';
import {
  CreateProductRequest,
  CreateProductResponse,
} from '@domain/useCases/CreateProductUseCase';
import { CreateProductHandler } from '@infra/handlers/CreateProductHandler';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CreateProductService {
  public async createProduct({
    availability,
    ingredients,
    name,
    price,
    thumbnail,
    volume,
    others,
  }: CreateProductRequest): Promise<CreateProductResponse> {
    const handler = new CreateProductHandler();

    const product = await handler.handle({
      availability,
      ingredients,
      name,
      price,
      thumbnail,
      volume,
      others,
    });

    if (product.value instanceof NameValidation) {
      console.log(product.value.message);

      throw new NameValidation('Name should not be empty');
    }

    return product;
  }
}
