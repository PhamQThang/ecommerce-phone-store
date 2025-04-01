import { ProductIdentity } from '../../product-identities/domain/product-identity';
import { ApiProperty } from '@nestjs/swagger';

export class Supplier {
  @ApiProperty({
    type: () => [ProductIdentity],
    nullable: true,
  })
  productIdentity?: ProductIdentity[] | null;

  @ApiProperty({
    type: () => String,
    nullable: true,
  })
  address?: string | null;

  @ApiProperty({
    type: () => String,
    nullable: true,
  })
  phoneNumber?: string | null;

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
