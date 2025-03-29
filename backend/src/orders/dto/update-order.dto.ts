// Don't forget to use the class-validator decorators in the DTO properties.
// import { Allow } from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNotEmpty } from 'class-validator';

export class UpdateOrderDto {
  @ApiProperty({
    required: true,
    type: String,
  })
  @Type(() => String)
  @IsNotEmpty()
  cartId: string;
}
