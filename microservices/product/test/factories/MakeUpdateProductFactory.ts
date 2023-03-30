import { InMemoryProductRepository } from '@domain/repositories/inMemory/InMemoryProductRepository';
import { UpdateProductUseCase } from '@domain/useCases/UpdateProductUseCase';
import { CreateProductRequestDTO } from '../../src/domain/dtos/ProductDTO';
import { UpdateProductHandler } from '../../src/infra/handlers/UpdateProductHandler';

type Override = Partial<CreateProductRequestDTO>;

export class MakeUpdateProduct {
  private inMemoryRepository: InMemoryProductRepository;

  constructor(inMemoryRepository?: InMemoryProductRepository) {
    this.inMemoryRepository = inMemoryRepository;
  }

  public async toDomain({
    override = {},
    productId,
  }: {
    override?: Override;
    productId: string;
  }) {
    const updateProductUseCase = new UpdateProductUseCase(
      this.inMemoryRepository,
    );

    return await updateProductUseCase.execute({
      productId,
      data: {
        name: 'Albumina',
        ingredients: 'clara de ovos',
        availability: true,
        volume: '500mg',
        price: 30,
        thumbnail: 'image.jpg',
        others: 'Após aberto deve ser mantido em temperatura ambiente',
        ...override,
      },
    });
  }

  public async toHandler({
    override = {},
    productId,
  }: {
    override?: Override;
    productId: string;
  }) {
    return await new UpdateProductHandler().handle({
      productId,
      data: {
        name: 'Albumina',
        ingredients: 'clara de ovos',
        availability: true,
        volume: '500mg',
        price: 30,
        thumbnail: 'image.jpg',
        others: 'Após aberto deve ser mantido em temperatura ambiente',
        ...override,
      },
    });
  }
}
