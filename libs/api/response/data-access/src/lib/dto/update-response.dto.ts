import { IsJSON, IsNotEmpty } from 'class-validator';

export class UpdateResponseDto {
  @IsNotEmpty()
  @IsJSON()
  body: string;
}
