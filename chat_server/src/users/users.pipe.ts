// import {
//   ArgumentMetadata,
//   HttpException,
//   HttpStatus,
//   Injectable,
//   PipeTransform,
// } from '@nestjs/common';
// import { plainToInstance } from 'class-transformer';
// import { validate } from 'class-validator';

// @Injectable()
// export class UsersPipe implements PipeTransform {
//   async transform(value: any, metadata: ArgumentMetadata) {
//     console.log('UsersPipe', value, metadata.metatype);
//     const DTO = plainToInstance(metadata.metatype, value);
//     console.log('DTO', DTO);
//     // 通过 validate 验证
//     // DTO 返回一个promise 的错误信息 如果有错误抛出
//     const errors = await validate(DTO);
//     console.log('rreee', errors);
//     console.log('123');

//     if (errors.length) {
//       throw new HttpException(errors, HttpStatus.BAD_REQUEST);
//     }

//     return value;
//   }
// }
