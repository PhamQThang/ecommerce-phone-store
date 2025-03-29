import { ColorDto } from '../../colors/dto/color.dto';

import { ProductDto } from '../../products/dto/product.dto';

import {
  // decorators here

  IsString,
  IsOptional,
  ValidateNested,
  IsNotEmptyObject,
} from 'class-validator';

import {
  // decorators here
  ApiProperty,
} from '@nestjs/swagger';

import {
  // decorators here
  Type,
} from 'class-transformer';

export class CreateProductIdentityDto {
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
    type: () => ProductDto,
  })
  @ValidateNested()
  @Type(() => ProductDto)
  @IsNotEmptyObject()
  product: ProductDto;

  @ApiProperty({
    required: false,
    type: () => String,
  })
  @IsOptional()
  @IsString()
  status?: string | null;

  @ApiProperty({
    required: true,
    type: () => String,
  })
  @IsString()
  imei: string;

  // Don't forget to use the class-validator decorators in the DTO properties.
}
