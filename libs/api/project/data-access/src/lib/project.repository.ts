import { EntityRepository, Repository } from 'typeorm';
import { Project } from '@aymme/api/shared/data-access';

@EntityRepository(Project)
export class ProjectRepository extends Repository<Project> {}
