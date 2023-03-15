import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
} from '@nestjs/common';

import type { Response } from 'express';
import { responseValueCode } from './types';

@Catch(HttpException)
export class HttpFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const res = ctx.getResponse<Response>();

    const status = exception.getStatus();
    const data = {
      data: exception.message,
      success: false,
      code: responseValueCode.fail,
    };

    res.status(status).json(data);
  }
}
