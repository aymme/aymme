import { Factory, Seeder } from 'typeorm-seeding';
import { Project } from '@aymme/api/shared/data-access';

export default class CreateProjects implements Seeder {
  public async run(factory: Factory): Promise<void> {
    await factory(Project)().createMany(3);
  }
}
