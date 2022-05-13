import { IsJSON, IsOptional } from 'class-validator';

export class UpdateProjectConfigurationDto {
  @IsOptional()
  ignoreParams?: string;

  @IsOptional()
  @IsJSON()
  variables?: string;
}
