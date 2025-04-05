import { ProductEntity } from '../../../../../products/infrastructure/persistence/relational/entities/product.entity';

import {
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  Column,
  JoinTable,
  ManyToMany,
} from 'typeorm';
import { EntityRelationalHelper } from '../../../../../utils/relational-entity-helper';

@Entity({
  name: 'promotion',
})
export class PromotionEntity extends EntityRelationalHelper {
  @ManyToMany(() => ProductEntity, { eager: true, nullable: true })
  @JoinTable({
    name: 'promotion_product',
  })
  products?: ProductEntity[] | null;

  @Column({
    nullable: false,
    type: Number,
  })
  discount: number;

  @Column({
    nullable: true,
    type: String,
  })
  description?: string | null;

  @Column({
    nullable: true,
    type: Date,
  })
  endDate?: Date | null;

  @Column({
    nullable: true,
    type: Date,
  })
  startDate?: Date | null;

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
