import { right } from '@core/domain/logic/either';
import { Validation } from './validations/validation';

export class Name {
  private readonly name: string;

  public get value(): string {
    return this.name;
  }

  constructor(name: string) {
    this.name = name;
  }

  static create(name: string) {
    new Validation().isRequired(name);

    return right(name);
  }
}
