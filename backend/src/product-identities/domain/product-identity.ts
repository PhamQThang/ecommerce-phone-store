import { Color } from '../../colors/domain/color';
import { Product } from '../../products/domain/product';
import { ApiProperty } from '@nestjs/swagger';

export class ProductIdentity {
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
