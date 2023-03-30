import { Product } from '@domain/entities/Product';
import { MakeProduct } from '@test/factories/MakeProductFactory';

const createProductSpy = jest.fn();

describe('Create product use case', () => {
  it('should be able to create a new product', async () => {
    const response = await new MakeProduct(createProductSpy).toDomain();

    expect(response.isRight()).toBeTruthy();
    expect(createProductSpy).toHaveBeenCalled();
    expect(response.value).toBeInstanceOf(Product);
  });

  it('should not be able to create a new product', async () => {
    const response = await new MakeProduct(createProductSpy).toDomain({
      name: '',
      ingredients: '',
      availability: Boolean(),
      volume: 'mg',
      price: 0,
      thumbnail: '',
      others: 'O',
    });

    expect(response.isRight()).not.toBeTruthy();
    expect(createProductSpy).not.toHaveBeenCalled();
  });
});
