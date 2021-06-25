import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { IResponse } from '@aymme/shared/data-access';
import { Endpoint } from '@aymme/api/shared/data-access';

@Entity()
export class Response extends BaseEntity implements IResponse {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'text' })
  body: string;

  @Column()
  statusCode: number;

  @ManyToOne(() => Endpoint, (endpoint: Endpoint) => endpoint.responses, {
    nullable: false,
  })
  endpoint: Endpoint;
}
