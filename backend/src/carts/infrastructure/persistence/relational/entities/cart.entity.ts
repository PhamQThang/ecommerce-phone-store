import { CartProductEntity } from '../../../../../cart-products/infrastructure/persistence/relational/entities/cart-product.entity';

import { UserEntity } from '../../../../../users/infrastructure/persistence/relational/entities/user.entity';

import {
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { EntityRelationalHelper } from '../../../../../utils/relational-entity-helper';

@Entity({
  name: 'cart',
})
export class CartEntity extends EntityRelationalHelper {
  @OneToMany(() => CartProductEntity, (childEntity) => childEntity.cart, {
    eager: true,
    nullable: true,
  })
  items?: CartProductEntity[] | null;

  @OneToOne(() => UserEntity, { eager: true, nullable: false })
  @JoinColumn()
  userId: UserEntity;

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
