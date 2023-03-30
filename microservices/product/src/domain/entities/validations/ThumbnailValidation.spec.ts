import { MakeProduct } from '@test/factories/MakeProductFactory';

const createProductSpy = jest.fn();

describe('Product thumbnail value object', () => {
  it('should accept valid thumbnail', async () => {
    const response = await new MakeProduct(createProductSpy).toDomain();

    expect(response.isRight()).toBeTruthy();
    expect(createProductSpy).toHaveBeenCalled();
  });

  it('should reject the thumbnail field if it is empty', async () => {
    const response = await new MakeProduct(createProductSpy).toDomain({
      thumbnail: '',
    });

    expect(response.isLeft()).toBeTruthy();
    expect(createProductSpy).not.toHaveBeenCalled();
  });

  it('should reject thumbnail with less than 2 characters', async () => {
    const response = await new MakeProduct(createProductSpy).toDomain({
      thumbnail: 'i',
    });

    expect(response.isLeft()).toBeTruthy();
    expect(createProductSpy).not.toHaveBeenCalled();
  });

  it('should reject thumbnail with more than 255 characters', async () => {
    const response = await new MakeProduct(createProductSpy).toDomain({
      thumbnail: 'image.jpg'.repeat(260),
    });

    expect(response.isLeft()).toBeTruthy();
    expect(createProductSpy).not.toHaveBeenCalled();
  });

  it('should reject thumbnail without allowed file type', async () => {
    const response = await new MakeProduct(createProductSpy).toDomain({
      thumbnail: 'video.mkv',
    });

    expect(response.isLeft()).toBeTruthy();
    expect(createProductSpy).not.toHaveBeenCalled();
  });
});
