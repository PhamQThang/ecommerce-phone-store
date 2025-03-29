import { CartProductDto } from '../../cart-products/dto/cart-product.dto';

import { ProductDto } from '../../products/dto/product.dto';

import { UserDto } from '../../users/dto/user.dto';

import {
  // decorators here
  Type,
} from 'class-transformer';

import {
  // decorators here

  ValidateNested,
  IsNotEmptyObject,
  IsArray,
  IsOptional,
} from 'class-validator';

import {
  // decorators here
  ApiProperty,
} from '@nestjs/swagger';

export class CreateCartDto {
  @ApiProperty({
    required: false,
    type: () => [CartProductDto],
  })
  @IsOptional()
  @ValidateNested()
  @Type(() => CartProductDto)
  @IsArray()
  items?: CartProductDto[] | null;

  @ApiProperty({
    required: false,
    type: () => [ProductDto],
  })
  @IsOptional()
  @ValidateNested()
  @Type(() => ProductDto)
  @IsArray()
  products?: ProductDto[] | null;

  @ApiProperty({
    required: true,
    type: () => UserDto,
  })
  @ValidateNested()
  @Type(() => UserDto)
  @IsNotEmptyObject()
  userId: UserDto;

  // Don't forget to use the class-validator decorators in the DTO properties.
}
