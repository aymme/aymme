import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProjectRepository } from './project.repository';
import { ProjectService } from './project.service';

@Module({
  imports: [TypeOrmModule.forFeature([ProjectRepository])],
  controllers: [],
  providers: [ProjectService],
  exports: [ProjectService],
})
export class ApiProjectDataAccessModule {}
