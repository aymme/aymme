import { IsNotEmpty, MinLength } from 'class-validator';

export class UpdateCollectionNameDto {
  @MinLength(3)
  @IsNotEmpty()
  name: string;
}
