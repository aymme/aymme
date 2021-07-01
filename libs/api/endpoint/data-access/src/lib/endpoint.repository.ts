import { EntityRepository, Repository } from 'typeorm';
import { InternalServerErrorException, Logger } from '@nestjs/common';
import { Endpoint, Project, Response } from '@aymme/api/shared/data-access';

@EntityRepository(Endpoint)
export class EndpointRepository extends Repository<Endpoint> {
  private logger = new Logger(EntityRepository.name);
  async createEndpoint(path: string, method: string, project: Project) {
    const endpoint = new Endpoint();
    const response = new Response();
    endpoint.path = path;
    endpoint.method = method;
    endpoint.project = project;
    endpoint.responses = [response];

    try {
      return await endpoint.save();
    } catch (e) {
      this.logger.error(e.message, e.stack);
      throw new InternalServerErrorException();
    }
  }
}
