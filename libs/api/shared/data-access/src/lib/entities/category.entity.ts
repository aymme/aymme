import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ICategory } from '@aymme/shared/data-access';
import { Endpoint } from './endpoint.entity';

@Entity()
export class Category extends BaseEntity implements ICategory {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @OneToMany(() => Endpoint, (endpoint: Endpoint) => endpoint.project, {
    nullable: true,
  })
  endpoints?: Endpoint[];
}
