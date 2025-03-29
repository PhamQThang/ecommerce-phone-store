import { ProductIdentityDto } from '../../product-identities/dto/product-identity.dto';

import { ProductImageDto } from '../../product-images/dto/product-image.dto';

import { BrandDto } from '../../brands/dto/brand.dto';

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
    required: true,
    type: () => String,
  })
  @IsString()
  seriCode: string;

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
    type: () => [ProductImageDto],
  })
  @IsOptional()
  @ValidateNested()
  @Type(() => ProductImageDto)
  @IsArray()
  images?: ProductImageDto[] | null;

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
    type: () => BrandDto,
  })
  @ValidateNested()
  @Type(() => BrandDto)
  @IsNotEmptyObject()
  brand: BrandDto;

  @ApiProperty({
    required: true,
    type: () => String,
  })
  @IsString()
  name: string;

  // Don't forget to use the class-validator decorators in the DTO properties.
}
