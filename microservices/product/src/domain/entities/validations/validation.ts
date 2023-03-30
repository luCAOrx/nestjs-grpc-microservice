import { Either, left, right } from '@core/domain/logic/either';
import { RequiredFieldError } from './errors/requiredFieldError';

export class Validation {
  public isRequired(data: any): Either<RequiredFieldError, null> {
    const fields = Object.getOwnPropertyNames(data);
    for (const field of fields) {
      if (
        data[field] === null ||
        data[field] === undefined ||
        (typeof data[field] === 'string' && data[field].trim() === '')
      ) {
        return left(new RequiredFieldError(field));
      }
    }

    return right(null);
  }
}
