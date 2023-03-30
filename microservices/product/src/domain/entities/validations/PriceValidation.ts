import { DomainError } from '@core/domain/errors/DomainError';

export class PriceValidation extends Error implements DomainError {
  public validate(price: number): boolean {
    if (!price) {
      this.name = 'ValidationErrorInPriceField';
      this.message = 'The price field is required.';

      return false;
    }

    if (!price.toString().match(/^([0-9]|\s+)+$/)) {
      this.name = 'ValidationErrorInPriceField';
      this.message = 'The price field only accepts numbers.';

      return false;
    }

    if (price.toString().length > 6) {
      this.name = 'ValidationErrorInPriceField';
      this.message = 'Price field allows a maximum of 6 digits.';

      return false;
    }

    return true;
  }
}
