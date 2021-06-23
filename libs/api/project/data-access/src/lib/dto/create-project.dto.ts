import { IsNotEmpty, MinLength } from 'class-validator';

export class CreateProjectDto {
  @MinLength(3)
  @IsNotEmpty()
  name: string;
}
