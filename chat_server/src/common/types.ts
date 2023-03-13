export enum responseValueCode {
  success = 0,
  fail = -1,
}
export interface IResponseValue<T = any> {
  data: T;
  code: responseValueCode;
  success: boolean;
}
