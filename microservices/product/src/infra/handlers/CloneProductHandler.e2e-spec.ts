import { CloneProductHandler } from './CloneProductHandler';
import { MakeProduct } from '../../../test/factories/MakeProductFactory';
import { Product } from '../../domain/entities/Product';
import { ProductDoesNotExistsError } from '../../domain/useCases/errors/ProductDoesNotExistsError';

const sut = new CloneProductHandler();

describe('Clone product handler', () => {
  it('should be able to clone a product', async () => {
    const product = (await new MakeProduct().toHandler()).value as Product;

    const response = await sut.handle({
      productId: product.id,
    });

    expect(response.isRight()).toBeTruthy();
  });

  it('should not be able to clone a product with id inexistent', async () => {
    const response = await sut.handle({
      productId: 'aad54b32-b870-4f93-b0e9-331eb1d1f311',
    });

    expect(response.isLeft()).toBeTruthy();
    expect(response.value).toBeInstanceOf(ProductDoesNotExistsError);
  });
});
