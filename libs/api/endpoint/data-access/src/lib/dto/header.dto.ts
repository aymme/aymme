import { IHeader } from '@aymme/shared/model';
import { IsNotEmpty, IsString } from 'class-validator';

export class HeaderDto implements IHeader {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  value: string;
}
