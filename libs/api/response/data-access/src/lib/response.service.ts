import {
  ConflictException,
  HttpStatus,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { ResponseRepository } from './response.repository';
import { Response } from '@aymme/api/shared/data-access';
import { CreateResponseDto } from '@aymme/api/response/data-access';
import { UpdateResponseDto } from './dto/update-response.dto';

@Injectable()
export class ResponseService {
  private logger = new Logger(ResponseService.name);

  constructor(private responseRepository: ResponseRepository) {}

  getAll(endpointId: string): Promise<Response[]> {
    return this.responseRepository.find({
      endpointId,
    });
  }

  async getById(endpointId: string, id: string): Promise<Response> {
    const found = await this.responseRepository.findOne({
      id,
      endpointId,
    });

    if (!found) {
      throw new NotFoundException();
    }

    return found;
  }

  async getByStatusCode(
    endpointId: string,
    statusCode: HttpStatus
  ): Promise<Response> {
    return this.responseRepository.findOne({
      endpointId,
      statusCode,
    });
  }

  async create(endpointId: string, data: CreateResponseDto): Promise<Response> {
    const { body, statusCode } = data;
    const found = await this.getByStatusCode(endpointId, statusCode);

    if (found) {
      throw new ConflictException(
        `The response for HTTP status code ${statusCode} already exists!`
      );
    }

    const response = this.responseRepository.create();

    if (body) {
      response.body = body;
    }

    response.statusCode = statusCode;
    response.endpointId = endpointId;

    try {
      await response.save();
    } catch (e) {
      this.logger.error(
        `Failed to create the response for statusCode "${statusCode}", and endpoint ID ${endpointId}`
      );
      throw new InternalServerErrorException();
    }

    return response;
  }

  async update(
    endpointId: string,
    id: string,
    data: UpdateResponseDto
  ): Promise<Response> {
    const { body } = data;
    const response = await this.getById(endpointId, id);

    response.body = body;

    try {
      await response.save();
    } catch (e) {
      this.logger.error(`Failed to update the response with ID ${id}`);
    }

    return response;
  }

  async delete(endpointId: string, id: string): Promise<void> {
    await this.responseRepository.delete({
      id,
      endpointId,
    });
  }
}
