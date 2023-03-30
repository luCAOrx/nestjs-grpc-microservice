import { Products } from '@prisma/client';
import { Product } from '../../domain/entities/Product';

export class ProductMapper {
  static toDomain(raw: Products): Product {
    return Product.create(
      {
        availability: raw.availability,
        ingredients: raw.ingredients,
        name: raw.name,
        price: Number(raw.price),
        thumbnail: raw.thumbnail,
        volume: raw.volume,
        others: raw.others,
      },
      raw.id,
    ).value as Product;
  }

  static toPersistence(product: Product) {
    return {
      id: product.id,
      availability: product.props.availability,
      ingredients: product.props.ingredients,
      name: product.props.name,
      price: product.props.price,
      thumbnail: product.props.thumbnail,
      volume: product.props.volume,
      others: product.props.others,
    };
  }
}
