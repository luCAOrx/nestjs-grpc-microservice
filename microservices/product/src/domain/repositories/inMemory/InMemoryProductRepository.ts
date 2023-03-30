import { Product } from '@domain/entities/Product';
import {
  GetProductInformationParams,
  ProductRepository,
} from '@domain/repositories/ProductRepository';

export class InMemoryProductRepository implements ProductRepository {
  public items: Product[] = [];

  async createProduct(product: Product): Promise<Product> {
    this.items.push(product);

    return product;
  }

  async findProductById(productId: string): Promise<Product | null> {
    const product = this.items.find((product) => product.id === productId);

    if (!product) {
      return null;
    }

    return product;
  }

  async cloneProduct(product: Product): Promise<Product> {
    return await this.createProduct(product);
  }

  async getProductInformation({
    query,
    takePage,
    page,
  }: GetProductInformationParams): Promise<Product[]> {
    let productsOrProduct = this.items;

    if (query) {
      productsOrProduct = this.items.filter((product) => {
        const regex = new RegExp(query, 'i');

        const regexTestAvailability = regex.test(
          String(product.props.availability),
        );
        const regexTestIngredients = regex.test(product.props.ingredients);
        const regexTestName = regex.test(product.props.name);
        const regexTestOthers = regex.test(String(product.props.others));
        const regexTestPrice = regex.test(String(product.props.price));
        const regexTestThumbnail = regex.test(product.props.thumbnail);
        const regexTestVolume = regex.test(product.props.volume);

        const search = [
          regexTestName,
          regexTestAvailability,
          regexTestIngredients,
          regexTestOthers,
          regexTestPrice,
          regexTestThumbnail,
          regexTestVolume,
        ];

        return search;
      });
    }

    return productsOrProduct.slice((page - 1) * takePage, page * takePage);
  }

  async listAllProducts(page: number, takePage: number): Promise<Product[]> {
    const productsOrProduct = this.items.map((products) => products);

    return productsOrProduct.slice((page - 1) * takePage, page * takePage);
  }

  async updateProduct(product: Product): Promise<Product> {
    const productIndex = this.items.findIndex(
      (findProduct) => product.id === findProduct.id,
    );

    this.items[productIndex] = product;

    return product;
  }

  async deleteProduct(product: Product): Promise<void> {
    const productIndex = this.items.findIndex(
      (findProduct) => findProduct.id === product.id,
    );

    this.items.splice(productIndex, 1);
  }
}
