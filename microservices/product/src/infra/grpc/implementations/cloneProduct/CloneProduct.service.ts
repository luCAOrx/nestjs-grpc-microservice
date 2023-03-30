import { CloneProductRequestDTO } from '@domain/dtos/ProductDTO';
import { CloneProductResponse } from '@domain/useCases/CloneProductUseCase';
import { CloneProductHandler } from '@infra/handlers/CloneProductHandler';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CloneProductService {
  public async cloneProduct({
    productId,
  }: CloneProductRequestDTO): Promise<CloneProductResponse> {
    const handler = new CloneProductHandler();

    const product = await handler.handle({ productId });

    return product;
  }
}
