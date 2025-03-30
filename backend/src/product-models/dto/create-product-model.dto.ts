import { BrandDto } from '../../brands/dto/brand.dto';

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

export class CreateProductModelDto {
  @ApiProperty({
    required: true,
    type: () => String,
  })
  @IsString()
  code: string;

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

  @ApiProperty({
    required: false,
    type: () => String,
  })
  @IsOptional()
  @IsString()
  description?: string | null;

  // Don't forget to use the class-validator decorators in the DTO properties.
}
