import { ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus, ConflictException } from '@nestjs/common';
import { Request, Response } from 'express';
import { QueryFailedError } from 'typeorm';
import { GlobalResponseError } from './global-response-error';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    let message = (exception as any).message.message;
    let code = 'HttpException';

    let status = HttpStatus.INTERNAL_SERVER_ERROR;

    switch (exception.constructor) {
      case HttpException:
        status = (exception as HttpException).getStatus();
        break;
      case ConflictException:
        status = HttpStatus.CONFLICT;
        message = (exception as ConflictException).message;
        break;
      case QueryFailedError:
        status = HttpStatus.UNPROCESSABLE_ENTITY;
        message = (exception as QueryFailedError).message;
        code = (exception as any).code;
        break;
      default:
        status = HttpStatus.INTERNAL_SERVER_ERROR;
    }

    response.status(status).json(GlobalResponseError(status, code, message, request));
  }
}
