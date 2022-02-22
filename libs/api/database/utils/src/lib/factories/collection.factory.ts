import { Factory } from '@jorgebodega/typeorm-seeding';
import { faker } from '@faker-js/faker';
import { Collection } from '@aymme/api/shared/data-access';

export class CollectionFactory extends Factory<Collection> {
  protected definition(): Promise<Collection> {
    const collection = new Collection();
    collection.name = faker.commerce.department();

    return Promise.resolve(collection);
  }
}
