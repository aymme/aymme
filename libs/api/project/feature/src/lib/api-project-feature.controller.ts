import {
  BadRequestException,
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import {
  CreateProjectDto,
  ProjectService,
  UpdateProjectConfigurationDto,
  UpdateProjectDto,
} from '@aymme/api/project/data-access';
import { FileInterceptor } from '@nestjs/platform-express';
import { Express } from 'express';

import 'multer';

@Controller('projects')
export class ApiProjectFeatureController {
  constructor(private projectService: ProjectService) {}

  @UseInterceptors(ClassSerializerInterceptor)
  @Get()
  async getAll() {
    return this.projectService.getAll();
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Get(':id')
  async getById(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.projectService.getById(id);
  }

  @Post()
  async create(@Body() createProjectDto: CreateProjectDto) {
    return this.projectService.create(createProjectDto);
  }

  @Put(':id')
  async update(@Param('id', new ParseUUIDPipe()) id: string, @Body() updateProjectDto: UpdateProjectDto) {
    return this.projectService.update(id, updateProjectDto);
  }

  @Put(':id/configuration')
  async updateConfiguration(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() updateProjectConfigurationDto: UpdateProjectConfigurationDto
  ) {
    return (await this.projectService.updateConfiguration(id, updateProjectConfigurationDto)).configuration;
  }

  @Delete(':id')
  async delete(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.projectService.delete(id);
  }

  @Get(':id/export')
  async getExport(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.projectService.exportProject(id);
  }

  @Post(':id/import')
  @UseInterceptors(FileInterceptor('file'))
  importProject(@Param('id', new ParseUUIDPipe()) id: string, @UploadedFile() file: Express.Multer.File) {
    if (!file) {
      throw new BadRequestException('No file specified.');
    }

    if (file.mimetype !== 'application/json') {
      throw new BadRequestException(`Mime type ${file.mimetype} is not supported by the system`);
    }

    return this.projectService.importProject(id, JSON.parse(file.buffer.toString()));
  }
}
