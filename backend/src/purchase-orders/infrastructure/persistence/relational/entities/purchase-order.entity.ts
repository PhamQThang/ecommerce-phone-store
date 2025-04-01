import { ProductIdentityEntity } from '../../../../../product-identities/infrastructure/persistence/relational/entities/product-identity.entity';

import { SupplierEntity } from '../../../../../suppliers/infrastructure/persistence/relational/entities/supplier.entity';

import {
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  JoinColumn,
  OneToOne,
  OneToMany,
} from 'typeorm';
import { EntityRelationalHelper } from '../../../../../utils/relational-entity-helper';

@Entity({
  name: 'purchase_order',
})
export class PurchaseOrderEntity extends EntityRelationalHelper {
  @OneToMany(
    () => ProductIdentityEntity,
    (childEntity) => childEntity.purchaseOrder,
    { eager: true, nullable: true },
  )
  productIdentites?: ProductIdentityEntity[] | null;

  @OneToOne(() => SupplierEntity, { eager: true, nullable: false })
  @JoinColumn()
  supplier: SupplierEntity;

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
