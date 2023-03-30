import { MakeProduct } from '../../../test/factories/MakeProductFactory'
import { MakeUpdateProduct } from '../../../test/factories/MakeUpdateProductFactory'
import { Product } from '../../domain/entities/Product'
import { ProductDoesNotExistsError } from '../../domain/useCases/errors/ProductDoesNotExistsError'

describe('Update product handler', () => {
  it('should not be able to update a product with wrong id', async () => {
    const response = await new MakeUpdateProduct().toHandler({
      productId: 'ddb9b22d-121a-49b0-a39d-d5885a3d0304'
    })

    expect(response.isLeft()).toBeTruthy()
    expect(response.value).toBeInstanceOf(ProductDoesNotExistsError)
  })

  it('should not be able to update a product with wrong data', async () => {
    const product = (await new MakeProduct().toHandler()).value as Product
    const response = await new MakeUpdateProduct().toHandler({
      productId: product.id,
      override: {
        name: '',
        ingredients: '',
        availability: Boolean(),
        volume: 'mg',
        price: 0,
        thumbnail: '',
        others: 'O'
      }
    })

    expect(response.isLeft()).toBeTruthy()
  })

  it('should be able to update a product', async () => {
    const product = (await new MakeProduct().toHandler()).value as Product
    const response = await new MakeUpdateProduct().toHandler({
      productId: product.id
    })

    expect(response.isRight()).toBeTruthy()
  })
})
