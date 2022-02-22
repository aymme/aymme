import { Seeder } from '@jorgebodega/typeorm-seeding';
import { Connection } from 'typeorm';
import { ProjectFactory } from '../factories/project.factory';
import { CollectionFactory } from '../factories/collection.factory';

export class RootSeeder extends Seeder {
  async run(connection: Connection): Promise<void> {
    const project = await new ProjectFactory().create({
      name: 'AYMME',
      slug: 'aymme',
    });

    await new CollectionFactory()
      .map((collection) => {
        collection.projectId = project.id;
        collection.name = 'default';
      })
      .create();

    return Promise.resolve(undefined);
  }
}
