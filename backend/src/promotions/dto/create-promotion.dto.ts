import { ProductDto } from '../../products/dto/product.dto';

import {
  // decorators here

  IsString,
  IsOptional,
  IsDate,
  IsNumber,
  IsArray,
  ValidateNested,
} from 'class-validator';

import {
  // decorators here
  ApiProperty,
} from '@nestjs/swagger';

import {
  // decorators here

  Transform,
  Type,
} from 'class-transformer';

export class CreatePromotionDto {
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
    type: () => Number,
  })
  @IsNumber()
  discount: number;

  @ApiProperty({
    required: false,
    type: () => String,
  })
  @IsOptional()
  @IsString()
  description?: string | null;

  @ApiProperty({
    required: false,
    type: () => Date,
  })
  @IsOptional()
  @Transform(({ value }) => new Date(value))
  @IsDate()
  endDate?: Date | null;

  @ApiProperty({
    required: false,
    type: () => Date,
  })
  @IsOptional()
  @Transform(({ value }) => new Date(value))
  @IsDate()
  startDate?: Date | null;

  @ApiProperty({
    required: true,
    type: () => String,
  })
  @IsString()
  name: string;

  // Don't forget to use the class-validator decorators in the DTO properties.
}
