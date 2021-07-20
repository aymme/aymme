import {
  IsArray,
  IsBoolean,
  IsNumber,
  IsOptional,
  IsUUID,
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

  @IsOptional()
  @IsUUID()
  collectionId?: string;
}
