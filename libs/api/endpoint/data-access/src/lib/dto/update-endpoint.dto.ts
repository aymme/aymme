import {
  IsArray,
  IsBoolean,
  IsNumber,
  IsOptional,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { HeaderDto } from './header.dto';

export class UpdateEndpointDto {
  @IsNumber()
  @IsOptional()
  activeStatusCode?: number;

  @IsBoolean()
  @IsOptional()
  emptyArray?: boolean;

  @IsNumber()
  @IsOptional()
  delay?: number;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => HeaderDto)
  headers?: HeaderDto[];
}
