import { EntityRepository, Repository } from 'typeorm';
import { InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
import { Collection, Endpoint, Header, Project, Response } from '@aymme/api/shared/data-access';
import { UpdateEndpointDto } from './dto/update-endpoint.dto';

@EntityRepository(Endpoint)
export class EndpointRepository extends Repository<Endpoint> {
  private logger = new Logger(EntityRepository.name);
  async createEndpoint(path: string, method: string, project: Project, collection: Collection) {
    const endpoint = new Endpoint();
    const response = new Response();
    endpoint.path = path;
    endpoint.method = method;
    endpoint.project = project;
    endpoint.responses = [response];
    endpoint.collection = collection;

    try {
      return await endpoint.save();
    } catch (e) {
      this.logger.error(e.message, e.stack);
      throw new InternalServerErrorException();
    }
  }

  async updateEndpoint(id: string, projectId: string, updateEndpointDto: UpdateEndpointDto) {
    const endpoint = await this.findOne({
      id,
      projectId,
    });

    if (!endpoint) {
      throw new NotFoundException(`Endpoint with ID: ${id} not found`);
    }

    const { headers, activeStatusCode, delay, emptyArray, collectionId, responses, forward } = updateEndpointDto;

    if (headers) {
      endpoint.headers = headers as Header[];
    }

    if (activeStatusCode) {
      endpoint.activeStatusCode = activeStatusCode;
    }

    if (delay) {
      endpoint.delay = delay;
    }

    if (typeof emptyArray !== 'undefined') {
      endpoint.emptyArray = emptyArray;
    }

    if (typeof forward !== 'undefined') {
      endpoint.forward = forward;
    }

    if (collectionId) {
      endpoint.collectionId = collectionId;
    }

    if (responses) {
      endpoint.responses = responses as Response[];
    }

    try {
      await endpoint.save();
    } catch (e) {
      throw new InternalServerErrorException(e);
    }

    return endpoint;
  }
}
