import { PurchaseOrder } from '../../purchase-orders/domain/purchase-order';
import { Supplier } from '../../suppliers/domain/supplier';
import { Color } from '../../colors/domain/color';
import { Product } from '../../products/domain/product';
import { ApiProperty } from '@nestjs/swagger';

export class ProductIdentity {
  @ApiProperty({
    type: () => Number,
    nullable: true,
  })
  purchasePrice?: number | null;

  @ApiProperty({
    type: () => PurchaseOrder,
    nullable: false,
  })
  purchaseOrder: PurchaseOrder;

  @ApiProperty({
    type: () => Supplier,
    nullable: false,
  })
  supplier?: Supplier;

  @ApiProperty({
    type: () => Color,
    nullable: false,
  })
  color: Color;

  @ApiProperty({
    type: () => Product,
    nullable: false,
  })
  product: Product;

  @ApiProperty({
    type: () => String,
    nullable: true,
  })
  status?: string | null;

  @ApiProperty({
    type: () => String,
    nullable: false,
  })
  imei: string;

  @ApiProperty({
    type: String,
  })
  id: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
