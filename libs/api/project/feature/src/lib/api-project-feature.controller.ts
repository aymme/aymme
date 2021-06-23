import {
  Body,
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
} from '@nestjs/common';
import {
  CreateProjectDto,
  ProjectService,
} from '@aymme/api/project/data-access';
import { UpdateProjectDto } from '../../../data-access/src/lib/dto/update-project.dto';

@Controller('projects')
export class ApiProjectFeatureController {
  constructor(private projectService: ProjectService) {}

  @Get()
  async getAll() {
    return this.projectService.getAll();
  }

  @Get(':id')
  async getById(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.projectService.getById(id);
  }

  @Post()
  async create(@Body() createProjectDto: CreateProjectDto) {
    return this.projectService.create(createProjectDto);
  }

  @Put(':id')
  async update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() updateProjectDto: UpdateProjectDto
  ) {
    return this.projectService.update(id, updateProjectDto);
  }
}
