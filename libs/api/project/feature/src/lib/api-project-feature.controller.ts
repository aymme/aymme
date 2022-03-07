import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  UseInterceptors,
} from '@nestjs/common';
import {
  CreateProjectDto,
  ProjectService,
  UpdateProjectConfigurationDto,
  UpdateProjectDto,
} from '@aymme/api/project/data-access';

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

  @UseInterceptors(ClassSerializerInterceptor)
  @Get(':id/export/:fileName')
  async getExport(@Param('id', new ParseUUIDPipe()) id: string, @Param() fileName: string) {
    console.log(id, fileName);
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
    return this.projectService.updateConfiguration(id, updateProjectConfigurationDto);
  }

  @Delete(':id')
  async delete(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.projectService.delete(id);
  }
}
