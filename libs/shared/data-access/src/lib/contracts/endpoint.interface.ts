import { IProject } from './project.interface';
import { IResponse } from './response.interface';

export interface IEndpoint {
  id: string;
  path: string;
  activeStatusCode: number;
  emptyArray: boolean;
  method: string;
  forward: boolean;
  project?: IProject;
  responses?: IResponse[];
}
