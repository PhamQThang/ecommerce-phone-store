import { ApiProperty } from '@nestjs/swagger';
import { CartProduct } from '../../cart-products/domain/cart-product';
import { Product } from '../../products/domain/product';
import { User } from '../../users/domain/user';

export class Cart {
  @ApiProperty({
    type: () => String,
    nullable: true,
  })
  status?: string | null;

  @ApiProperty({
    type: () => [CartProduct],
    nullable: true,
  })
  items?: CartProduct[] | null;

  @ApiProperty({
    type: () => [Product],
    nullable: true,
  })
  products?: Product[] | null;

  @ApiProperty({
    type: () => User,
    nullable: false,
  })
  user: User;

  @ApiProperty({
    type: String,
  })
  id: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
