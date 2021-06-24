import {
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { Project } from '@aymme/api/shared/data-access';

import { ProjectRepository } from './project.repository';
import { CreateProjectDto, UpdateProjectDto } from './dto';

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

  async create(createProjectDto: CreateProjectDto): Promise<Project> {
    const { name } = createProjectDto;
    const project = this.projectRepository.create();
    project.name = name;
    try {
      await project.save();
    } catch (e) {
      this.logger.error(
        `Failed creating the project "${name}". DTO: ${JSON.stringify(
          createProjectDto
        )}`
      );
      throw new InternalServerErrorException();
    }

    return project;
  }

  async update(
    id: string,
    updateProjectDto: UpdateProjectDto
  ): Promise<Project> {
    const { name } = updateProjectDto;
    const project = await this.getById(id);

    project.name = name;

    try {
      await project.save();
    } catch (e) {
      this.logger.error(
        `Failed update the project with ID "${
          project.id
        }". DTO: ${JSON.stringify(updateProjectDto)}`
      );
      throw new InternalServerErrorException();
    }

    return project;
  }
}
