import { ProductModel } from '../../../../domain/product-model';

import { BrandMapper } from '../../../../../brands/infrastructure/persistence/relational/mappers/brand.mapper';

import { ProductModelEntity } from '../entities/product-model.entity';

export class ProductModelMapper {
  static toDomain(raw: ProductModelEntity): ProductModel {
    const domainEntity = new ProductModel();
    domainEntity.code = raw.code;

    if (raw.brand) {
      domainEntity.brand = BrandMapper.toDomain(raw.brand);
    }

    domainEntity.name = raw.name;

    domainEntity.description = raw.description;

    domainEntity.id = raw.id;
    domainEntity.createdAt = raw.createdAt;
    domainEntity.updatedAt = raw.updatedAt;

    return domainEntity;
  }

  static toPersistence(domainEntity: ProductModel): ProductModelEntity {
    const persistenceEntity = new ProductModelEntity();
    persistenceEntity.code = domainEntity.code;

    if (domainEntity.brand) {
      persistenceEntity.brand = BrandMapper.toPersistence(domainEntity.brand);
    }

    persistenceEntity.name = domainEntity.name;

    persistenceEntity.description = domainEntity.description;

    if (domainEntity.id) {
      persistenceEntity.id = domainEntity.id;
    }
    persistenceEntity.createdAt = domainEntity.createdAt;
    persistenceEntity.updatedAt = domainEntity.updatedAt;

    return persistenceEntity;
  }
}
