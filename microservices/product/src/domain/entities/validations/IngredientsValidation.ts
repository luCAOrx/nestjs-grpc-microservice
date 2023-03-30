import { DomainError } from '@core/domain/errors/DomainError';

export class IngredientsValidation extends Error implements DomainError {
  public validate(ingredients: string): boolean {
    if (!ingredients) {
      this.name = 'ValidationErrorInIngredientsField';
      this.message = 'The ingredients field is required.';

      return false;
    }

    if (ingredients.trim().length < 2) {
      this.name = 'ValidationErrorInIngredientsField';
      this.message = 'The ingredients field allow at least 2 characters.';

      return false;
    }

    if (ingredients.trim().length > 255) {
      this.name = 'ValidationErrorInIngredientsField';
      this.message =
        'The ingredients field allows a maximum of 255 characters.';

      return false;
    }

    return true;
  }
}
