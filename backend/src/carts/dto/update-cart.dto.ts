// Don't forget to use the class-validator decorators in the DTO properties.
// import { Allow } from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class UpdateCartDto {
  @ApiProperty({
    type: String,
  })
  @IsString()
  productId: string;

  @ApiProperty({
    type: Number,
  })
  @IsNumber()
  quantity: number;

  @ApiProperty({
    type: String,
  })
  @IsString()
  colorId: string;
}
