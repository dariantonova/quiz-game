import {
  INestApplication,
  ValidationError,
  ValidationPipe,
} from '@nestjs/common';
import {
  DomainException,
  Extension,
} from '../core/exceptions/domain-exception';
import { DomainExceptionCode } from '../core/exceptions/domain-exception-code';

const formatErrors = (errors: ValidationError[]): Extension[] => {
  const errorsForResponse: Extension[] = [];
  errors.forEach((error) => {
    const field = error.property;
    for (const constraintKey in error.constraints) {
      const message = error.constraints[constraintKey];
      errorsForResponse.push({
        key: field,
        message,
      });
    }
  });
  return errorsForResponse;
};

export function pipesSetup(app: INestApplication) {
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      stopAtFirstError: true,
      exceptionFactory: (errors) => {
        const formattedErrors = formatErrors(errors);
        throw new DomainException({
          code: DomainExceptionCode.BadRequest,
          message: 'Bad request',
          extensions: formattedErrors,
        });
      },
    }),
  );
}
