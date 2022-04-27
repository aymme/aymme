import { Body, Controller, Delete, Get, Param, ParseUUIDPipe, Patch, Post, Put } from '@nestjs/common';
import {
  CollectionService,
  CreateCollectionDto,
  UpdateCollectionDto,
  UpdateCollectionNameDto,
} from '@aymme/api/collection/data-access';

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
    @Body() createCollectionDto: CreateCollectionDto
  ) {
    return this.collectionService.create(projectId, createCollectionDto);
  }

  @Put()
  async update(@Param('projectId', new ParseUUIDPipe()) projectId: string, @Body() data: UpdateCollectionDto[]) {
    return this.collectionService.update(projectId, data);
  }

  @Patch(':id/name')
  async updateName(
    @Param('projectId', new ParseUUIDPipe()) projectId: string,
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() updateCollectionNameDto: UpdateCollectionNameDto
  ) {
    return this.collectionService.updateName(projectId, id, updateCollectionNameDto);
  }

  @Delete(':id')
  async delete(
    @Param('projectId', new ParseUUIDPipe()) projectId: string,
    @Param('id', new ParseUUIDPipe()) id: string
  ) {
    return this.collectionService.delete(projectId, id);
  }
}
