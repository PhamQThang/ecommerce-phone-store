import { ProductEntity } from '../../../../../products/infrastructure/persistence/relational/entities/product.entity';

import {
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  Column,
  ManyToOne,
} from 'typeorm';
import { EntityRelationalHelper } from '../../../../../utils/relational-entity-helper';

@Entity({
  name: 'product_image',
})
export class ProductImageEntity extends EntityRelationalHelper {
  @ManyToOne(() => ProductEntity, (parentEntity) => parentEntity.images, {
    eager: false,
    nullable: false,
  })
  product: ProductEntity;

  @Column({
    nullable: true,
    type: String,
  })
  url?: string | null;

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
