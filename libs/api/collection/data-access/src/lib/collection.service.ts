import { Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
import { Collection, Endpoint } from '@prisma/client';
import { PrismaService } from '@aymme/api/database/data-access';
import { UpdateCollectionNameDto } from './dto/update-collection-name.dto';
import { UpdateCollectionDto } from './dto/update-collection.dto';
import { CreateCollectionDto } from './dto/create-collection.dto';

@Injectable()
export class CollectionService {
  private logger = new Logger(CollectionService.name);

  constructor(private prisma: PrismaService) {}

  async getAllByProjectID(projectId: string): Promise<Array<Collection & { endpoints: Endpoint[] }>> {
    return this.prisma.collection.findMany({
      where: {
        projectId,
      },
      orderBy: {
        order: 'asc',
      },
      include: {
        endpoints: {
          orderBy: {
            order: 'asc',
          },
        },
      },
    });
  }

  async getById(id: string, projectId: string): Promise<Collection> {
    const found = await this.prisma.collection.findFirst({
      where: { id, projectId },
    });

    if (!found) {
      throw new NotFoundException();
    }

    return found;
  }

  async create(projectId: string, data: CreateCollectionDto): Promise<Collection> {
    const { name } = data;

    try {
      return this.prisma.$transaction(async () => {
        const lastOrderNumber = await this.prisma.collection.findFirst({
          where: {
            projectId,
          },
          orderBy: {
            order: 'desc',
          },
        });

        return await this.prisma.collection.create({
          data: {
            name,
            order: lastOrderNumber.order + 1,
            project: {
              connect: {
                id: projectId,
              },
            },
          },
        });
      });
    } catch (e) {
      this.logger.error(e.message);
      this.logger.error(`Failed to create the collection "${name}". DTO: ${JSON.stringify(data)}`);
      throw new InternalServerErrorException();
    }
  }

  async updateName(projectId: string, id: string, data: UpdateCollectionNameDto): Promise<Collection> {
    const { name } = data;
    await this.getById(id, projectId);

    try {
      return await this.prisma.collection.update({
        where: {
          id,
        },
        data: {
          name,
        },
      });
    } catch (e) {
      this.logger.error(`Failed to update the collection "${name}". DTO: ${JSON.stringify(data)}`);
      this.logger.error(e.message);
      throw new InternalServerErrorException();
    }
  }

  async update(projectId: string, data: UpdateCollectionDto[]): Promise<Array<Collection & { endpoints: Endpoint[] }>> {
    return await this.prisma.$transaction(
      data.map((collection) =>
        this.prisma.collection.update({
          where: { id: collection.id },
          data: {
            name: collection.name,
            order: collection.order,
            endpoints: {
              connect: collection.endpoints && collection.endpoints.map((endpoint) => ({ id: endpoint.id })),
              update:
                collection.endpoints &&
                collection.endpoints.map((endpoint) => ({
                  where: { id: endpoint.id },
                  data: { order: endpoint.order },
                })),
            },
          },
          include: {
            endpoints: {
              orderBy: {
                order: 'asc',
              },
            },
          },
        })
      )
    );
  }

  async delete(projectId: string, id: string): Promise<void> {
    const project = await this.getById(id, projectId);

    if (project.name === 'default') {
      this.logger.error(`Not allowed to delete default collection with ID: ${id}`);
      throw new InternalServerErrorException('Not allowed to delete default collection');
    }

    try {
      await this.prisma.collection.delete({
        where: { id },
      });
    } catch (e) {
      this.logger.error(`Failed to delete the collection with ID: ${id}`);
      this.logger.error(e.message);
      throw new InternalServerErrorException();
    }
  }
}
