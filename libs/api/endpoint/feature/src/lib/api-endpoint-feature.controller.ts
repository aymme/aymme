import {
  Controller,
  Delete,
  Get,
  Logger,
  Param,
  ParseUUIDPipe,
  UseGuards,
} from '@nestjs/common';
import { EndpointService } from '@aymme/api/endpoint/data-access';
import { CurrentProject, ProjectGuard } from '@aymme/api/project/utils';
import { Project } from '@aymme/api/shared/data-access';

@Controller('endpoints')
@UseGuards(ProjectGuard)
export class ApiEndpointFeatureController {
  private logger = new Logger(ApiEndpointFeatureController.name);

  constructor(private endpointService: EndpointService) {}

  @Get()
  async getAll(@CurrentProject() project: Project) {
    return this.endpointService.getAll(project.id);
  }

  @Get(':id')
  async getById(
    @CurrentProject() project: Project,
    @Param('id', new ParseUUIDPipe()) id: string
  ) {
    return this.endpointService.getById(project.id, id);
  }

  @Delete(':id')
  async delete(
    @CurrentProject() project: Project,
    @Param('id', new ParseUUIDPipe()) id: string
  ) {
    return this.endpointService.delete(project.id, id);
  }
}
