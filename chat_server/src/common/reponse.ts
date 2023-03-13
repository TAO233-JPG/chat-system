import {
  Injectable,
  NestInterceptor,
  CallHandler,
  ExecutionContext,
} from '@nestjs/common';
import { map, Observable } from 'rxjs';

interface Data<T> {
  data: T;
  code: number;
  success: true;
}

@Injectable()
export class Response<T = any> implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler<T>,
  ): Observable<Data<T>> {
    return next.handle().pipe(
      map((data) => {
        console.log('Response-data', data);

        return {
          data,
          code: 0,
          success: true,
        };
      }),
    );
  }
}
