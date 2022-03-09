import { IResponse } from '@aymme/shared/model';
import { IsEnum, IsJSON, IsNotEmpty, IsOptional, IsUUID } from 'class-validator';
import { HttpStatus } from '@nestjs/common';
import { Transform } from 'class-transformer';

export class ResponseDto implements IResponse {
  @IsOptional()
  @IsUUID()
  @Transform(({ value }) => (value === null ? undefined : value))
  id: string | null;

  @IsOptional()
  @IsJSON()
  body: string;

  @IsNotEmpty()
  @IsEnum(HttpStatus, {
    message: 'statusCode should be a valid HTTP Status Code',
  })
  statusCode: HttpStatus;
}
