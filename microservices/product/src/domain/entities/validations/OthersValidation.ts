import { DomainError } from '@core/domain/errors/DomainError';

export class OthersValidation extends Error implements DomainError {
  public validate(other: string): boolean {
    if (other.trim().length < 2) {
      this.name = 'ValidationErrorInOthersField';
      this.message = 'The field others allows at least 2 characters.';

      return false;
    }

    if (other.trim().length > 255) {
      this.name = 'ValidationErrorInOthersField';
      this.message = 'The field others allows a maximum of 255 characters.';

      return false;
    }

    return true;
  }
}
