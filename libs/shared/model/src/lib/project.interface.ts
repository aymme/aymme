import { IEndpoint } from './endpoint.interface';
import { IProjectConfiguration } from './project-configuration.interface';

export interface IProject {
  id: string;
  name: string;
  slug: string;
  configuration: IProjectConfiguration;
  endpoints?: IEndpoint[];
}
