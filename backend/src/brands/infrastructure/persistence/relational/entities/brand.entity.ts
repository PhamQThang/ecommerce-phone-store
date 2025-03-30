import { ProductModelEntity } from '../../../../../product-models/infrastructure/persistence/relational/entities/product-model.entity';

import {
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  Column,
  OneToMany,
} from 'typeorm';
import { EntityRelationalHelper } from '../../../../../utils/relational-entity-helper';

@Entity({
  name: 'brand',
})
export class BrandEntity extends EntityRelationalHelper {
  @OneToMany(() => ProductModelEntity, (childEntity) => childEntity.brand, {
    eager: true,
    nullable: false,
  })
  models: ProductModelEntity[];

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
