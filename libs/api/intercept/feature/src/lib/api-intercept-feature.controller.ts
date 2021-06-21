import {
  All,
  Controller,
  Req,
  Headers,
  Res,
  Logger,
  Query,
  Body,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { EndpointService } from '@aymme/api/endpoint/data-access';

@Controller('intercept')
export class ApiInterceptFeatureController {
  private logger = new Logger(ApiInterceptFeatureController.name);

  @All()
  async intercept(
    @Body() body,
    @Query() query,
    @Headers() headers,
    @Req() request: Request,
    @Res() response: Response
  ) {
    this.logger.verbose(request.path);
    this.logger.verbose(query);
    const endpoint = await this.endpointService.intercept(
      request.path,
      query,
      body,
      request.method
    );
    return response.status(200).json(endpoint);
  }

  constructor(private endpointService: EndpointService) {}
}
