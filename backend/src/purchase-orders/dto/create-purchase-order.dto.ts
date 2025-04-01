import { SupplierDto } from '../../suppliers/dto/supplier.dto';

import {
  // decorators here
  Type,
} from 'class-transformer';

import {
  // decorators here

  ValidateNested,
  IsNotEmptyObject,
} from 'class-validator';

import {
  // decorators here
  ApiProperty,
} from '@nestjs/swagger';

export class CreatePurchaseOrderDto {
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
