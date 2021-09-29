import { IEndpoint } from './endpoint.interface';

export interface IProject {
  id: string;
  name: string;
  slug: string;
  endpoints?: IEndpoint[];
}
