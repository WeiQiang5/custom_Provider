import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();

    // 设置错误信息
    const message = exception.message
      ? exception.message
      : `${status >= 500 ? 'service Error' : 'Client Error'}`;
    const errorResponse = {
      data: {},
      message,
      code: -1,
      path: request.url,
    };

    response.status(status).json(errorResponse);
  }
}
