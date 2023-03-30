import { MakeProduct } from '@test/factories/MakeProductFactory';
import { Product } from '@domain/entities/Product';
import { InMemoryProductRepository } from '@domain/repositories/inMemory/InMemoryProductRepository';
import { CloneProductUseCase } from '@domain/useCases/CloneProductUseCase';
import { ProductDoesNotExistsError } from '@domain/useCases/errors/ProductDoesNotExistsError';

const cloneProductSpy = jest.fn();

const inMemoryProductRepository = new InMemoryProductRepository();

const sut = new CloneProductUseCase(inMemoryProductRepository);

describe('Clone product use case', () => {
  it('should be able to clone a new product', async () => {
    const product = (await new MakeProduct(cloneProductSpy).toDomain())
      .value as Product;

    inMemoryProductRepository.createProduct(product);

    const response = await sut.execute({ productId: product.id });

    expect(response.isRight()).toBeTruthy();
    expect(cloneProductSpy).toHaveBeenCalled();
    expect(response.value).toBeInstanceOf(Product);
  });

  it('should not be able to clone a product', async () => {
    const response = await sut.execute({
      productId: 'aad54b32-b870-4f93-b0e9-331eb1d1f311',
    });

    expect(response.isLeft()).toBeTruthy();
    expect(response.value).toBeInstanceOf(ProductDoesNotExistsError);
    expect(cloneProductSpy).not.toHaveBeenCalled();
  });
});
