import { Either, left, right } from '@core/domain/logic/Either';
import { CloneProductRequestDTO } from '@domain/dtos/ProductDTO';
import { Product } from '@domain/entities/Product';
import { ProductRepository } from '@domain/repositories/ProductRepository';
import { ProductDoesNotExistsError } from '@domain/useCases/errors/ProductDoesNotExistsError';

type CloneProductRequest = CloneProductRequestDTO;

export type CloneProductResponse = Either<ProductDoesNotExistsError, Product>;

export class CloneProductUseCase {
  constructor(private productRepository: ProductRepository) {}

  async execute({
    productId,
  }: CloneProductRequest): Promise<CloneProductResponse> {
    const product = await this.productRepository.findProductById(productId);

    if (!product) {
      return left(new ProductDoesNotExistsError());
    }

    const createdProduct = Product.create(product.props).value as Product;

    const clonedProduct = await this.productRepository.cloneProduct(
      createdProduct,
    );

    return right(clonedProduct);
  }
}
