import { ProductModel } from '../../product-models/domain/product-model';
import { ApiProperty } from '@nestjs/swagger';

export class Brand {
  @ApiProperty({
    type: () => [ProductModel],
    nullable: false,
  })
  models: ProductModel[];

  @ApiProperty({
    type: () => String,
    nullable: false,
  })
  slug: string;

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
