import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class PromotionDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  id: string;
}
