import { IsEnum, IsJSON, IsNotEmpty, IsOptional } from 'class-validator';
import { HttpStatus } from '@nestjs/common';

export class CreateResponseDto {
  @IsOptional()
  @IsJSON()
  body: string;

  @IsNotEmpty()
  @IsEnum(HttpStatus, {
    message: 'statusCode should be a valid HTTP Status Code',
  })
  statusCode: HttpStatus;
}
