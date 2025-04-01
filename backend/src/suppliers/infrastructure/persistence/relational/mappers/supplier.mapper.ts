import { Supplier } from '../../../../domain/supplier';
import { ProductIdentityMapper } from '../../../../../product-identities/infrastructure/persistence/relational/mappers/product-identity.mapper';

import { SupplierEntity } from '../entities/supplier.entity';

export class SupplierMapper {
  static toDomain(raw: SupplierEntity): Supplier {
    const domainEntity = new Supplier();
    if (raw.productIdentity) {
      domainEntity.productIdentity = raw.productIdentity.map((item) =>
        ProductIdentityMapper.toDomain(item),
      );
    } else if (raw.productIdentity === null) {
      domainEntity.productIdentity = null;
    }

    domainEntity.address = raw.address;

    domainEntity.phoneNumber = raw.phoneNumber;

    domainEntity.name = raw.name;

    domainEntity.id = raw.id;
    domainEntity.createdAt = raw.createdAt;
    domainEntity.updatedAt = raw.updatedAt;

    return domainEntity;
  }

  static toPersistence(domainEntity: Supplier): SupplierEntity {
    const persistenceEntity = new SupplierEntity();
    if (domainEntity.productIdentity) {
      persistenceEntity.productIdentity = domainEntity.productIdentity.map(
        (item) => ProductIdentityMapper.toPersistence(item),
      );
    } else if (domainEntity.productIdentity === null) {
      persistenceEntity.productIdentity = null;
    }

    persistenceEntity.address = domainEntity.address;

    persistenceEntity.phoneNumber = domainEntity.phoneNumber;

    persistenceEntity.name = domainEntity.name;

    if (domainEntity.id) {
      persistenceEntity.id = domainEntity.id;
    }
    persistenceEntity.createdAt = domainEntity.createdAt;
    persistenceEntity.updatedAt = domainEntity.updatedAt;

    return persistenceEntity;
  }
}
