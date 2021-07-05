import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { IResponse } from '@aymme/shared/data-access';
import { Endpoint } from '@aymme/api/shared/data-access';
import { HttpStatus } from '@nestjs/common';

@Entity()
export class Response extends BaseEntity implements IResponse {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'text',
    default: '{ "message": "Please update mocks data" }',
  })
  body: string;

  @Column({ default: HttpStatus.INTERNAL_SERVER_ERROR })
  statusCode: number;

  @ManyToOne(() => Endpoint, (endpoint: Endpoint) => endpoint.responses, {
    nullable: false,
  })
  @JoinColumn({ name: 'endpointId' })
  endpoint: Endpoint;

  @Column()
  endpointId: string;
}
