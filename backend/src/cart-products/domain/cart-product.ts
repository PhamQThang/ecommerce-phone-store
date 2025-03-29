import { Cart } from '../../carts/domain/cart';
import { Color } from '../../colors/domain/color';
import { Product } from '../../products/domain/product';
import { ApiProperty } from '@nestjs/swagger';

export class CartProduct {
  @ApiProperty({
    type: () => Cart,
    nullable: false,
  })
  cart: Cart;

  @ApiProperty({
    type: () => Color,
    nullable: false,
  })
  color: Color;

  @ApiProperty({
    type: () => Number,
    nullable: false,
  })
  quantity: number;

  @ApiProperty({
    type: () => Product,
    nullable: false,
  })
  product: Product;

  @ApiProperty({
    type: String,
  })
  id: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
