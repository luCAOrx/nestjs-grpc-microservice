import { Either, left, right } from '@core/domain/logic/either';
import { CreateProductRequestDTO } from '@domain/dtos/productDTO';
import {
  IngredientsValidation,
  AvailabilityValidation,
  VolumeValidation,
  PriceValidation,
  ThumbnailValidation,
  OthersValidation,
} from '@domain/entities/validations';
import { Product } from '@domain/entities/product';
import { ProductRepository } from '@domain/repositories/ProductRepository';
import { Name } from '@domain/entities/name';
import { RequiredFieldError } from '@domain/entities/validations/errors/requiredFieldError';

export type CreateProductRequest = CreateProductRequestDTO;

export type CreateProductResponse = Either<
  | RequiredFieldError
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
    const nameOrError = Name.create(name);

    if (nameOrError.isLeft()) {
      return left(nameOrError.value);
    }

    const productOrError = Product.create({
      availability,
      ingredients,
      name: nameOrError.value,
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
