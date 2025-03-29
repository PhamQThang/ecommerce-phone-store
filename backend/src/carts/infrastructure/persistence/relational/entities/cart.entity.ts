import { ProductEntity } from '../../../../../products/infrastructure/persistence/relational/entities/product.entity';

import { UserEntity } from '../../../../../users/infrastructure/persistence/relational/entities/user.entity';

import {
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  JoinColumn,
  OneToOne,
  JoinTable,
  ManyToMany,
} from 'typeorm';
import { EntityRelationalHelper } from '../../../../../utils/relational-entity-helper';

@Entity({
  name: 'cart',
})
export class CartEntity extends EntityRelationalHelper {
  @ManyToMany(() => ProductEntity, { eager: true, nullable: true })
  @JoinTable()
  products?: ProductEntity[] | null;

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
