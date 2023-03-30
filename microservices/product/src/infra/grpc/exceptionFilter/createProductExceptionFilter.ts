import { NameValidation } from '@domain/entities/validations';
import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { Response } from 'express';

@Catch(NameValidation)
export class NameExceptionFilter implements ExceptionFilter {
  catch(exception: NameValidation, host: ArgumentsHost) {
    const context = host.switchToHttp();
    const response = context.getResponse<Response>();

    return response.status(400).json({
      error: {
        name: exception.name,
        message: exception.message,
        status: 400,
      },
    });
  }
}
