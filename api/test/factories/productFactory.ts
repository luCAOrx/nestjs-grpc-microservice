import { INestApplication } from '@nestjs/common';
import { resolve } from 'node:path';
import * as request from 'supertest';

export function createProduct({ server }: { server: INestApplication }) {
  const thumbnail = resolve(
    __dirname,
    '..',
    '..',
    'src',
    'product',
    'uploads/image-example.png',
  );

  return request(server)
    .post('/product/createProduct')
    .attach('thumbnail', thumbnail)
    .field('name', 'Whey Protein')
    .field('ingredients', 'Sôro do leite')
    .field('price', 60)
    .field('volume', '500mg')
    .field('availability', true)
    .field('others', 'Suplemento alimentar');
}
