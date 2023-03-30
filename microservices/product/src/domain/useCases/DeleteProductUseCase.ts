import { Either, left, right } from '@core/domain/logic/Either';
import { ProductRepository } from '@domain/repositories/ProductRepository';
import { ProductDoesNotExistsError } from '@domain/useCases/errors/ProductDoesNotExistsError';

type DeleteProductRequest = { productId: string };

type DeleteProductResponse = Either<ProductDoesNotExistsError, null>;

export class DeleteProductUseCase {
  constructor(private productRepository: ProductRepository) {}

  async execute({
    productId,
  }: DeleteProductRequest): Promise<DeleteProductResponse> {
    const productFound = await this.productRepository.findProductById(
      productId,
    );

    if (productId !== productFound?.id) {
      return left(new ProductDoesNotExistsError());
    }

    await this.productRepository.deleteProduct(productFound);

    return right(null);
  }
}
