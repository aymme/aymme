import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
} from '@nestjs/common';
import {
  CollectionService,
  UpdateCollectionNameDto,
} from '@aymme/api/collection/data-access';
import { CreateProjectDto } from '@aymme/api/project/data-access';

@Controller('projects/:projectId/collections')
export class ApiCollectionFeatureController {
  constructor(private collectionService: CollectionService) {}

  @Get()
  async getAll(@Param('projectId', new ParseUUIDPipe()) projectId: string) {
    return this.collectionService.getAllByProjectID(projectId);
  }

  @Post()
  async create(
    @Param('projectId', new ParseUUIDPipe()) projectId: string,
    @Body() createProjectDto: CreateProjectDto
  ) {
    return this.collectionService.create(projectId, createProjectDto);
  }

  @Patch(':id/name')
  async updateName(
    @Param('projectId', new ParseUUIDPipe()) projectId: string,
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() updateCollectionNameDto: UpdateCollectionNameDto
  ) {
    return this.collectionService.updateName(
      projectId,
      id,
      updateCollectionNameDto
    );
  }

  @Delete(':id')
  async delete(
    @Param('projectId', new ParseUUIDPipe()) projectId: string,
    @Param('id', new ParseUUIDPipe()) id: string
  ) {
    return this.collectionService.delete(projectId, id);
  }
}
