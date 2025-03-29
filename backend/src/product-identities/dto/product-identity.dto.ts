import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class ProductIdentityDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  id: string;
}
