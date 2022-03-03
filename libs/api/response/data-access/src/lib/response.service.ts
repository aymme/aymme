import {
  BadRequestException,
  ConflictException,
  HttpStatus,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { Response } from '@prisma/client';
import { PrismaService } from '@aymme/api/database/data-access';
import { CreateResponseDto } from './dto/create-response.dto';
import { UpdateResponseDto } from './dto/update-response.dto';

@Injectable()
export class ResponseService {
  private logger = new Logger(ResponseService.name);

  constructor(private prisma: PrismaService) {}

  getAll(endpointId: string): Promise<Response[]> {
    return this.prisma.response.findMany({
      where: {
        endpointId,
      },
    });
  }

  async getById(endpointId: string, id: string): Promise<Response> {
    const found = await this.prisma.response.findFirst({
      where: {
        id,
        endpointId,
      },
    });

    if (!found) {
      throw new NotFoundException();
    }

    return found;
  }

  async getByStatusCode(endpointId: string, statusCode: HttpStatus): Promise<Response> {
    const found = await this.prisma.response.findFirst({
      where: {
        endpointId,
        statusCode,
      },
    });

    if (!found) {
      throw new NotFoundException();
    }

    return found;
  }

  async create(endpointId: string, data: CreateResponseDto): Promise<Response> {
    const { body, statusCode } = data;
    const found = await this.getByStatusCode(endpointId, statusCode);

    if (found) {
      throw new ConflictException(`The response for HTTP status code ${statusCode} already exists!`);
    }

    try {
      return await this.prisma.response.create({
        data: {
          body,
          statusCode,
          endpointId,
        },
      });
    } catch (e) {
      this.logger.error(`Failed to create the response for statusCode "${statusCode}", and endpoint ID ${endpointId}`);
      throw new InternalServerErrorException();
    }
  }

  async update(endpointId: string, id: string, data: UpdateResponseDto): Promise<Response> {
    if (!Object.keys(data).length) {
      throw new BadRequestException("It looks like your request doesn't contain a body");
    }

    const { body } = data;
    await this.getById(endpointId, id);

    try {
      return await this.prisma.response.update({
        where: {
          id,
        },
        data: {
          body,
        },
      });
    } catch (e) {
      this.logger.error(`Failed to update the response with ID ${id}`);
    }
  }

  async delete(endpointId: string, id: string): Promise<void> {
    await this.getById(endpointId, id);

    try {
      await this.prisma.response.delete({
        where: {
          id,
        },
      });
    } catch (e) {
      this.logger.error(`Failed to delete the response with ID: ${id}`);
      this.logger.error(e.message);
      throw new InternalServerErrorException();
    }
  }
}
