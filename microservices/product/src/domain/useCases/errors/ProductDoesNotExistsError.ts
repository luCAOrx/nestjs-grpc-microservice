import { UseCaseError } from '@core/domain/errors/UseCaseError';

export class ProductDoesNotExistsError extends Error implements UseCaseError {
  constructor() {
    super('Product does not exists.');
    this.name = 'ProductDoesNotExistsError';
  }
}
