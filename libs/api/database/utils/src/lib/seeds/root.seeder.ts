import { Seeder } from '@jorgebodega/typeorm-seeding';
import { Connection } from 'typeorm';
import { ProjectFactory } from '../factories/project.factory';
import { CollectionFactory } from '../factories/collection.factory';
import { EndpointFactory } from '../factories/endpoint.factory';
import { Response } from '@aymme/api/shared/data-access';

export class RootSeeder extends Seeder {
  async run(connection: Connection): Promise<void> {
    const project = await new ProjectFactory().create({
      name: 'AYMME',
      slug: 'aymme',
    });

    const collection = await new CollectionFactory()
      .map((collection) => {
        collection.projectId = project.id;
        collection.name = 'default';
      })
      .create();

    await new EndpointFactory()
      .map((endpoint) => {
        endpoint.projectId = project.id;
        endpoint.collectionId = collection.id;
        endpoint.responses = [new Response()];
      })
      .createMany(3);

    return Promise.resolve(undefined);
  }
}
