import { CreateProductRequestDTO } from '../../domain/dtos/ProductDTO';

import { CreateProductUseCase } from '../../domain/useCases/CreateProductUseCase';

import { PrismaProductRepository } from '../repositories/prisma/PrismaProductRepository';

export class CreateProductHandler {
  async handle({
    thumbnail,
    name,
    ingredients,
    price,
    volume,
    availability,
    others,
  }: CreateProductRequestDTO) {
    const prismaProductRepository = new PrismaProductRepository();

    const createProductUseCase = new CreateProductUseCase(
      prismaProductRepository,
    );

    const product = await createProductUseCase.execute({
      thumbnail,
      name,
      price,
      ingredients,
      availability,
      volume,
      others,
    });

    return product;
  }
}
