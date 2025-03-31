import { ApiProperty } from '@nestjs/swagger';
import { Brand } from '../../brands/domain/brand';
import { ProductIdentity } from '../../product-identities/domain/product-identity';
import { ProductModel } from '../../product-models/domain/product-model';
import { ProductStatus } from '../product.type';

export class ColorMapping {
  id: string;
  name: string;
  count: number;
}

export class Product {
  @ApiProperty({
    type: () => ProductModel,
    nullable: false,
  })
  model: ProductModel;

  @ApiProperty({
    type: () => Array<ColorMapping>,
    nullable: true,
  })
  colors?: ColorMapping[];

  @ApiProperty({
    type: () => Number,
    nullable: false,
  })
  basePrice: number;

  @ApiProperty({
    type: () => Number,
    nullable: true,
  })
  screenSize?: number | null;

  @ApiProperty({
    type: () => Number,
    nullable: true,
  })
  pin?: number | null;

  @ApiProperty({
    type: () => String,
    nullable: true,
  })
  screenTechnology?: string | null;

  @ApiProperty({
    type: () => String,
    nullable: true,
  })
  chipset?: string | null;

  @ApiProperty({
    type: () => String,
    nullable: true,
  })
  os?: string | null;

  @ApiProperty({
    type: () => [ProductIdentity],
    nullable: true,
  })
  identities?: ProductIdentity[] | null;

  @ApiProperty({
    type: () => [String],
    nullable: true,
  })
  images?: string[] | null;

  @ApiProperty({
    type: () => Number,
    nullable: false,
  })
  storage: number;

  @ApiProperty({
    type: () => Number,
    nullable: false,
  })
  ram: number;

  @ApiProperty({
    type: () => String,
    nullable: false,
  })
  slug: string;

  @ApiProperty({
    type: () => Brand,
    nullable: false,
  })
  brand: Brand;

  @ApiProperty({
    type: () => String,
    nullable: false,
  })
  name: string;

  @ApiProperty({
    enum: ProductStatus,
  })
  status?: string;

  @ApiProperty({
    type: Number,
  })
  quantity?: number;

  @ApiProperty({
    type: String,
  })
  id: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
