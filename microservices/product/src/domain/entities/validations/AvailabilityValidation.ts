import { DomainError } from '@core/domain/errors/DomainError';

export class AvailabilityValidation extends Error implements DomainError {
  public validate(availability: boolean): boolean {
    if (!availability) {
      this.name = 'ValidationErrorInAvailabilityField';
      this.message = 'The availability field is required.';

      return false;
    }

    return true;
  }
}
