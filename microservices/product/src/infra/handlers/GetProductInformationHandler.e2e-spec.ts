import { MakeProduct } from '../../../test/factories/MakeProductFactory';
import { GetProductInformationHandler } from './GetProductInformationHandler';

const sut = new GetProductInformationHandler();

describe('Get product information handler', () => {
  beforeAll(async () => {
    for (let i = 0; i < 20; i++) {
      await new MakeProduct().toHandler();
    }
  });

  it('should be able to search a product information', async () => {
    const product = await sut.handle({ query: ['whey', 'clara'] });

    expect(product[1].props.name).toEqual('Albumina');
    expect(product[1].props.ingredients).toEqual('clara de ovos');
  });

  it('should be able to search a product information with case-insensitive', async () => {
    const product = await sut.handle({ query: ['MINA', 'CLARA'] });

    expect(product[1].props.name).toEqual('Albumina');
    expect(product[1].props.ingredients).toEqual('clara de ovos');
  });

  it('should be able to search a product without a information', async () => {
    const product = await sut.handle({ query: '' });

    expect(product.length).toEqual(5);
  });

  it('should be able to paginate', async () => {
    let product = await sut.handle({ takePage: 5 });

    expect(product.length).toEqual(5);

    product = await sut.handle({ takePage: 5, page: 2 });

    expect(product.length).toEqual(5);
  });
});
