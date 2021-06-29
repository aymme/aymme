import { IsBoolean, IsNumber, IsOptional } from 'class-validator';

export class UpdateEndpointDto {
  @IsNumber()
  @IsOptional()
  activeStatusCode?: number;

  @IsBoolean()
  @IsOptional()
  emptyArray?: boolean;
}
