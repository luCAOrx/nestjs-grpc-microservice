import {PrismaProductRepository} from '../repositories/prisma/PrismaProductRepository';
import {CreateProductRequestDTO} from '../../domain/dtos/ProductDTO';
import {UpdateProductUseCase} from '../../domain/useCases/UpdateProductUseCase';

type UpdateProductRequest = {
  productId: string;
  data: CreateProductRequestDTO;
};

export class UpdateProductHandler {
  async handle({productId, data}: UpdateProductRequest) {
    const prismaProductRepository = new PrismaProductRepository();

    const updateProductUseCase = new UpdateProductUseCase(
      prismaProductRepository,
    );

    const response = updateProductUseCase.execute({productId, data});

    return response;
  }
}
