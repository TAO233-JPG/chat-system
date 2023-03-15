export enum responseTypes {
  init = 'init',
  sendMessage = 'sendMessage',
  getRecord = 'getRecord',
}

export interface WsResponseData {
  type: responseTypes;
  data: Record<string, any>;
  status: WsStatus;
}
export enum WsStatus {
  success = 'success',
  fail = 'fail',
}

export const formateData = (
  type: responseTypes,
  data: Record<string, any>,
  status: WsStatus = WsStatus.success,
): WsResponseData => {
  return {
    type,
    data,
    status,
  };
};
