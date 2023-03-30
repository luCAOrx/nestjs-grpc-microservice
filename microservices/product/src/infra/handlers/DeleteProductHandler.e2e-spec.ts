import { DeleteProductHandler } from './DeleteProductHandler'
import { MakeProduct } from '../../../test/factories/MakeProductFactory'
import { Product } from '../../domain/entities/Product'
import { ProductDoesNotExistsError } from '../../domain/useCases/errors/ProductDoesNotExistsError'

const sut = new DeleteProductHandler()

describe('Delete product handler', () => {
  it('should not be able to delete a product with wrong id', async () => {
    const response = await sut.handle({
      productId: 'ddb9b22d-121a-49b0-a39d-d5885a3d0304'
    })

    expect(response.isLeft()).toBeTruthy()
    expect(response.value).toBeInstanceOf(ProductDoesNotExistsError)
  })

  it('should be able to delete a product', async () => {
    const product = (await new MakeProduct().toHandler()).value as Product

    const response = await sut.handle({
      productId: product.id
    })

    expect(response.isRight()).toBeTruthy()
  })
})
