import { define } from 'typeorm-seeding';
import { faker as Faker } from '@faker-js/faker';
import { Project } from '@aymme/api/shared/data-access';

define(Project, (faker: typeof Faker) => {
  const project = new Project();
  project.name = faker.company.bsNoun();

  return project;
});
