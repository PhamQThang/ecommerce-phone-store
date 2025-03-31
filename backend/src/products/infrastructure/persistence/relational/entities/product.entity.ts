import { ProductModelEntity } from '../../../../../product-models/infrastructure/persistence/relational/entities/product-model.entity';

import { ProductIdentityEntity } from '../../../../../product-identities/infrastructure/persistence/relational/entities/product-identity.entity';

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
  @ManyToOne(() => ProductModelEntity, { eager: true, nullable: false })
  model: ProductModelEntity;

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

  @OneToMany(
    () => ProductIdentityEntity,
    (childEntity) => childEntity.product,
    { eager: true, nullable: true },
  )
  identities?: ProductIdentityEntity[] | null;

  @Column({
    nullable: true,
    type: 'jsonb',
  })
  images?: string[] | null;

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
