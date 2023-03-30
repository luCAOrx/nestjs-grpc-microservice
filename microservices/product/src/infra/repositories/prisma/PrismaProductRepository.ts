import {
  GetProductInformationParams,
  ProductRepository,
} from '../../../domain/repositories/ProductRepository';
import { Product } from '../../../domain/entities/Product';
import { ProductMapper } from '../../mappers/ProductMapper';
import { prismaService } from './prisma.service';

export class PrismaProductRepository implements ProductRepository {
  async createProduct(product: Product): Promise<Product> {
    const data = ProductMapper.toPersistence(product);

    const productCreated = await prismaService.products.create({ data });

    return ProductMapper.toDomain(productCreated);
  }

  async findProductById(productId: string): Promise<Product | null> {
    const product = await prismaService.products.findUnique({
      where: {
        id: productId,
      },
    });

    if (!product) {
      return null;
    }

    return ProductMapper.toDomain(product);
  }

  async cloneProduct(product: Product): Promise<Product> {
    const data = ProductMapper.toPersistence(product);

    const productCloned = await prismaService.products.create({ data });

    return ProductMapper.toDomain(productCloned);
  }

  async getProductInformation(
    params: GetProductInformationParams,
  ): Promise<Product[]> {
    const products = await prismaService.products.findMany({
      where: {},
      orderBy: { id: 'desc' },
      take: params.takePage,
      skip: (params.page - 1) * 5,
    });

    const productInformation = products.map((product) =>
      ProductMapper.toDomain(product),
    );

    return productInformation;
  }

  async listAllProducts(page: number, takePage: number): Promise<Product[]> {
    const products = await prismaService.products.findMany({
      orderBy: { id: 'desc' },
      take: takePage,
      skip: (page - 1) * 5,
    });

    const listProducts = products.map((product) =>
      ProductMapper.toDomain(product),
    );

    return listProducts;
  }

  async updateProduct(product: Product): Promise<Product> {
    const data = ProductMapper.toPersistence(product);

    const productUpdate = await prismaService.products.update({
      where: { id: data.id },
      data,
    });

    return ProductMapper.toDomain(productUpdate);
  }

  async deleteProduct(product: Product): Promise<void> {
    await prismaService.products.delete({
      where: { id: product.id },
    });
  }
}
