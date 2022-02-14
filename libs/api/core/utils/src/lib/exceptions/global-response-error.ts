import { Request } from 'express';

export const GlobalResponseError: (statusCode: number, message: string, code: string, request: Request) => IResponseError = (
  statusCode: number,
  code: string,
  message: string,
  request: Request
): IResponseError => {
  return {
    statusCode: statusCode,
    code,
    message,
    timestamp: new Date().toISOString(),
    path: request.url,
    method: request.method
  };
};

export interface IResponseError {
  statusCode: number;
  code: string;
  message: string;
  timestamp: string;
  path: string;
  method: string;
}
