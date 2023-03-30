import { MakeProduct } from '@test/factories/MakeProductFactory';
import { Product } from '@domain/entities/Product';
import { InMemoryProductRepository } from '@domain/repositories/inMemory/InMemoryProductRepository';
import { ListAllProductsUseCase } from '@domain/useCases/ListAllProductsUseCase';

const listAllProductsSpy = jest.fn();

const inMemoryProductRepository = new InMemoryProductRepository();

const sut = new ListAllProductsUseCase(inMemoryProductRepository);

describe('List all products use case', () => {
  beforeAll(async () => {
    for (let i = 0; i < 20; i++) {
      const product = (await new MakeProduct(listAllProductsSpy).toDomain())
        .value as Product;

      inMemoryProductRepository.createProduct(product);
    }
  });

  it('should be able to list all products', async () => {
    const product = await sut.execute({});

    expect(product.length).toEqual(5);
    expect(product[0].props.name).toEqual('Albumina');
    expect(product[0].props.ingredients).toEqual('clara de ovos');
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
