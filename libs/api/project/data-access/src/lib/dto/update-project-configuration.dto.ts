import { IsOptional } from 'class-validator';

export class UpdateProjectConfigurationDto {
  @IsOptional()
  ignoreParams?: string;
}
