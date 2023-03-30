import { MakeProduct } from '@test/factories/MakeProductFactory';

const createProductSpy = jest.fn();

describe('Product name value object', () => {
  it('should accept valid name', async () => {
    const response = await new MakeProduct(createProductSpy).toDomain();

    expect(response.isRight()).toBeTruthy();
    expect(createProductSpy).toHaveBeenCalled();
  });

  it('should reject the name field if it is empty', async () => {
    const response = await new MakeProduct(createProductSpy).toDomain({
      name: '',
    });

    expect(response.isLeft()).toBeTruthy();
    expect(createProductSpy).not.toHaveBeenCalled();
  });

  it('should reject the name field if not have letters', async () => {
    const response = await new MakeProduct(createProductSpy).toDomain({
      name: '0123456789',
    });

    expect(response.isLeft()).toBeTruthy();
    expect(createProductSpy).not.toHaveBeenCalled();
  });

  it('should reject name with less than 2 characters', async () => {
    const response = await new MakeProduct(createProductSpy).toDomain({
      name: 'B',
    });

    expect(response.isLeft()).toBeTruthy();
    expect(createProductSpy).not.toHaveBeenCalled();
  });

  it('should reject name with more than 255 characters', async () => {
    const response = await new MakeProduct(createProductSpy).toDomain({
      name: 'B'.repeat(260),
    });

    expect(response.isLeft()).toBeTruthy();
    expect(createProductSpy).not.toHaveBeenCalled();
  });
});
