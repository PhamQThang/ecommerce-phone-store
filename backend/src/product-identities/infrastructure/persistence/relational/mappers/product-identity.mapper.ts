import { PurchaseOrderMapper } from '../../../../../purchase-orders/infrastructure/persistence/relational/mappers/purchase-order.mapper';

import { ProductIdentity } from '../../../../domain/product-identity';

import { ColorMapper } from '../../../../../colors/infrastructure/persistence/relational/mappers/color.mapper';

import { ProductMapper } from '../../../../../products/infrastructure/persistence/relational/mappers/product.mapper';

import { ProductIdentityEntity } from '../entities/product-identity.entity';

export class ProductIdentityMapper {
  static toDomain(raw: ProductIdentityEntity): ProductIdentity {
    const domainEntity = new ProductIdentity();
    domainEntity.purchasePrice = raw.purchasePrice;

    if (raw.purchaseOrder) {
      domainEntity.purchaseOrder = PurchaseOrderMapper.toDomain(
        raw.purchaseOrder,
      );
    }

    if (raw.color) {
      domainEntity.color = ColorMapper.toDomain(raw.color);
    }

    if (raw.product) {
      domainEntity.product = ProductMapper.toDomain(raw.product);
    }

    domainEntity.status = raw.status;

    domainEntity.imei = raw.imei;

    domainEntity.id = raw.id;
    domainEntity.createdAt = raw.createdAt;
    domainEntity.updatedAt = raw.updatedAt;

    return domainEntity;
  }

  static toPersistence(domainEntity: ProductIdentity): ProductIdentityEntity {
    const persistenceEntity = new ProductIdentityEntity();
    persistenceEntity.purchasePrice = domainEntity.purchasePrice;

    if (domainEntity.purchaseOrder) {
      persistenceEntity.purchaseOrder = PurchaseOrderMapper.toPersistence(
        domainEntity.purchaseOrder,
      );
    }

    if (domainEntity.color) {
      persistenceEntity.color = ColorMapper.toPersistence(domainEntity.color);
    }

    if (domainEntity.product) {
      persistenceEntity.product = ProductMapper.toPersistence(
        domainEntity.product,
      );
    }

    persistenceEntity.status = domainEntity.status;

    persistenceEntity.imei = domainEntity.imei;

    if (domainEntity.id) {
      persistenceEntity.id = domainEntity.id;
    }
    persistenceEntity.createdAt = domainEntity.createdAt;
    persistenceEntity.updatedAt = domainEntity.updatedAt;

    return persistenceEntity;
  }
}
