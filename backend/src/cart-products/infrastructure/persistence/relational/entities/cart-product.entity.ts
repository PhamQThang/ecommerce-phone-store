import { CartEntity } from '../../../../../carts/infrastructure/persistence/relational/entities/cart.entity';

import { ColorEntity } from '../../../../../colors/infrastructure/persistence/relational/entities/color.entity';

import { ProductEntity } from '../../../../../products/infrastructure/persistence/relational/entities/product.entity';

import {
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  JoinColumn,
  OneToOne,
  Column,
  ManyToOne,
} from 'typeorm';
import { EntityRelationalHelper } from '../../../../../utils/relational-entity-helper';

@Entity({
  name: 'cart_product',
})
export class CartProductEntity extends EntityRelationalHelper {
  @ManyToOne(() => CartEntity, (parentEntity) => parentEntity.items, {
    eager: false,
    nullable: false,
  })
  cart: CartEntity;

  @OneToOne(() => ColorEntity, { eager: true, nullable: false })
  @JoinColumn()
  color: ColorEntity;

  @Column({
    nullable: false,
    type: Number,
  })
  quantity: number;

  @OneToOne(() => ProductEntity, { eager: true, nullable: false })
  @JoinColumn()
  product: ProductEntity;

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
