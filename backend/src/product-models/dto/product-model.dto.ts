import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class ProductModelDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  id: string;
}
