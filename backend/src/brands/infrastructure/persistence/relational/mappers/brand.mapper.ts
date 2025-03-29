import { Brand } from '../../../../domain/brand';

import { BrandEntity } from '../entities/brand.entity';

export class BrandMapper {
  static toDomain(raw: BrandEntity): Brand {
    const domainEntity = new Brand();
    domainEntity.slug = raw.slug;

    domainEntity.name = raw.name;

    domainEntity.id = raw.id;
    domainEntity.createdAt = raw.createdAt;
    domainEntity.updatedAt = raw.updatedAt;

    return domainEntity;
  }

  static toPersistence(domainEntity: Brand): BrandEntity {
    const persistenceEntity = new BrandEntity();
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
