import { Product } from '../../products/domain/product';
import { User } from '../../users/domain/user';
import { ApiProperty } from '@nestjs/swagger';

export class Order {
  @ApiProperty({
    type: () => String,
    nullable: false,
  })
  status?: string;

  @ApiProperty({
    type: () => String,
    nullable: false,
  })
  address: string;

  @ApiProperty({
    type: () => [Product],
    nullable: false,
  })
  items: Product[];

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
