import {
  // decorators here
  Type,
} from 'class-transformer';

import {
  // decorators here

  IsNotEmpty,
  IsString,
} from 'class-validator';

import {
  // decorators here
  ApiProperty,
} from '@nestjs/swagger';

export class CreateOrderDto {
  status?: string;

  @ApiProperty({
    required: true,
    type: () => String,
  })
  @IsString()
  address: string;

  @ApiProperty({
    required: true,
    type: String,
  })
  @Type(() => String)
  @IsNotEmpty()
  cartId: string;

  // Don't forget to use the class-validator decorators in the DTO properties.
}
