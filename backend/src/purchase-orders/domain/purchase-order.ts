import { ProductIdentity } from '../../product-identities/domain/product-identity';
import { Supplier } from '../../suppliers/domain/supplier';
import { ApiProperty } from '@nestjs/swagger';

export class PurchaseOrder {
  @ApiProperty({
    type: () => [ProductIdentity],
    nullable: true,
  })
  productIdentites?: ProductIdentity[] | null;

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
