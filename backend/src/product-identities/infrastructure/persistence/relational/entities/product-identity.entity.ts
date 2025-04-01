import { SupplierEntity } from '../../../../../suppliers/infrastructure/persistence/relational/entities/supplier.entity';

import { ColorEntity } from '../../../../../colors/infrastructure/persistence/relational/entities/color.entity';

import { ProductEntity } from '../../../../../products/infrastructure/persistence/relational/entities/product.entity';

import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { EntityRelationalHelper } from '../../../../../utils/relational-entity-helper';

@Entity({
  name: 'product_identity',
})
export class ProductIdentityEntity extends EntityRelationalHelper {
  @ManyToOne(
    () => SupplierEntity,
    (parentEntity) => parentEntity.productIdentity,
    { eager: false, nullable: true },
  )
  supplier?: SupplierEntity;

  @OneToOne(() => ColorEntity, { eager: true, nullable: false })
  @JoinColumn()
  color: ColorEntity;

  @ManyToOne(() => ProductEntity, (parentEntity) => parentEntity.identities, {
    eager: false,
    nullable: false,
  })
  product: ProductEntity;

  @Column({
    nullable: true,
    type: String,
  })
  status?: string | null;

  @Column({
    nullable: false,
    type: String,
    unique: true,
  })
  imei: string;

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
