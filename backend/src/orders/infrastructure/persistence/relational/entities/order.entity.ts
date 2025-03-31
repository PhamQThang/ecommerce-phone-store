import { ProductEntity } from '../../../../../products/infrastructure/persistence/relational/entities/product.entity';

import { UserEntity } from '../../../../../users/infrastructure/persistence/relational/entities/user.entity';

import {
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  JoinColumn,
  OneToOne,
  Column,
} from 'typeorm';
import { EntityRelationalHelper } from '../../../../../utils/relational-entity-helper';

@Entity({
  name: 'order',
})
export class OrderEntity extends EntityRelationalHelper {
  @Column({
    nullable: false,
    type: String,
  })
  status?: string;

  @Column({
    nullable: false,
    type: String,
  })
  address: string;

  @Column({
    nullable: false,
    type: 'jsonb',
  })
  items: ProductEntity[];

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
