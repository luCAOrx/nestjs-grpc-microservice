import { DomainError } from '@core/domain/errors/domainError';

export class NameValidation extends Error implements DomainError {
  public validate(name: string): boolean {
    const regexLetters = /^([a-zA-Zà-úÀ-Ú]|\s+)+$/;

    if (!name) {
      this.name = 'ValidationErrorInNameField';
      this.message = 'Name should not be empty';

      return false;
    }

    if (!name.match(regexLetters)) {
      this.name = 'ValidationErrorInNameField';
      this.message = 'The name field only accepts letters.';

      return false;
    }

    if (name.trim().length < 2) {
      this.name = 'ValidationErrorInNameField';
      this.message = 'The name field allows at least 2 characters.';

      return false;
    }

    if (name.trim().length > 255) {
      this.name = 'ValidationErrorInNameField';
      this.message = 'The name field allows a maximum of 255 characters.';

      return false;
    }

    return true;
  }
}
