import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  RelationId,
} from 'typeorm';
import { IEndpoint } from '@aymme/shared/data-access';
import { Project } from './project.entity';

@Entity()
export class Endpoint extends BaseEntity implements IEndpoint {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  path: string;

  @Column({
    default: 500,
  })
  activeStatusCode: number;

  @Column({
    default: false,
  })
  emptyArray: boolean;

  @Column()
  method: string;

  @Column({
    default: false,
  })
  forward: boolean;

  @ManyToOne(() => Project, (project: Project) => project.endpoints)
  project: Project;

  @RelationId((endpoint: Endpoint) => endpoint.project)
  public projectId: string;
}
