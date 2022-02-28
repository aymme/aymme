import { BaseEntity, Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { IProject } from '@aymme/shared/model';
import { Endpoint } from './endpoint.entity';
import { Collection } from './collection.entity';
import { ProjectConfiguration } from './project-configuration.entity';

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

  @OneToMany(() => Collection, (collection: Collection) => collection.project, {
    onDelete: 'CASCADE',
  })
  collections: Collection[];

  @OneToOne(() => ProjectConfiguration, {
    onDelete: 'CASCADE',
    cascade: true,
    eager: true,
  })
  @JoinColumn()
  configuration: ProjectConfiguration;
}
