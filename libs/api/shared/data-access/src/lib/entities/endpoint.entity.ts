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

  @ManyToOne(() => Project, (project: Project) => project.endpoints, {
    nullable: false,
  })
  @JoinColumn({ name: 'projectId' })
  project: Project;

  @Column()
  public projectId: string;

  @OneToMany(() => Response, (response: Response) => response.endpoint, {
    onDelete: 'CASCADE',
    cascade: true,
  })
  responses: Response[];
}
