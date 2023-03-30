import { MakeProduct } from '@test/factories/MakeProductFactory';

const createProductSpy = jest.fn();

describe('Product volume value object', () => {
  it('should accept valid volume', async () => {
    const response = await new MakeProduct(createProductSpy).toDomain();

    expect(response.isRight()).toBeTruthy();
    expect(createProductSpy).toHaveBeenCalled();
  });

  it('should reject the field volume if it is empty', async () => {
    const response = await new MakeProduct(createProductSpy).toDomain({
      volume: '',
    });

    expect(response.isLeft()).toBeTruthy();
    expect(createProductSpy).not.toHaveBeenCalled();
  });

  it('should reject volume field if it has letter or word between numbers', async () => {
    const response = await new MakeProduct(createProductSpy).toDomain({
      volume: 'volume2volume0volume0volume',
    });

    expect(response.isLeft()).toBeTruthy();
    expect(createProductSpy).not.toHaveBeenCalled();
  });

  it('should reject volume with less than 3 characters', async () => {
    const response = await new MakeProduct(createProductSpy).toDomain({
      volume: '20',
    });

    expect(response.isLeft()).toBeTruthy();
    expect(createProductSpy).not.toHaveBeenCalled();
  });

  it('should reject volume with more than 5 characters', async () => {
    const response = await new MakeProduct(createProductSpy).toDomain({
      volume: '2000ml',
    });

    expect(response.isLeft()).toBeTruthy();
    expect(createProductSpy).not.toHaveBeenCalled();
  });

  it('should reject volume without allowed suffix', async () => {
    const response = await new MakeProduct(createProductSpy).toDomain({
      volume: '200g',
    });

    expect(response.isLeft()).toBeTruthy();
    expect(createProductSpy).not.toHaveBeenCalled();
  });
});
