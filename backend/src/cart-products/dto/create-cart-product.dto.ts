import { CartDto } from '../../carts/dto/cart.dto';

import { ColorDto } from '../../colors/dto/color.dto';

import { ProductDto } from '../../products/dto/product.dto';

import {
  // decorators here
  Type,
} from 'class-transformer';

import {
  // decorators here

  ValidateNested,
  IsNotEmptyObject,
  IsNumber,
} from 'class-validator';

import {
  // decorators here
  ApiProperty,
} from '@nestjs/swagger';

export class CreateCartProductDto {
  @ApiProperty({
    required: true,
    type: () => CartDto,
  })
  @ValidateNested()
  @Type(() => CartDto)
  @IsNotEmptyObject()
  cart: CartDto;

  @ApiProperty({
    required: true,
    type: () => ColorDto,
  })
  @ValidateNested()
  @Type(() => ColorDto)
  @IsNotEmptyObject()
  color: ColorDto;

  @ApiProperty({
    required: true,
    type: () => Number,
  })
  @IsNumber()
  quantity: number;

  @ApiProperty({
    required: true,
    type: () => ProductDto,
  })
  @ValidateNested()
  @Type(() => ProductDto)
  @IsNotEmptyObject()
  product: ProductDto;

  // Don't forget to use the class-validator decorators in the DTO properties.
}
