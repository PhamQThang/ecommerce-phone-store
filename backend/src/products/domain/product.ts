import { ProductModel } from '../../product-models/domain/product-model';
import { ApiProperty } from '@nestjs/swagger';
import { Brand } from '../../brands/domain/brand';
import { ProductIdentity } from '../../product-identities/domain/product-identity';
import { ProductImage } from '../../product-images/domain/product-image';
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
    type: () => String,
    nullable: false,
  })
  seriCode: string;

  @ApiProperty({
    type: () => [ProductIdentity],
    nullable: true,
  })
  identities?: ProductIdentity[] | null;

  @ApiProperty({
    type: () => [ProductImage],
    nullable: true,
  })
  images?: ProductImage[] | null;

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
