import { Brand } from '../../../../domain/brand';
import { ProductModelMapper } from '../../../../../product-models/infrastructure/persistence/relational/mappers/product-model.mapper';

import { BrandEntity } from '../entities/brand.entity';

export class BrandMapper {
  static toDomain(raw: BrandEntity): Brand {
    const domainEntity = new Brand();
    if (raw.models) {
      domainEntity.models = raw.models.map((item) =>
        ProductModelMapper.toDomain(item),
      );
    }

    domainEntity.slug = raw.slug;

    domainEntity.name = raw.name;

    domainEntity.id = raw.id;
    domainEntity.createdAt = raw.createdAt;
    domainEntity.updatedAt = raw.updatedAt;

    return domainEntity;
  }

  static toPersistence(domainEntity: Brand): BrandEntity {
    const persistenceEntity = new BrandEntity();
    if (domainEntity.models) {
      persistenceEntity.models = domainEntity.models.map((item) =>
        ProductModelMapper.toPersistence(item),
      );
    }

    persistenceEntity.slug = domainEntity.slug;

    persistenceEntity.name = domainEntity.name;

    if (domainEntity.id) {
      persistenceEntity.id = domainEntity.id;
    }
    persistenceEntity.createdAt = domainEntity.createdAt;
    persistenceEntity.updatedAt = domainEntity.updatedAt;

    return persistenceEntity;
  }
}
