import { MakeProduct } from '@test/factories/MakeProductFactory';
import { Product } from '@domain/entities/Product';
import { InMemoryProductRepository } from '@domain/repositories/inMemory/InMemoryProductRepository';
import { ProductDoesNotExistsError } from '@domain/useCases/errors/ProductDoesNotExistsError';
import { MakeUpdateProduct } from '@test/factories/MakeUpdateProductFactory';

const updateProductSpy = jest.fn();

const inMemoryProductRepository = new InMemoryProductRepository();

describe('Update product use case', () => {
  it('should not be able to update a product with wrong id', async () => {
    const response = await new MakeUpdateProduct(
      inMemoryProductRepository,
    ).toDomain({
      productId: 'ddb9b22d-121a-49b0-a39d-d5885a3d0304',
    });

    expect(response.isLeft()).toBeTruthy();
    expect(response.value).toBeInstanceOf(ProductDoesNotExistsError);
  });

  it('should be able to update a product', async () => {
    const product = (await new MakeProduct(updateProductSpy).toDomain())
      .value as Product;

    inMemoryProductRepository.createProduct(product);

    const response = await new MakeUpdateProduct(
      inMemoryProductRepository,
    ).toDomain({
      productId: product.id,
    });

    expect(response.isRight()).toBeTruthy();
    expect(response.value).toBeInstanceOf(Product);
  });

  it('should not be able to update a product with wrong data', async () => {
    const product = (await new MakeProduct(updateProductSpy).toDomain())
      .value as Product;

    const response = await new MakeUpdateProduct(
      inMemoryProductRepository,
    ).toDomain({
      productId: product.id,
    });

    expect(response.isLeft()).toBeTruthy();
    expect(response.value).toBeInstanceOf(ProductDoesNotExistsError);
  });
});
