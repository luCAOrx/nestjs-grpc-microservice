import { MakeProduct } from '../../../test/factories/MakeProductFactory'
import { ListAllProductsHandler } from './ListAllProductsHandler'

const sut = new ListAllProductsHandler()

describe('List all products handler', () => {
  beforeAll(async () => {
    for (let i = 0; i < 20; i++) {
      await new MakeProduct().toHandler()
    }
  })

  it('should be able to list all products', async () => {
    const product = await sut.handle({})

    expect(product.length).toEqual(5)
  })

  it('should be able to paginate', async () => {
    let product = await sut.handle({ takePage: 5 })

    expect(product.length).toEqual(5)

    product = await sut.handle({ takePage: 5, page: 2 })

    expect(product.length).toEqual(5)
  })
})
