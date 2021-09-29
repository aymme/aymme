import { EntityRepository, Repository } from 'typeorm';
import { Response } from '@aymme/api/shared/data-access';

@EntityRepository(Response)
export class ResponseRepository extends Repository<Response> {}
