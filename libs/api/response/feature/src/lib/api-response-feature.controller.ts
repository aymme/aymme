import { Body, Controller, Delete, Get, Param, ParseUUIDPipe, Post, Put } from '@nestjs/common';
import { CreateResponseDto, ResponseService, UpdateResponseDto } from '@aymme/api/response/data-access';

@Controller('endpoints/:endpointId/responses')
export class ApiResponseFeatureController {
  constructor(private responseService: ResponseService) {}

  @Get()
  getAll(@Param('endpointId', new ParseUUIDPipe()) endpointId: string) {
    return this.responseService.getAll(endpointId);
  }

  @Get(':id')
  getById(@Param('endpointId', new ParseUUIDPipe()) endpointId: string, @Param('id', new ParseUUIDPipe()) id: string) {
    return this.responseService.getById(endpointId, id);
  }

  @Post()
  create(@Param('endpointId', new ParseUUIDPipe()) endpointId: string, @Body() createResponseDto: CreateResponseDto) {
    return this.responseService.create(endpointId, createResponseDto);
  }

  @Put(':id')
  update(
    @Param('endpointId', new ParseUUIDPipe()) endpointId: string,
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() updateResponseDto: UpdateResponseDto
  ) {
    return this.responseService.update(endpointId, id, updateResponseDto);
  }

  @Delete(':id')
  delete(@Param('endpointId', new ParseUUIDPipe()) endpointId: string, @Param('id', new ParseUUIDPipe()) id: string) {
    return this.responseService.delete(endpointId, id);
  }
}
