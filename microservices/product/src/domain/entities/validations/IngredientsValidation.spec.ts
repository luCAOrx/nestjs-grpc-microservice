import { MakeProduct } from '@test/factories/MakeProductFactory';

const createProductSpy = jest.fn();

describe('Product ingredients value object', () => {
  it('should accept valid ingredients', async () => {
    const response = await new MakeProduct(createProductSpy).toDomain();

    expect(response.isRight()).toBeTruthy();
    expect(createProductSpy).toHaveBeenCalled();
  });

  it('should reject the field ingredient if it is empty', async () => {
    const response = await new MakeProduct(createProductSpy).toDomain({
      ingredients: '',
    });

    expect(response.isLeft()).toBeTruthy();
    expect(createProductSpy).not.toHaveBeenCalled();
  });

  it('should reject ingredient with less than 2 characters', async () => {
    const response = await new MakeProduct(createProductSpy).toDomain({
      ingredients: 'v',
    });

    expect(response.isLeft()).toBeTruthy();
    expect(createProductSpy).not.toHaveBeenCalled();
  });

  it('should reject ingredient with more than 255 characters', async () => {
    const response = await new MakeProduct(createProductSpy).toDomain({
      ingredients: 'v'.repeat(260),
    });

    expect(response.isLeft()).toBeTruthy();
    expect(createProductSpy).not.toHaveBeenCalled();
  });
});
