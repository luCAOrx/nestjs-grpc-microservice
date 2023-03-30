import { MakeProduct } from '@test/factories/MakeProductFactory';

const createProductSpy = jest.fn();

describe('Product price value object', () => {
  it('should accept valid price', async () => {
    const response = await new MakeProduct(createProductSpy).toDomain();

    expect(response.isRight()).toBeTruthy();
    expect(createProductSpy).toHaveBeenCalled();
  });

  it('should reject price if it is less than or equal to 0', async () => {
    const response = await new MakeProduct(createProductSpy).toDomain({
      price: 0,
    });

    expect(response.isLeft()).toBeTruthy();
    expect(createProductSpy).not.toHaveBeenCalled();
  });

  it('should reject the price if it is not a number', async () => {
    const response = await new MakeProduct(createProductSpy).toDomain({
      price: Object(),
    });

    expect(response.isLeft()).toBeTruthy();
    expect(createProductSpy).not.toHaveBeenCalled();
  });

  it('should reject price with more than 6 digits', async () => {
    const response = await new MakeProduct(createProductSpy).toDomain({
      price: 1000000,
    });

    expect(response.isLeft()).toBeTruthy();
    expect(createProductSpy).not.toHaveBeenCalled();
  });
});
