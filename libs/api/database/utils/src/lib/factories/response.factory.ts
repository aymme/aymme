import { Factory } from '@jorgebodega/typeorm-seeding';
import { faker } from '@faker-js/faker';
import { Response } from '@aymme/api/shared/data-access';

export class ResponseFactory extends Factory<Response> {
  protected definition(): Promise<Response> {
    const response = new Response();
    response.statusCode = 500;
    return Promise.resolve(response);
  }
}
