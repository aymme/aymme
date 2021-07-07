import { IProject } from './project.interface';
import { IResponse } from './response.interface';
import { IHeader } from './header.interface';

export interface IEndpoint {
  id: string;
  path: string;
  activeStatusCode: number;
  emptyArray: boolean;
  method: string;
  forward: boolean;
  project?: IProject;
  responses?: IResponse[];
  headers?: IHeader[];
}
