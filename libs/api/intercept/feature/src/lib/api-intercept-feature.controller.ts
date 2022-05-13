import { All, Body, Controller, Headers, Logger, NotFoundException, Query, Req, Res, UseGuards } from '@nestjs/common';
import { Request, Response } from 'express';
import sleep from 'sleep-promise';
import { Project, ProjectConfiguration } from '@prisma/client';
import { EndpointService } from '@aymme/api/endpoint/data-access';
import { CurrentProject, ProjectGuard } from '@aymme/api/project/utils';
import { interpolateObject, interpolateTemplateString } from '@aymme/api/intercept/utils';

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
    this.logger.debug(body);

    const endpoint = await this.endpointService.intercept(request.path, query, body, request.method, currentProject);

    const res = response.status(endpoint.activeStatusCode);

    if (endpoint.emptyArray) {
      return res.json([]);
    }

    const endpointResponse = endpoint.responses.find((value) => value.statusCode === endpoint.activeStatusCode);

    if (!endpointResponse) {
      throw new NotFoundException(`Response for HTTP Status code ${endpoint.activeStatusCode} does not exist`);
    }

    let variables;
    try {
      variables = JSON.parse(currentProject.configuration.variables);
    } catch (e) {
      variables = {};
    }

    if (endpoint.headers && endpoint.headers.length) {
      const headers = endpoint.headers.reduce((obj, header) => {
        return { ...obj, [interpolateTemplateString(header.name, variables)]: interpolateTemplateString(header.value, variables) };
      }, {});
      res.set(headers);
    }

    if (endpoint.delay && endpoint.delay > 10) {
      await sleep(endpoint.delay);
    }

    const jsonParsedBody = JSON.parse(endpointResponse.body);

    return res.json(interpolateObject(jsonParsedBody, variables));
  }

  constructor(private endpointService: EndpointService) {}
}
