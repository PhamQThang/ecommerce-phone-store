import { Product } from '../../products/domain/product';
import { ApiProperty } from '@nestjs/swagger';

export class ProductImage {
  @ApiProperty({
    type: () => Product,
    nullable: false,
  })
  product: Product;

  @ApiProperty({
    type: () => String,
    nullable: true,
  })
  url?: string | null;

  @ApiProperty({
    type: String,
  })
  id: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
