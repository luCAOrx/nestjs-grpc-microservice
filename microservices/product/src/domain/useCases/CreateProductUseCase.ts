import { Either, left, right } from '@core/domain/logic/Either';
import { CreateProductRequestDTO } from '@domain/dtos/ProductDTO';
import {
  NameValidation,
  IngredientsValidation,
  AvailabilityValidation,
  VolumeValidation,
  PriceValidation,
  ThumbnailValidation,
  OthersValidation,
} from '@domain/entities/validations';
import { Product } from '@domain/entities/Product';
import { ProductRepository } from '@domain/repositories/ProductRepository';

export type CreateProductRequest = CreateProductRequestDTO;

export type CreateProductResponse = Either<
  | NameValidation
  | IngredientsValidation
  | AvailabilityValidation
  | VolumeValidation
  | PriceValidation
  | ThumbnailValidation
  | OthersValidation,
  Product
>;

export class CreateProductUseCase {
  constructor(private productRepository: ProductRepository) {}

  async execute({
    availability,
    ingredients,
    name,
    price,
    thumbnail,
    volume,
    others,
  }: CreateProductRequest): Promise<CreateProductResponse> {
    const productOrError = Product.create({
      availability,
      ingredients,
      name,
      price,
      thumbnail,
      volume,
      others,
    });

    if (productOrError.isLeft()) {
      return left(productOrError.value);
    }

    const product = productOrError.value;

    await this.productRepository.createProduct(product);

    return right(product);
  }
}
