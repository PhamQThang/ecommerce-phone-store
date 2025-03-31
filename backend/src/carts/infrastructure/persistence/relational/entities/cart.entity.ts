import { CartProductEntity } from '../../../../../cart-products/infrastructure/persistence/relational/entities/cart-product.entity';

import { UserEntity } from '../../../../../users/infrastructure/persistence/relational/entities/user.entity';

import {
  Column,
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
  @Column({
    nullable: true,
    type: String,
  })
  status?: string | null;

  @OneToMany(() => CartProductEntity, (childEntity) => childEntity.cart, {
    eager: true,
    nullable: true,
    cascade: true,
    onUpdate: 'CASCADE',
  })
  items?: CartProductEntity[] | null;

  @OneToOne(() => UserEntity, { eager: true, nullable: false })
  @JoinColumn()
  user: UserEntity;

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
