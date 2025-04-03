import { Order } from '../../orders/domain/order';
import { ApiProperty } from '@nestjs/swagger';

export class OrderTransaction {
  @ApiProperty({
    type: () => Order,
    nullable: false,
  })
  order: Order;

  @ApiProperty({
    type: String,
  })
  id: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
