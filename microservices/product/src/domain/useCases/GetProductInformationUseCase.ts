import { Product } from '@domain/entities/Product';
import { ProductRepository } from '@domain/repositories/ProductRepository';

type GetProductInformationRequest = {
  query?: any;
  takePage?: number;
  page?: number;
};

type GetProductInformationResponse = Product[];

export class GetProductInformationUseCase {
  constructor(private productRepository: ProductRepository) {}

  async execute({
    query,
    takePage = 5,
    page = 1,
  }: GetProductInformationRequest): Promise<GetProductInformationResponse> {
    const productOrProducts =
      await this.productRepository.getProductInformation({
        query,
        takePage,
        page,
      });

    return productOrProducts;
  }
}
