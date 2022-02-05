export interface UpdateEndpointDto {
  activeStatusCode?: number;
  emptyArray?: boolean;
  delay?: boolean;
  collectionId?: string;
  headers?: HeaderDto[];
  responses?: ResponseDto[];
}

interface HeaderDto {
  name: string;
  value: string;
}

interface ResponseDto {
  id?: string;
  statusCode: number;
  body?: string;
}
