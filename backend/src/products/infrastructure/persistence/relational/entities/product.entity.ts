import { ProductIdentityEntity } from '../../../../../product-identities/infrastructure/persistence/relational/entities/product-identity.entity';

import { ProductImageEntity } from '../../../../../product-images/infrastructure/persistence/relational/entities/product-image.entity';

import { BrandEntity } from '../../../../../brands/infrastructure/persistence/relational/entities/brand.entity';

import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { EntityRelationalHelper } from '../../../../../utils/relational-entity-helper';

@Entity({
  name: 'product',
})
export class ProductEntity extends EntityRelationalHelper {
  @Column({
    nullable: false,
    type: Number,
  })
  basePrice: number;

  @Column({
    nullable: true,
    type: Number,
  })
  screenSize?: number | null;

  @Column({
    nullable: true,
    type: Number,
  })
  pin?: number | null;

  @Column({
    nullable: true,
    type: String,
  })
  screenTechnology?: string | null;

  @Column({
    nullable: true,
    type: String,
  })
  chipset?: string | null;

  @Column({
    nullable: true,
    type: String,
  })
  os?: string | null;

  @Column({
    nullable: false,
    type: String,
  })
  seriCode: string;

  @OneToMany(
    () => ProductIdentityEntity,
    (childEntity) => childEntity.product,
    { eager: true, nullable: true },
  )
  identities?: ProductIdentityEntity[] | null;

  @OneToMany(() => ProductImageEntity, (childEntity) => childEntity.product, {
    eager: true,
    nullable: true,
  })
  images?: ProductImageEntity[] | null;

  @Column({
    nullable: false,
    type: Number,
  })
  storage: number;

  @Column({
    nullable: false,
    type: Number,
  })
  ram: number;

  @Column({
    nullable: false,
    type: String,
    unique: true,
  })
  slug: string;

  @ManyToOne(() => BrandEntity, { eager: true, nullable: false })
  brand: BrandEntity;

  @Column({
    nullable: false,
    type: String,
  })
  name: string;

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
