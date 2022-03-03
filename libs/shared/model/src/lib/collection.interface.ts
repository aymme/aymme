import { IEndpoint } from './endpoint.interface';

export interface ICollection {
  id: string;
  name: string;
  endpoints?: IEndpoint[];
  order: number;
  projectId?: string;
}
