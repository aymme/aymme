import { IEndpoint } from '@aymme/shared/model';

export interface IAvailableStatusCode {
  id: string;
  statusCode: number;
}

export interface EndpointEntity extends IEndpoint {}
