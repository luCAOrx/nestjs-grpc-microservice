import { MakeProduct } from '@test/factories/MakeProductFactory';

describe('Create product implementation', () => {
  it('should be able to create a new product', async () => {
    const response = await new MakeProduct().toHandler();

    expect(response.product).toBeTruthy();
    expect(response.product).toStrictEqual({
      id: response.product.id,
      thumbnail: 'image.jpg',
      name: 'Albumina',
      ingredients: 'clara de ovos',
      price: 30,
      volume: '500mg',
      availability: true,
      others: 'Após aberto deve ser mantido em temperatura ambiente',
    });
  });

  it('should not be able to create a new product with empty name field', async () => {
    const response = await new MakeProduct().toHandler({
      name: '',
    });

    expect(response.error).toBeTruthy();
    expect(response.error).toStrictEqual({
      statusCode: 400,
      message: 'Name should not be empty',
      error: 'Bad Request',
    });
  });

  // it('should not be able create a new product if name field not have letters', async () => {
  //   const response = await new MakeProduct().toHandler({
  //     name: '0123456789',
  //   });

  //   expect(response.error).toBeTruthy();
  //   expect(response.error).toStrictEqual({
  //     statusCode: 400,
  //     message: 'Name should not be empty',
  //     error: 'Bad Request',
  //   });
  // });
});
