import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CartProductDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  id: string;
}
