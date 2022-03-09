import { All, Body, Controller, Headers, Logger, NotFoundException, Query, Req, Res, UseGuards } from '@nestjs/common';
import { Request, Response } from 'express';
import sleep from 'sleep-promise';
import { Project, ProjectConfiguration } from '@prisma/client';
import { EndpointService } from '@aymme/api/endpoint/data-access';
import { CurrentProject, ProjectGuard } from '@aymme/api/project/utils';
import { interpolateTemplateString } from './interpolate-template';

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
    @CurrentProject() currentProject: Project & { configuration: ProjectConfiguration }
  ) {
    this.logger.verbose(request.path);
    this.logger.verbose(currentProject.name);

    this.logger.verbose(request.url);
    this.logger.verbose(query);

    const endpoint = await this.endpointService.intercept(request.path, query, body, request.method, currentProject);

    const res = response.status(endpoint.activeStatusCode);

    if (endpoint.emptyArray) {
      return res.json([]);
    }

    const endpointResponse = endpoint.responses.find((value) => value.statusCode === endpoint.activeStatusCode);

    if (!endpointResponse) {
      throw new NotFoundException(`Response for HTTP Status code ${endpoint.activeStatusCode} does not exist`);
    }

    // TODO The variables are mocked, need to store it to DB.
    const VARIABLES = {firstName: "Kern", lastName: "Zhao"};

    if (endpoint.headers && endpoint.headers.length) {
      const headers = endpoint.headers.reduce((obj, header) => {
        return { ...obj, [interpolateTemplateString(header.name, VARIABLES)]: interpolateTemplateString(header.value, VARIABLES) };
      }, {});
      res.set(headers);
    }

    if (endpoint.delay && endpoint.delay > 10) {
      await sleep(endpoint.delay);
    }
    const bodyAfterTemplateInterpolation = interpolateTemplateString(endpointResponse.body, VARIABLES);

    return res.json(JSON.parse(bodyAfterTemplateInterpolation));
  }

  constructor(private endpointService: EndpointService) {}
}
