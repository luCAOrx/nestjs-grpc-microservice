export class RequiredFieldError extends Error {
  constructor(field: string) {
    super(`The field ${field} should not be empty`);

    this.name = 'RequiredFieldError';
  }
}
