import { Injectable } from '@nestjs/common';
import { EndpointRepository } from './endpoint.repository';

@Injectable()
export class EndpointService {
  constructor(private endpointRepository: EndpointRepository) {}

  async intercept(
    path: string,
    query: { [key: string]: string },
    body: string,
    method: string
  ) {
    const found = await this.endpointRepository.findOne({ path });

    if (found) {
      return found.id;
    }

    return this.endpointRepository.createEndpoint(path, method);
  }
}
