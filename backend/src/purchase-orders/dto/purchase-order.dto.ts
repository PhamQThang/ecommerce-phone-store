import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class PurchaseOrderDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  id: string;
}
