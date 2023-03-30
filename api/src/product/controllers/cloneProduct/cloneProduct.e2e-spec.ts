import { INestApplication } from '@nestjs/common';
import { TestingModule, Test } from '@nestjs/testing';
import { createProduct } from '@test/factories/productFactory';
import { AppModule } from '../../app.module';
import * as request from 'supertest';

describe('Clone product', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('should be able to clone a product', async () => {
    const { body } = await createProduct({
      server: app.getHttpServer(),
    });

    return request(app.getHttpServer())
      .post(`/product/cloneProduct/${body.product.id}`)
      .expect(201)
      .then((response) => {
        const {
          id,
          thumbnail,
          name,
          ingredients,
          price,
          volume,
          availability,
          others,
        } = response.body.product;

        expect(response.body).toStrictEqual({
          product: {
            id,
            thumbnail,
            name,
            ingredients,
            price,
            volume,
            availability,
            others,
          },
        });
      });
  });

  afterAll(async () => {
    await app.close();
  });
});
