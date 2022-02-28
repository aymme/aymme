import { ConflictException, Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
import slugify from 'slugify';
import { Project, ProjectConfiguration } from '@aymme/api/shared/data-access';

import { ProjectRepository } from './project.repository';
import { CreateProjectDto, UpdateProjectConfigurationDto, UpdateProjectDto } from './dto';

@Injectable()
export class ProjectService {
  private logger = new Logger(ProjectService.name);
  constructor(private projectRepository: ProjectRepository) {}

  async getAll(): Promise<Project[]> {
    return this.projectRepository.find();
  }

  async getById(id: string): Promise<Project> {
    const found = await this.projectRepository.findOne({
      id,
    });

    if (!found) {
      throw new NotFoundException();
    }

    return found;
  }

  async getBySlug(slug: string): Promise<Project> {
    const found = await this.projectRepository.findOne({
      slug,
    });

    if (!found) {
      throw new NotFoundException();
    }

    return found;
  }

  async create(createProjectDto: CreateProjectDto): Promise<Project> {
    const { name } = createProjectDto;

    // TODO: Maybe by name is not a good choice, maybe we need to find it by slug?
    const found = await this.projectRepository.findOne({ name });

    if (found) {
      this.logger.error(`Project already exist "${name}". DTO: ${JSON.stringify(createProjectDto)}`);

      throw new ConflictException('Project already exist');
    }

    const project = this.projectRepository.create();

    project.name = name;
    project.slug = slugify(name, {
      lower: true,
    });
    project.configuration = new ProjectConfiguration();

    try {
      await project.save();
    } catch (e) {
      this.logger.error(`Failed creating the project "${name}". DTO: ${JSON.stringify(createProjectDto)}`);
      this.logger.error(e.message);
      throw new InternalServerErrorException();
    }

    return project;
  }

  async update(id: string, updateProjectDto: UpdateProjectDto): Promise<Project> {
    const { name } = updateProjectDto;
    const project = await this.getById(id);

    project.name = name;

    try {
      await project.save();
    } catch (e) {
      this.logger.error(`Failed update the project with ID "${project.id}". DTO: ${JSON.stringify(updateProjectDto)}`);
      this.logger.error(e.message);
      throw new InternalServerErrorException();
    }

    return project;
  }

  async updateConfiguration(id: string, updateConfigurationDto: UpdateProjectConfigurationDto) {
    const { ignoreParams } = updateConfigurationDto;
    const project = await this.getById(id);

    project.configuration.ignoreParams = ignoreParams;

    try {
      await project.save();
    } catch (e) {
      this.logger.error(
        `Failed update the project configuration with Project ID "${project.id}". DTO: ${JSON.stringify(
          updateConfigurationDto
        )}`
      );
      this.logger.error(e.message);

      throw new InternalServerErrorException();
    }

    return project;
  }
  async delete(id: string): Promise<void> {
    await this.projectRepository.delete({ id });
  }
}
