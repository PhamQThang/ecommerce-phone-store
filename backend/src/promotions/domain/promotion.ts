import { Product } from '../../products/domain/product';
import { ApiProperty } from '@nestjs/swagger';

export class Promotion {
  @ApiProperty({
    type: () => [Product],
    nullable: true,
  })
  products?: Product[] | null;

  @ApiProperty({
    type: () => Number,
    nullable: false,
  })
  discount: number;

  @ApiProperty({
    type: () => String,
    nullable: true,
  })
  description?: string | null;

  @ApiProperty({
    type: () => Date,
    nullable: true,
  })
  endDate?: Date | null;

  @ApiProperty({
    type: () => Date,
    nullable: true,
  })
  startDate?: Date | null;

  @ApiProperty({
    type: () => String,
    nullable: false,
  })
  name: string;

  @ApiProperty({
    type: String,
  })
  id: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
