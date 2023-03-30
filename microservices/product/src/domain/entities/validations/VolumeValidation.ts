import { DomainError } from '@core/domain/errors/DomainError';

export class VolumeValidation extends Error implements DomainError {
  public validate(volume: string): boolean {
    if (!volume) {
      this.name = 'ValidationErrorInVolumeField';
      this.message = 'The volume field is required.';

      return false;
    }

    if (volume.match(/\b[a-zA-Zà-úÀ-Ú]/)) {
      this.name = 'ValidationErrorInVolumeField';
      this.message = 'The volume field not accepts letters in start.';

      return false;
    }

    if (volume.trim().length < 3) {
      this.name = 'ValidationErrorInVolumeField';
      this.message = 'The name field allows at least 3 characters.';

      return false;
    }

    if (volume.trim().length > 5) {
      this.name = 'ValidationErrorInVolumeField';
      this.message = 'The volume field allows a maximum of 5 characters.';

      return false;
    }

    if (!volume.match(/(ml|mg)$/)) {
      this.name = 'ValidationErrorInVolumeField';
      this.message = 'The volume field not accepts this suffix type.';

      return false;
    }

    return true;
  }
}
