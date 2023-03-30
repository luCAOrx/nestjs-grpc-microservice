import { CloneProductRequestDTO } from '@domain/dtos/ProductDTO';
import {
  CloneProductResponse,
  CloneProductUseCase,
} from '../../domain/useCases/CloneProductUseCase';
import { PrismaProductRepository } from '../repositories/prisma/PrismaProductRepository';

export class CloneProductHandler {
  async handle({
    productId,
  }: CloneProductRequestDTO): Promise<CloneProductResponse> {
    const prismaProductRepository = new PrismaProductRepository();

    const cloneProductUseCase = new CloneProductUseCase(
      prismaProductRepository,
    );

    const product = await cloneProductUseCase.execute({ productId });

    return product;
  }
}
