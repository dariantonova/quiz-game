import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  Injectable,
} from '@nestjs/common';
import { CoreConfig, Environment } from '../../core.config';
import { Request, Response } from 'express';

@Injectable()
@Catch(HttpException)
export class HttpExceptionsFilter implements ExceptionFilter {
  constructor(private coreConfig: CoreConfig) {}

  catch(exception: HttpException, host: ArgumentsHost): any {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();

    if (status === 500 && this.coreConfig.env !== Environment.PRODUCTION) {
      response.status(status).json(exception);
      return;
    }

    response.sendStatus(status);
  }
}
