import { MakeProduct } from '@test/factories/MakeProductFactory';
import { Product } from '@domain/entities/Product';
import { InMemoryProductRepository } from '@domain/repositories/inMemory/InMemoryProductRepository';
import { GetProductInformationUseCase } from '@domain/useCases/GetProductInformationUseCase';

const getProductInformationSpy = jest.fn();

const inMemoryProductRepository = new InMemoryProductRepository();

const sut = new GetProductInformationUseCase(inMemoryProductRepository);

describe('Get products by name use case', () => {
  beforeAll(async () => {
    for (let i = 0; i < 20; i++) {
      const product = (
        await new MakeProduct(getProductInformationSpy).toDomain()
      ).value as Product;

      inMemoryProductRepository.createProduct(product);
    }
  });

  it('should be able to search a product information', async () => {
    const product = await sut.execute({ query: ['mina', 'clara'] });

    expect(product.length).toEqual(5);
    expect(product[0].props.name).toEqual('Albumina');
    expect(product[0].props.ingredients).toEqual('clara de ovos');
    expect(product).toBeInstanceOf(Array<Product>);
  });

  it('should be able to search a product information with case-insensitive', async () => {
    const product = await sut.execute({ query: ['MINA', 'CLARA'] });

    expect(product.length).toEqual(5);
    expect(product[0].props.name).toEqual('Albumina');
    expect(product[0].props.ingredients).toEqual('clara de ovos');
    expect(product).toBeInstanceOf(Array<Product>);
  });

  it('should be able to search a product without a information', async () => {
    const product = await sut.execute({ query: '' });

    expect(product.length).toEqual(5);
    expect(product[0].props.name).toEqual('Albumina');
    expect(product).toBeInstanceOf(Array<Product>);
  });

  it('should be able to paginate', async () => {
    let product = await sut.execute({ takePage: 5 });

    expect(product.length).toEqual(5);
    expect(product[0].props.name).toEqual('Albumina');
    expect(product).toBeInstanceOf(Array<Product>);

    product = await sut.execute({ takePage: 5, page: 2 });

    expect(product.length).toEqual(5);
    expect(product[0].props.name).toEqual('Albumina');
    expect(product).toBeInstanceOf(Array<Product>);
  });
});
