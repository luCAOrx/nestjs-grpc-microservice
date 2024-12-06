import { Either, left, right } from '@core/domain/logic/either';
import { RequiredFieldError } from './validations/errors/requiredFieldError';
import { Validation } from './validations/validation';

export class Name {
  private readonly name: string;

  get value(): string {
    return this.name;
  }

  constructor(name: string) {
    this.name = name;
  }

  static create(name: string): Either<RequiredFieldError, Name> {
    const fieldIsRequired = new Validation().isRequired(name);

    if (!fieldIsRequired) {
      return left(new RequiredFieldError('The field name should not be empty'));
    }

    return right(new Name(name));
  }
}
