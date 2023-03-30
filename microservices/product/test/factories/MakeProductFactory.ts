import { CreateProductRequestDTO } from '@domain/dtos/ProductDTO';
import { CreateProductUseCase } from '@domain/useCases/CreateProductUseCase';
import { CreateProductController } from '@infra/grpc/implementations/createProduct/CreateProduct.controller';
import { CreateProductService } from '@infra/grpc/implementations/createProduct/CreateProduct.service';
import { CreateProductHandler } from '@infra/handlers/CreateProductHandler';

type Override = Partial<CreateProductRequestDTO>;

export class MakeProduct {
  private spy: jest.Mock;

  constructor(spy?: jest.Mock) {
    this.spy = spy;
  }

  public async toDomain(override: Override = {}) {
    const createProductUseCase = new CreateProductUseCase({
      createProduct: this.spy,
      cloneProduct: this.spy,
      deleteProduct: this.spy,
      findProductById: this.spy,
      getProductInformation: this.spy,
      listAllProducts: this.spy,
      updateProduct: this.spy,
    });

    return await createProductUseCase.execute({
      name: 'Albumina',
      ingredients: 'clara de ovos',
      availability: true,
      volume: '500mg',
      price: 30,
      thumbnail: 'image.jpg',
      others: 'Após aberto deve ser mantido em temperatura ambiente',
      ...override,
    });
  }

  public async toHandler(override: Override = {}) {
    return await new CreateProductController(
      new CreateProductService(),
    ).createProduct({
      name: 'Albumina',
      ingredients: 'clara de ovos',
      availability: true,
      volume: '500mg',
      price: 30,
      thumbnail: 'image.jpg',
      others: 'Após aberto deve ser mantido em temperatura ambiente',
      ...override,
    });
    // return await new CreateProductHandler().handle({
    //   name: 'Albumina',
    //   ingredients: 'clara de ovos',
    //   availability: true,
    //   volume: '500mg',
    //   price: 30,
    //   thumbnail: 'image.jpg',
    //   others: 'Após aberto deve ser mantido em temperatura ambiente',
    //   ...override,
    // });
  }
}
