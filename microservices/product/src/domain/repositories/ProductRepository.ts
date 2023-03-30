import { Product } from '@domain/entities/Product';

export type GetProductInformationParams = {
  query?: any;
  page: number;
  takePage: number;
};

export abstract class ProductRepository {
  abstract createProduct: (product: Product) => Promise<Product>;
  abstract findProductById: (productId: string) => Promise<Product | null>;
  abstract cloneProduct: (product: Product) => Promise<Product>;
  abstract getProductInformation: (
    params: GetProductInformationParams,
  ) => Promise<Product[]>;
  abstract listAllProducts: (
    page: number,
    takePage: number,
  ) => Promise<Product[]>;
  abstract updateProduct: (data: Product) => Promise<Product>;
  abstract deleteProduct: (product: Product) => Promise<void>;
}
