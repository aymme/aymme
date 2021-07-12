import { IEndpoint } from '@aymme/shared/data-access';

export interface ICategory {
  id: string;
  name: string;
  endpoints?: IEndpoint[];
}
