import { Product } from '@domain/entities/Product';

export class ProductViewModel {
  static toHTTP({
    id,
    props: {
      availability,
      ingredients,
      name,
      price,
      thumbnail,
      volume,
      others,
    },
  }: Product) {
    return {
      id,
      thumbnail,
      name,
      ingredients,
      price,
      volume,
      availability,
      others,
    };
  }
}
