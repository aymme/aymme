import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { IProject } from '@aymme/shared/data-access';
import { Endpoint } from './endpoint.entity';

@Entity()
export class Project extends BaseEntity implements IProject {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  name: string;

  @Column({ unique: true })
  slug: string;

  @OneToMany(() => Endpoint, (endpoint: Endpoint) => endpoint.project, {
    onDelete: 'CASCADE',
  })
  endpoints: Endpoint[];
}
