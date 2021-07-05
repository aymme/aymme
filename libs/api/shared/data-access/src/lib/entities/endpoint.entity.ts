import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { IEndpoint } from '@aymme/shared/data-access';
import { Project } from './project.entity';
import { Response } from './response.entity';
import { Header } from './header.entity';

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

  @Column({
    default: 0,
  })
  delay: number;

  @ManyToOne(() => Project, (project: Project) => project.endpoints, {
    nullable: false,
  })
  @JoinColumn({ name: 'projectId' })
  project: Project;

  @Column()
  public projectId: string;

  @OneToMany(() => Response, (response: Response) => response.endpoint, {
    cascade: true,
  })
  responses: Response[];

  @OneToMany(() => Header, (header: Header) => header.endpoint, {
    cascade: true,
    eager: true,
  })
  headers?: Header[];
}
