import { All, Body, Controller, Headers, Logger, NotFoundException, Query, Req, Res, UseGuards } from '@nestjs/common';
import { Request, Response } from 'express';
import sleep from 'sleep-promise';

import { EndpointService } from '@aymme/api/endpoint/data-access';
import { CurrentProject, ProjectGuard } from '@aymme/api/project/utils';
import { Project } from '@aymme/api/shared/data-access';

@Controller('intercept')
export class ApiInterceptFeatureController {
  private logger = new Logger(ApiInterceptFeatureController.name);

  @All('*')
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
    this.logger.verbose(currentProject.name);

    const endpoint = await this.endpointService.intercept(request.url, query, body, request.method, currentProject);

    const res = response.status(endpoint.activeStatusCode);

    if (endpoint.emptyArray) {
      return res.json([]);
    }

    const endpointResponse = endpoint.responses.find((value) => value.statusCode === endpoint.activeStatusCode);

    if (!endpointResponse) {
      throw new NotFoundException(`Response for HTTP Status code ${endpoint.activeStatusCode} does not exist`);
    }

    if (endpoint.headers && endpoint.headers.length) {
      const headers = endpoint.headers.reduce((obj, header) => {
        return { ...obj, [header.name]: header.value };
      }, {});
      res.set(headers);
    }

    if (endpoint.delay && endpoint.delay > 10) {
      await sleep(endpoint.delay);
    }

    return res.json(JSON.parse(endpointResponse.body));
  }

  constructor(private endpointService: EndpointService) {}
}
