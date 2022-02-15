import { Body, Controller, Delete, Get, Logger, Param, ParseUUIDPipe, Put } from '@nestjs/common';
import { EndpointService, UpdateEndpointDto } from '@aymme/api/endpoint/data-access';

@Controller('projects/:projectId/endpoints')
export class ApiEndpointFeatureController {
  private logger = new Logger(ApiEndpointFeatureController.name);

  constructor(private endpointService: EndpointService) {}

  @Get()
  async getAll(@Param('projectId', new ParseUUIDPipe()) projectId: string) {
    return this.endpointService.getAll(projectId);
  }

  @Get(':id')
  async getById(
    @Param('projectId', new ParseUUIDPipe()) projectId: string,
    @Param('id', new ParseUUIDPipe()) id: string
  ) {
    return this.endpointService.getById(projectId, id);
  }

  @Put(':id')
  async update(
    @Param('projectId', new ParseUUIDPipe()) projectId: string,
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() updateEndpointDto: UpdateEndpointDto
  ) {
    return this.endpointService.update(projectId, id, updateEndpointDto);
  }

  @Delete(':id')
  async delete(
    @Param('projectId', new ParseUUIDPipe()) projectId: string,
    @Param('id', new ParseUUIDPipe()) id: string
  ) {
    return this.endpointService.delete(projectId, id);
  }
}
