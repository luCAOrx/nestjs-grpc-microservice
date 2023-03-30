import { PrismaProductRepository } from '../repositories/prisma/PrismaProductRepository';
import { ListAllProductsUseCase } from '../../domain/useCases/ListAllProductsUseCase';

type ListAllProductsRequest = { page?: number; takePage?: number };

export class ListAllProductsHandler {
  async handle({ page, takePage }: ListAllProductsRequest) {
    const prismaProductRepository = new PrismaProductRepository();

    const listAllProductsUseCase = new ListAllProductsUseCase(
      prismaProductRepository,
    );

    const response = listAllProductsUseCase.execute({
      page,
      takePage,
    });

    return response;
  }
}
