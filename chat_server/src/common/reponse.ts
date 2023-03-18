import {
  Injectable,
  NestInterceptor,
  CallHandler,
  ExecutionContext,
} from '@nestjs/common';
import { map, Observable } from 'rxjs';
import { IResponseValue, responseValueCode } from './types';

@Injectable()
export class Response<T = any> implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler<T>,
  ): Observable<IResponseValue<T>> {
    return next.handle().pipe(
      map((data) => {
        return {
          data,
          code: responseValueCode.success,
          success: true,
        };
      }),
    );
  }
}
