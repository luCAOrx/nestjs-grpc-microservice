import { MakeProduct } from '@test/factories/MakeProductFactory';

const createProductSpy = jest.fn();

describe('Product others value object', () => {
  it('should accept valid others', async () => {
    const response = await new MakeProduct(createProductSpy).toDomain();

    expect(response.isRight()).toBeTruthy();
    expect(createProductSpy).toHaveBeenCalled();
  });

  it('should reject others with less than 2 characters', async () => {
    const response = await new MakeProduct(createProductSpy).toDomain({
      others: 'O',
    });

    expect(response.isLeft()).toBeTruthy();
    expect(createProductSpy).not.toHaveBeenCalled();
  });

  it('should reject others with more than 255 characters', async () => {
    const response = await new MakeProduct(createProductSpy).toDomain({
      others: 'O'.repeat(260),
    });

    expect(response.isLeft()).toBeTruthy();
    expect(createProductSpy).not.toHaveBeenCalled();
  });
});
