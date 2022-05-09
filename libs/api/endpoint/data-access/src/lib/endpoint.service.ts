import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { URLSearchParams } from 'url';
import { Endpoint, Header, Prisma, Project, ProjectConfiguration, Response } from '@prisma/client';
import { PrismaService } from '@aymme/api/database/data-access';
import { UpdateEndpointDto } from './dto/update-endpoint.dto';
import { HeaderDto } from './dto/header.dto';
import { ResponseDto } from './dto/response.dto';

@Injectable()
export class EndpointService {
  private logger = new Logger(EndpointService.name);

  constructor(private prisma: PrismaService) {}

  async intercept(
    path: string,
    query: { [key: string]: string },
    body: object,
    method: string,
    project: Project & { configuration: ProjectConfiguration }
  ): Promise<Endpoint & { responses: Response[]; headers: Header[] }> {
    const _path = path.replace('/api/intercept/', '/');
    const ignoreParams = project.configuration.ignoreParams as string;
    const ignoreParamsList = ignoreParams && ignoreParams.split(',');
    const searchParams = new URLSearchParams();

    for (const param in query) {
      if (ignoreParamsList && !ignoreParamsList.includes(param)) {
        searchParams.append(param, query[param]);
      }
    }

    const url = `${_path}${searchParams.toString().length ? `?${searchParams.toString()}` : ''}`;

    const found = await this.prisma.endpoint.findFirst({
      where: {
        path: url,
        projectId: project.id,
        method,
      },
      include: {
        responses: true,
        headers: true,
      },
    });

    if (found) {
      return found;
    }

    const defaultCollection = await this.prisma.collection.findFirst({
      where: {
        name: 'default',
        projectId: project.id,
      },
    });

    const lastOrderNumber = await this.prisma.endpoint.findFirst({
      where: {
        projectId: project.id,
      },
      orderBy: {
        order: 'desc',
      },
      select: {
        order: true,
      },
    });

    try {
      return await this.prisma.endpoint.create({
        data: {
          path: url,
          method,
          order: lastOrderNumber ? lastOrderNumber.order + 1 : 0,
          project: {
            connect: {
              id: project.id,
            },
          },
          collection: {
            connect: {
              id: defaultCollection.id,
            },
          },
          responses: {
            create: {},
          },
        },
        include: {
          responses: true,
          headers: true,
        },
      });
    } catch (e) {
      this.logger.error(e.message, e.stack);
      throw new InternalServerErrorException();
    }
  }

  async getAll(projectId: string): Promise<Endpoint[]> {
    return await this.prisma.endpoint.findMany({
      where: { projectId },
    });
  }

  async getById(projectId: string, id: string): Promise<Endpoint> {
    const found = await this.prisma.endpoint.findFirst({
      where: {
        projectId,
        id,
      },
      include: {
        responses: true,
        headers: true,
      },
    });

    if (!found) {
      throw new NotFoundException(`Endpoint with ID: ${id} not found`);
    }

    return found;
  }

  async update(projectId: string, id: string, updateEndpointDto: UpdateEndpointDto): Promise<Endpoint> {
    if (!Object.keys(updateEndpointDto).length) {
      throw new BadRequestException("It looks like your request doesn't contain a body");
    }

    const { headers, activeStatusCode, delay, emptyArray, collectionId, responses, forward } = updateEndpointDto;

    await this.getById(projectId, id);

    try {
      return await this.prisma.endpoint.update({
        where: {
          id,
        },
        data: {
          headers: this.prepareHeadersData(headers, id),
          activeStatusCode,
          delay,
          emptyArray,
          responses: this.prepareResponsesData(responses, id),
          forward,
          collectionId,
        },
        include: {
          headers: true,
        },
      });
    } catch (e) {
      this.logger.error(e.message);
      throw new InternalServerErrorException();
    }
  }

  async delete(projectId: string, id: string): Promise<void> {
    await this.getById(projectId, id);

    try {
      await this.prisma.endpoint.delete({
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

  private prepareHeadersData(headers: HeaderDto[], id: string): Prisma.HeaderUpdateManyWithoutEndpointInput {
    return {
      deleteMany: {
        endpointId: id,
        NOT: headers.map(({ id }) => ({ id })),
      },
      upsert: headers.map(({ id, name, value }) => {
        return {
          where: {
            id: id || '',
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

  private prepareResponsesData(responses: ResponseDto[], id: string): Prisma.ResponseUpdateManyWithoutEndpointInput {
    return {
      deleteMany: {
        endpointId: id,
        NOT: responses.map(({ id }) => ({ id })),
      },
      upsert: responses.map(({ id, statusCode, body }) => {
        return {
          where: {
            id: id || '',
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
