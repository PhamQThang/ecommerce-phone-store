import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class ColorDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  id: string;
}
