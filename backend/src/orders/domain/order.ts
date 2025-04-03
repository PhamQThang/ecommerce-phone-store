import { User } from '../../users/domain/user';
import { ApiProperty } from '@nestjs/swagger';
import { OrderProduct } from './order-product';

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
    type: () => [OrderProduct],
    nullable: false,
  })
  items: OrderProduct[];

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
