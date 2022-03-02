import { IHeader } from '@aymme/shared/model';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class HeaderDto implements IHeader {
  @IsString()
  @IsOptional()
  id: string;

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  value: string;
}
