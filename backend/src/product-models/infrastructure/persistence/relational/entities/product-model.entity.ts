import { BrandEntity } from '../../../../../brands/infrastructure/persistence/relational/entities/brand.entity';

import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { EntityRelationalHelper } from '../../../../../utils/relational-entity-helper';

@Entity({
  name: 'product_model',
})
export class ProductModelEntity extends EntityRelationalHelper {
  @Column({
    nullable: false,
    type: String,
    unique: true,
  })
  code: string;

  @ManyToOne(() => BrandEntity, (parentEntity) => parentEntity.models, {
    eager: false,
    nullable: false,
  })
  brand: BrandEntity;

  @Column({
    nullable: false,
    type: String,
  })
  name: string;

  @Column({
    nullable: true,
    type: String,
  })
  description?: string | null;

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
