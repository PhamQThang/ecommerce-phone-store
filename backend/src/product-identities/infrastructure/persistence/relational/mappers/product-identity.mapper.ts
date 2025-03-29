import { ProductIdentity } from '../../../../domain/product-identity';
import { ProductMapper } from '../../../../../products/infrastructure/persistence/relational/mappers/product.mapper';

import { ProductIdentityEntity } from '../entities/product-identity.entity';

export class ProductIdentityMapper {
  static toDomain(raw: ProductIdentityEntity): ProductIdentity {
    const domainEntity = new ProductIdentity();
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
