export interface ProductService {
  createProduct(product: Product): Promise<ProductResponse>;
  cloneProduct(productId: string): Promise<ProductResponse>;
}

interface Product {
  thumbnail: string;
  name: string;
  price: number;
  ingredients: string;
  availability: boolean;
  volume: string;
  others: string;
}

export interface ProductResponse {
  id: string;
  thumbnail: string;
  name: string;
  price: number;
  ingredients: string;
  availability: boolean;
  volume: string;
  others: string;
}
