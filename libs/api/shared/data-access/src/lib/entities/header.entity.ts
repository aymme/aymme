import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { IHeader } from '@aymme/shared/data-access';
import { Endpoint } from './endpoint.entity';

@Entity()
export class Header extends BaseEntity implements IHeader {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  value: string;

  @ManyToOne(() => Endpoint, (endpoint: Endpoint) => endpoint.headers, {
    nullable: true,
    orphanedRowAction: 'delete',
  })
  @JoinColumn({ name: 'endpointId' })
  endpoint: Endpoint;

  @Column()
  endpointId: string;
}
