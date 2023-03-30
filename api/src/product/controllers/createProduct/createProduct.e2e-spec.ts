import { INestApplication } from '@nestjs/common';
import { TestingModule, Test } from '@nestjs/testing';
import { createProduct } from '@test/factories/productFactory';
import { AppModule } from '../../app.module';

describe('Create product', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('should be able to create a product', async () => {
    await createProduct({
      server: app.getHttpServer(),
    })
      .expect(201)
      .then((response) => {
        const { id, thumbnail } = response.body.product;

        expect(response.body).toStrictEqual({
          product: {
            id,
            thumbnail,
            name: 'Whey Protein',
            ingredients: 'Sôro do leite',
            price: 60,
            volume: '500mg',
            availability: true,
            others: 'Suplemento alimentar',
          },
        });
      });
  });

  it('should not be able to create a product with a wrong name', async () => {
    return;
  });

  afterAll(async () => {
    await app.close();
  });
});
