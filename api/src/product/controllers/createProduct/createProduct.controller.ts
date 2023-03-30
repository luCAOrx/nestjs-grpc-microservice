import {
  Body,
  Controller,
  OnModuleInit,
  Post,
  UploadedFile,
  UseInterceptors,
  ValidationPipe,
} from '@nestjs/common';
import { Client, ClientGrpc, RpcException } from '@nestjs/microservices';
import { CreateProductDTO } from '@dto/product/createProductDTO';
import { ProductResponse, ProductService } from '@microservice/grpc-interface';
import { productMicroserviceOptions } from '@microservice/grpc-options';
import { FileInterceptor } from '@nestjs/platform-express';
import { MulterConfig } from '../../config/multerConfig';

@Controller('product')
export class CreateProductController implements OnModuleInit {
  @Client(productMicroserviceOptions)
  private client: ClientGrpc;

  private productService: ProductService;

  onModuleInit() {
    this.productService =
      this.client.getService<ProductService>('ProductService');
  }

  @Post('createProduct')
  @UseInterceptors(FileInterceptor('thumbnail', MulterConfig.getConfig()))
  async createProductController(
    @Body(new ValidationPipe({ transform: true }))
    {
      name,
      ingredients,
      price,
      volume,
      availability,
      others,
    }: CreateProductDTO,
    @UploadedFile() { filename }: Express.Multer.File,
  ): Promise<ProductResponse> {
    try {
      const product = await this.productService.createProduct({
        availability,
        ingredients,
        name,
        others,
        price,
        thumbnail: filename,
        volume,
      });

      return product;
    } catch (error) {
      throw new RpcException({ code: error.code, message: error.message });
    }
  }
}
