import { ConflictException, Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
import slugify from 'slugify';
import { Header, Prisma, Project, ProjectConfiguration, Response } from '@prisma/client';
import { PrismaService } from '@aymme/api/database/data-access';
import { CreateProjectDto, UpdateProjectConfigurationDto, UpdateProjectDto } from './dto';
import { ProjectWithRelations } from './types';

@Injectable()
export class ProjectService {
  private logger = new Logger(ProjectService.name);
  constructor(private prisma: PrismaService) {}

  async getAll(): Promise<Array<Project & { configuration: ProjectConfiguration }>> {
    return this.prisma.project.findMany({
      include: { configuration: true },
    });
  }

  async getById(id: string): Promise<Project & { configuration: ProjectConfiguration }> {
    const found = await this.prisma.project.findUnique({
      where: {
        id,
      },
      include: {
        configuration: true,
        collections: {
          include: {
            endpoints: true,
          },
        },
        _count: true,
      }, // NOTE `_count` can be useful for the import
    });

    if (!found) {
      throw new NotFoundException();
    }

    return found;
  }

  async getBySlug(slug: string): Promise<Project & { configuration: ProjectConfiguration }> {
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
    const { ignoreParams, variables } = updateConfigurationDto;
    await this.getById(id); // TODO Temporary workaround. We should maybe catch Prisma exceptions

    try {
      return await this.prisma.project.update({
        where: {
          id,
        },
        data: {
          configuration: {
            update: {
              ignoreParams,
              variables,
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

  async exportProject(id: string): Promise<ProjectWithRelations> {
    const found = await this.prisma.project.findUnique({
      where: {
        id,
      },
      include: {
        configuration: true,
        collections: {
          include: {
            endpoints: {
              include: {
                headers: true,
                responses: true,
              },
            },
          },
        },
        _count: true,
      }, // NOTE `_count` can be useful for the import
    });

    if (!found) {
      throw new NotFoundException();
    }

    return found;
  }

  async importProject(id: string, content: ProjectWithRelations): Promise<void> {
    await this.getById(id);

    const { name, configuration, collections } = content;

    try {
      this.prisma.$transaction(async () => {
        // 1. Update the project & project configuration
        await this.prisma.project.update({
          where: {
            id,
          },
          data: {
            configuration: {
              update: {
                ignoreParams: configuration.ignoreParams,
              },
            },
          },
        });

        // 2. Update collections
        for (const collection of collections) {
          const newCollection = await this.prisma.collection.upsert({
            where: {
              projectId_name: {
                projectId: id,
                name: collection.name,
              },
            },
            create: {
              name: collection.name,

              project: {
                connect: {
                  id,
                },
              },
            },
            update: {},
          });

          // 3. Update endpoints
          for (const endpoint of collection.endpoints) {
            const newEndpoint = await this.prisma.endpoint.upsert({
              where: {
                projectId_path_method: {
                  projectId: id,
                  path: endpoint.path,
                  method: endpoint.method,
                },
              } as any,
              create: {
                path: endpoint.path,
                activeStatusCode: endpoint.activeStatusCode,
                emptyArray: endpoint.emptyArray,
                forward: endpoint.forward,
                method: endpoint.method,
                delay: endpoint.delay,
                project: {
                  connect: {
                    id,
                  },
                },
                collection: {
                  connect: {
                    id: newCollection.id,
                  },
                },
              },
              update: {
                path: endpoint.path,
                activeStatusCode: endpoint.activeStatusCode,
                emptyArray: endpoint.emptyArray,
                forward: endpoint.forward,
                method: endpoint.method,
                delay: endpoint.delay,
                collection: {
                  connect: {
                    id: newCollection.id,
                  },
                },
              },
            });

            // 4. Update responses
            for (const response of endpoint.responses) {
              await this.prisma.response.upsert({
                where: {
                  endpointId_statusCode: {
                    endpointId: newEndpoint.id,
                    statusCode: response.statusCode,
                  },
                },
                create: {
                  statusCode: response.statusCode,
                  body: response.body,
                  endpoint: {
                    connect: {
                      id: newEndpoint.id,
                    },
                  },
                },
                update: {
                  statusCode: response.statusCode,
                  body: response.body,
                  endpoint: {
                    connect: {
                      id: newEndpoint.id,
                    },
                  },
                },
              });
            }

            // 5. Update headers
            for (const header of endpoint.headers) {
              const found = await this.prisma.header.findFirst({
                where: {
                  name: header.name,
                  endpointId: newEndpoint.id,
                },
              });

              await this.prisma.header.upsert({
                where: {
                  id: found && found.id ? found.id : '',
                },
                create: {
                  name: header.name,
                  value: header.value,
                  endpoint: {
                    connect: {
                      id: newEndpoint.id,
                    },
                  },
                },
                update: {
                  value: header.value,
                },
              });
            }
          }
        }
      });
    } catch (e) {
      this.logger.error(`Failed import the project with ID "${id}".`);
      this.logger.error(e.message);

      throw new InternalServerErrorException();
    }
  }

  private prepareHeadersData(headers: Header[], id: string): Prisma.HeaderUpdateManyWithoutEndpointInput {
    return {
      create: headers.map(({ name, value }) => {
        return {
          name,
          value,
        };
      }),
      upsert: headers.map(({ id, name, value }) => {
        return {
          where: {
            id,
            name,
          },
          update: {
            name,
            value,
          },
          create: {
            name,
            value,
          },
        };
      }),
    };
  }

  private prepareResponsesData(responses: Response[], id: string): Prisma.ResponseUpdateManyWithoutEndpointInput {
    return {
      upsert: responses.map(({ id, statusCode, body }) => {
        return {
          where: {
            id,
          },
          update: {
            statusCode,
            body,
          },
          create: {
            statusCode,
            body,
          },
        };
      }),
    };
  }
}
