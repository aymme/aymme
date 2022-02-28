import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Transform } from 'class-transformer';
import { IProjectConfiguration } from '@aymme/shared/model';

@Entity()
export class ProjectConfiguration extends BaseEntity implements IProjectConfiguration {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Transform(({ value }: { value: string }) => value && value.split(',')) //TODO: The pattern should come from a config
  @Column({ type: 'varchar', nullable: true })
  ignoreParams: string[] | string;
}
