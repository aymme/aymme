import { IProject } from './project.interface';
import { IResponse } from './response.interface';
import { IHeader } from './header.interface';
import { ICollection } from './collection.interface';

export interface IEndpoint {
  id: string;
  path: string;
  activeStatusCode: number;
  emptyArray: boolean;
  method: string;
  forward: boolean;
  delay: number;
  project?: IProject;
  responses?: IResponse[];
  headers?: IHeader[];
  collection?: ICollection;
  collectionId?: string;
  order: number;
}
