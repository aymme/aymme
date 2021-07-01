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
  NotFoundException,
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

    const res = response.status(endpoint.activeStatusCode);

    if (endpoint.emptyArray) {
      return res.json([]);
    }

    const endpointResponse = endpoint.responses.find(
      (value) => value.statusCode === endpoint.activeStatusCode
    );

    if (!endpointResponse) {
      throw new NotFoundException(
        `Response for HTTP Status code ${endpoint.activeStatusCode} does not exist`
      );
    }

    return res.json(JSON.parse(endpointResponse.body));
  }

  constructor(private endpointService: EndpointService) {}
}
