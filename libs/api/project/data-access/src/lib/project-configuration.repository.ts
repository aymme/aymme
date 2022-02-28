import { EntityRepository, Repository } from 'typeorm';
import { ProjectConfiguration } from '@aymme/api/shared/data-access';

@EntityRepository(ProjectConfiguration)
export class ProjectConfigurationRepository extends Repository<ProjectConfiguration> {}
