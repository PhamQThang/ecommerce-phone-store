import { ProductIdentityDto } from '../../product-identities/dto/product-identity.dto';

import { SupplierDto } from '../../suppliers/dto/supplier.dto';

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

export class CreatePurchaseOrderDto {
  @ApiProperty({
    required: false,
    type: () => [ProductIdentityDto],
  })
  @IsOptional()
  @ValidateNested()
  @Type(() => ProductIdentityDto)
  @IsArray()
  productIdentites?: ProductIdentityDto[] | null;

  @ApiProperty({
    required: true,
    type: () => SupplierDto,
  })
  @ValidateNested()
  @Type(() => SupplierDto)
  @IsNotEmptyObject()
  supplier: SupplierDto;

  // Don't forget to use the class-validator decorators in the DTO properties.
}
