import { ICollection, IEndpoint } from '@aymme/shared/model';

export class UpdateCollectionDto implements ICollection {
  endpoints: IEndpoint[];
  id: string;
  name: string;
  order: number;
}
