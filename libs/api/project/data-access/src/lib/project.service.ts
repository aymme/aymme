import { ConflictException, Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
import slugify from 'slugify';
import { Project } from '@prisma/client';
import { PrismaService } from '@aymme/api/database/data-access';
import { CreateProjectDto, UpdateProjectConfigurationDto, UpdateProjectDto } from './dto';

@Injectable()
export class ProjectService {
  private logger = new Logger(ProjectService.name);
  constructor(private prisma: PrismaService) {}

  async getAll(): Promise<Project[]> {
    return this.prisma.project.findMany({
      include: { configuration: true },
    });
  }

  async getById(id: string): Promise<Project> {
    const found = await this.prisma.project.findUnique({
      where: {
        id,
      },
      include: { configuration: true },
    });

    if (!found) {
      throw new NotFoundException();
    }

    return found;
  }

  async getBySlug(slug: string): Promise<Project> {
    const found = await this.prisma.project.findUnique({
      where: {
        slug,
      },
      include: { configuration: true },
    });

    if (!found) {
      throw new NotFoundException();
    }

    return found;
  }

  async create(createProjectDto: CreateProjectDto): Promise<Project> {
    const { name } = createProjectDto;

    // TODO: Maybe by name is not a good choice, maybe we need to find it by slug?
    const found = await this.prisma.project.findFirst({ where: { name } });

    if (found) {
      this.logger.error(`Project already exist "${name}". DTO: ${JSON.stringify(createProjectDto)}`);

      throw new ConflictException('Project already exist');
    }

    try {
      return await this.prisma.project.create({
        data: {
          name,
          slug: slugify(name, {
            lower: true,
          }),
          configuration: {
            create: {
              ignoreParams: undefined,
            },
          },
          collections: {
            create: [{ name: 'default' }], // TODO needs to come from config
          },
        },
      });
    } catch (e) {
      this.logger.error(`Failed creating the project "${name}". DTO: ${JSON.stringify(createProjectDto)}`);
      this.logger.error(e.message);
      throw new InternalServerErrorException();
    }
  }

  async update(id: string, updateProjectDto: UpdateProjectDto): Promise<Project> {
    const { name } = updateProjectDto;
    await this.getById(id);

    try {
      return await this.prisma.project.update({
        where: {
          id,
        },
        data: {
          name,
        },
        include: { configuration: true },
      });
    } catch (e) {
      console.log(e);
      this.logger.error(`Failed update the project with ID "${id}". DTO: ${JSON.stringify(updateProjectDto)}`);
      this.logger.error(e.message);
      throw new InternalServerErrorException();
    }
  }

  async updateConfiguration(id: string, updateConfigurationDto: UpdateProjectConfigurationDto) {
    const { ignoreParams } = updateConfigurationDto;
    await this.getById(id); // TODO Temporary workaround. We should maybe catch Prisma exceptions

    try {
      return await this.prisma.project.update({
        where: {
          id,
        },
        data: {
          configuration: {
            update: {
              ignoreParams: ignoreParams.join(','),
            },
          },
        },
        include: {
          configuration: true,
        },
      });
    } catch (e) {
      this.logger.error(
        `Failed update the project configuration with Project ID "${id}". DTO: ${JSON.stringify(
          updateConfigurationDto
        )}`
      );
      this.logger.error(e.message);

      throw new InternalServerErrorException();
    }
  }

  async delete(id: string): Promise<void> {
    await this.getById(id);

    try {
      await this.prisma.project.delete({
        where: {
          id,
        },
      });
    } catch (e) {
      this.logger.error(`Failed to delete the project with ID: ${id}`);
      this.logger.error(e.message);
      throw new InternalServerErrorException();
    }
  }
}
