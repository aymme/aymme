import { IResponse } from '@aymme/shared/model';
import { IsEnum, IsJSON, IsNotEmpty, IsOptional, IsUUID } from 'class-validator';
import { HttpStatus } from '@nestjs/common';

export class ResponseDto implements IResponse {
  @IsOptional()
  @IsUUID()
  id: string;

  @IsOptional()
  @IsJSON()
  body: string;

  @IsNotEmpty()
  @IsEnum(HttpStatus, {
    message: 'statusCode should be a valid HTTP Status Code',
  })
  statusCode: HttpStatus;
}
