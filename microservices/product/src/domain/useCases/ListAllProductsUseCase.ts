import { Product } from '@domain/entities/Product';
import { ProductRepository } from '@domain/repositories/ProductRepository';

type ListAllProductsRequest = { page?: number; takePage?: number };

type ListAllProductsResponse = Product[];

export class ListAllProductsUseCase {
  constructor(private productRepository: ProductRepository) {}

  async execute({
    page = 1,
    takePage = 5,
  }: ListAllProductsRequest): Promise<ListAllProductsResponse> {
    const products = await this.productRepository.listAllProducts(
      page,
      takePage,
    );

    return products;
  }
}
