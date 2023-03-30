import { MakeProduct } from '@test/factories/MakeProductFactory';
import { Product } from '@domain/entities/Product';
import { InMemoryProductRepository } from '@domain/repositories/inMemory/InMemoryProductRepository';
import { DeleteProductUseCase } from '@domain/useCases/DeleteProductUseCase';
import { ProductDoesNotExistsError } from '@domain/useCases/errors/ProductDoesNotExistsError';

const deleteProductSpy = jest.fn();

const inMemoryProductRepository = new InMemoryProductRepository();

const sut = new DeleteProductUseCase(inMemoryProductRepository);

describe('Delete product use case', () => {
  it('should not be able to delete a product with wrong id', async () => {
    const response = await sut.execute({
      productId: 'ddb9b22d-121a-49b0-a39d-d5885a3d0304',
    });

    expect(response.isLeft()).toBeTruthy();
    expect(response.value).toBeInstanceOf(ProductDoesNotExistsError);
    expect(deleteProductSpy).not.toHaveBeenCalled();
  });

  it('should be able to delete a product', async () => {
    const product = (await new MakeProduct(deleteProductSpy).toDomain())
      .value as Product;

    inMemoryProductRepository.createProduct(product);

    const response = await sut.execute({ productId: product.id });

    expect(response.isRight()).toBeTruthy();
    expect(inMemoryProductRepository.items.length).toEqual(0);
    expect(deleteProductSpy).toHaveBeenCalled();
  });
});
