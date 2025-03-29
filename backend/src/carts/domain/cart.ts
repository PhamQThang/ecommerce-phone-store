import { Product } from '../../products/domain/product';
import { User } from '../../users/domain/user';
import { ApiProperty } from '@nestjs/swagger';

export class Cart {
  @ApiProperty({
    type: () => [Product],
    nullable: true,
  })
  products?: Product[] | null;

  @ApiProperty({
    type: () => User,
    nullable: false,
  })
  userId: User;

  @ApiProperty({
    type: String,
  })
  id: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
