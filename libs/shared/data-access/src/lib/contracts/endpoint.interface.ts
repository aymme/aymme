export interface IEndpoint {
  id: string;
  path: string;
  activeStatusCode: number;
  emptyArray: boolean;
  method: string;
  forward: boolean;
}
