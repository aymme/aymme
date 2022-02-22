import { Factory } from '@jorgebodega/typeorm-seeding';
import { faker } from '@faker-js/faker';
import slugify from 'slugify';
import { Project } from '@aymme/api/shared/data-access';

export class ProjectFactory extends Factory<Project> {
  protected definition(): Promise<Project> {
    const name = faker.animal.bird();
    const slug = slugify(name, {
      lower: true,
    });

    const project = new Project();

    project.name = name;
    project.slug = slug;

    return Promise.resolve(project);
  }
}
