import { IsNotEmpty, MinLength } from 'class-validator';

export class UpdateProjectDto {
  @MinLength(3)
  @IsNotEmpty()
  name: string;
}
