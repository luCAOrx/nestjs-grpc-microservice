import { Controller, OnModuleInit, Param, Post } from '@nestjs/common';
import { Client, ClientGrpc, RpcException } from '@nestjs/microservices';
import { ProductResponse, ProductService } from '@microservice/grpc-interface';
import { productMicroserviceOptions } from '@microservice/grpc-options';

@Controller('product')
export class CloneProductController implements OnModuleInit {
  @Client(productMicroserviceOptions)
  private client: ClientGrpc;

  private productService: ProductService;

  onModuleInit() {
    this.productService =
      this.client.getService<ProductService>('ProductService');
  }

  @Post('cloneProduct/:productId')
  async cloneProductController(
    @Param('productId') productId: string,
  ): Promise<ProductResponse> {
    try {
      const product = await this.productService.cloneProduct(productId);

      return product;
    } catch (error) {
      throw new RpcException({ code: error.code, message: error.message });
    }
  }
}
