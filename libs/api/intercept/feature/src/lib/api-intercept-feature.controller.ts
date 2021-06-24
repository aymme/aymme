import {
  All,
  Controller,
  Req,
  Headers,
  Res,
  Logger,
  Query,
  Body,
  UseGuards,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { EndpointService } from '@aymme/api/endpoint/data-access';
import { CurrentProject, ProjectGuard } from '@aymme/api/project/utils';
import { Project } from '@aymme/api/shared/data-access';

@Controller('intercept')
export class ApiInterceptFeatureController {
  private logger = new Logger(ApiInterceptFeatureController.name);

  @All()
  @UseGuards(ProjectGuard)
  async intercept(
    @Body() body,
    @Query() query,
    @Headers() headers,
    @Req() request: Request,
    @Res() response: Response,
    @CurrentProject() currentProject: Project
  ) {
    this.logger.verbose(request.path);
    this.logger.verbose(query);
    this.logger.verbose(currentProject);
    const endpoint = await this.endpointService.intercept(
      request.path,
      query,
      body,
      request.method,
      currentProject
    );

    return response.status(200).json(endpoint);
  }

  constructor(private endpointService: EndpointService) {}
}
