import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ICollection } from '@aymme/shared/data-access';
import { Endpoint } from './endpoint.entity';
import { Project } from './project.entity';

@Entity()
export class Collection extends BaseEntity implements ICollection {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @OneToMany(() => Endpoint, (endpoint: Endpoint) => endpoint.project, {
    nullable: true,
    cascade: true,
  })
  endpoints?: Endpoint[];

  @ManyToOne(() => Project, (project: Project) => project.collections, {
    nullable: false,
  })
  @JoinColumn({ name: 'projectId' })
  project: Project;

  @Column()
  public projectId: string;

  constructor(name: string, projectId: string) {
    super();

    this.name = name;
    this.projectId = projectId;
  }
}
