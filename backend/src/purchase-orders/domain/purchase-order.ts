import { Supplier } from '../../suppliers/domain/supplier';
import { ApiProperty } from '@nestjs/swagger';

export class PurchaseOrder {
  @ApiProperty({
    type: () => Supplier,
    nullable: false,
  })
  supplier: Supplier;

  @ApiProperty({
    type: String,
  })
  id: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
