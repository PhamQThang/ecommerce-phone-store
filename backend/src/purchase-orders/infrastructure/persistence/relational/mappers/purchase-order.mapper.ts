import { PurchaseOrder } from '../../../../domain/purchase-order';
import { ProductIdentityMapper } from '../../../../../product-identities/infrastructure/persistence/relational/mappers/product-identity.mapper';

import { SupplierMapper } from '../../../../../suppliers/infrastructure/persistence/relational/mappers/supplier.mapper';

import { PurchaseOrderEntity } from '../entities/purchase-order.entity';

export class PurchaseOrderMapper {
  static toDomain(raw: PurchaseOrderEntity): PurchaseOrder {
    const domainEntity = new PurchaseOrder();
    if (raw.productIdentites) {
      domainEntity.productIdentites = raw.productIdentites.map((item) =>
        ProductIdentityMapper.toDomain(item),
      );
    } else if (raw.productIdentites === null) {
      domainEntity.productIdentites = null;
    }

    if (raw.supplier) {
      domainEntity.supplier = SupplierMapper.toDomain(raw.supplier);
    }

    domainEntity.id = raw.id;
    domainEntity.createdAt = raw.createdAt;
    domainEntity.updatedAt = raw.updatedAt;

    return domainEntity;
  }

  static toPersistence(domainEntity: PurchaseOrder): PurchaseOrderEntity {
    const persistenceEntity = new PurchaseOrderEntity();
    if (domainEntity.productIdentites) {
      persistenceEntity.productIdentites = domainEntity.productIdentites.map(
        (item) => ProductIdentityMapper.toPersistence(item),
      );
    } else if (domainEntity.productIdentites === null) {
      persistenceEntity.productIdentites = null;
    }

    if (domainEntity.supplier) {
      persistenceEntity.supplier = SupplierMapper.toPersistence(
        domainEntity.supplier,
      );
    }

    if (domainEntity.id) {
      persistenceEntity.id = domainEntity.id;
    }
    persistenceEntity.createdAt = domainEntity.createdAt;
    persistenceEntity.updatedAt = domainEntity.updatedAt;

    return persistenceEntity;
  }
}
