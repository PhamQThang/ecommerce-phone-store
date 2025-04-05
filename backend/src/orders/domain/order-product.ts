import { ApiProperty } from '@nestjs/swagger';
import { ProductIdentity } from 'src/product-identities/domain/product-identity';

export class OrderProduct {
  @ApiProperty({
    type: () => Number,
    nullable: false,
  })
  quantity: number;

  @ApiProperty({
    type: () => Number,
  })
  basePrice: number;

  @ApiProperty({
    type: () => Number,
  })
  discount: number;

  @ApiProperty({
    type: () => String,
  })
  productId: string;

  @ApiProperty({
    type: [ProductIdentity],
  })
  items: ProductIdentity[];
}
