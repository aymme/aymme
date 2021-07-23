import { IsNotEmpty, MinLength } from 'class-validator';

export class CreateCollectionDto {
  @MinLength(3)
  @IsNotEmpty()
  name: string;
}
