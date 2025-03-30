import { ProductModelDto } from '../../product-models/dto/product-model.dto';

import {
  // decorators here

  IsString,
  IsArray,
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

export class CreateBrandDto {
  @ApiProperty({
    required: true,
    type: () => [ProductModelDto],
  })
  @ValidateNested()
  @Type(() => ProductModelDto)
  @IsArray()
  models: ProductModelDto[];

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
