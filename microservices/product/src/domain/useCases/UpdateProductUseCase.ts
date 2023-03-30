import { Either, left, right } from '@core/domain/logic/Either';
import { CreateProductRequestDTO } from '@domain/dtos/ProductDTO';
import { Product } from '@domain/entities/Product';
import {
  AvailabilityValidation,
  IngredientsValidation,
  NameValidation,
  OthersValidation,
  PriceValidation,
  ThumbnailValidation,
  VolumeValidation,
} from '@domain/entities/validations';
import { ProductRepository } from '@domain/repositories/ProductRepository';
import { ProductDoesNotExistsError } from '@domain/useCases/errors/ProductDoesNotExistsError';

type UpdateProductRequest = {
  productId: string;
  data: CreateProductRequestDTO;
};

type UpdateProductResponse = Either<
  | NameValidation
  | IngredientsValidation
  | AvailabilityValidation
  | VolumeValidation
  | PriceValidation
  | ThumbnailValidation
  | OthersValidation
  | ProductDoesNotExistsError,
  Product
>;

export class UpdateProductUseCase {
  constructor(private productRepository: ProductRepository) {}

  async execute({
    productId,
    data,
  }: UpdateProductRequest): Promise<UpdateProductResponse> {
    const productFound = await this.productRepository.findProductById(
      productId,
    );

    if (productId !== productFound?.id) {
      return left(new ProductDoesNotExistsError());
    }

    const productOrError = Product.create(data);

    if (productOrError.isLeft()) {
      return left(productOrError.value);
    }

    productFound.props = productOrError.value.props;

    await this.productRepository.updateProduct(productFound);

    return right(productFound);
  }
}
