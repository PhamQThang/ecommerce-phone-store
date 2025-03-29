import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class BrandDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  id: string;
}
