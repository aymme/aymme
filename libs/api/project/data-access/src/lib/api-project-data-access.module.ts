import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProjectRepository } from './project.repository';
import { ProjectService } from './project.service';
import { ProjectConfigurationRepository } from './project-configuration.repository';

@Module({
  imports: [TypeOrmModule.forFeature([ProjectRepository, ProjectConfigurationRepository])],
  controllers: [],
  providers: [ProjectService],
  exports: [ProjectService],
})
export class ApiProjectDataAccessModule {}
