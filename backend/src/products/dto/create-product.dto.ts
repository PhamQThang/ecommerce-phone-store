import { ProductModelDto } from '../../product-models/dto/product-model.dto';

import { ProductIdentityDto } from '../../product-identities/dto/product-identity.dto';

import {
  IsArray,
  IsNotEmptyObject,
  IsNumber,
  IsOptional,
  // decorators here
  IsString,
  ValidateNested,
} from 'class-validator';

import {
  // decorators here
  ApiProperty,
} from '@nestjs/swagger';

import {
  // decorators here
  Type,
} from 'class-transformer';

export class CreateProductDto {
  @ApiProperty({
    required: true,
    type: () => ProductModelDto,
  })
  @ValidateNested()
  @Type(() => ProductModelDto)
  @IsNotEmptyObject()
  model: ProductModelDto;

  @ApiProperty({
    required: true,
    type: () => Number,
  })
  @IsNumber()
  basePrice: number;

  @ApiProperty({
    required: false,
    type: () => Number,
  })
  @IsOptional()
  @IsNumber()
  screenSize?: number | null;

  @ApiProperty({
    required: false,
    type: () => Number,
  })
  @IsOptional()
  @IsNumber()
  pin?: number | null;

  @ApiProperty({
    required: false,
    type: () => String,
  })
  @IsOptional()
  @IsString()
  screenTechnology?: string | null;

  @ApiProperty({
    required: false,
    type: () => String,
  })
  @IsOptional()
  @IsString()
  chipset?: string | null;

  @ApiProperty({
    required: false,
    type: () => String,
  })
  @IsOptional()
  @IsString()
  os?: string | null;

  @ApiProperty({
    required: false,
    type: () => [ProductIdentityDto],
  })
  @IsOptional()
  @ValidateNested()
  @Type(() => ProductIdentityDto)
  @IsArray()
  identities?: ProductIdentityDto[] | null;

  @ApiProperty({
    required: false,
    type: () => [String],
  })
  @IsOptional()
  @Type(() => Array<string>)
  @IsArray()
  images?: string[] | null;

  @ApiProperty({
    required: true,
    type: () => Number,
  })
  @IsNumber()
  storage: number;

  @ApiProperty({
    required: true,
    type: () => Number,
  })
  @IsNumber()
  ram: number;

  @ApiProperty({
    required: true,
    type: () => String,
  })
  @IsString()
  slug: string;

  @ApiProperty({
    required: true,
    type: () => String,
  })
  @IsString()
  name: string;

  // Don't forget to use the class-validator decorators in the DTO properties.
}
