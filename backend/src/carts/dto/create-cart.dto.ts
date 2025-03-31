import { CartProductDto } from '../../cart-products/dto/cart-product.dto';

import { UserDto } from '../../users/dto/user.dto';

import {
  // decorators here
  Type,
} from 'class-transformer';

import {
  IsArray,
  IsNotEmptyObject,
  IsOptional,
  IsString,
  // decorators here
  ValidateNested,
} from 'class-validator';

import {
  // decorators here
  ApiProperty,
} from '@nestjs/swagger';

export class CreateCartDto {
  @ApiProperty({
    required: false,
    type: () => String,
  })
  @IsOptional()
  @IsString()
  status?: string | null;

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
    required: true,
    type: () => UserDto,
  })
  @ValidateNested()
  @Type(() => UserDto)
  @IsNotEmptyObject()
  user: UserDto;

  // Don't forget to use the class-validator decorators in the DTO properties.
}
