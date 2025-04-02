import { Promotion } from '../../../../domain/promotion';
import { ProductMapper } from '../../../../../products/infrastructure/persistence/relational/mappers/product.mapper';

import { PromotionEntity } from '../entities/promotion.entity';

export class PromotionMapper {
  static toDomain(raw: PromotionEntity): Promotion {
    const domainEntity = new Promotion();
    if (raw.products) {
      domainEntity.products = raw.products.map((item) =>
        ProductMapper.toDomain(item),
      );
    } else if (raw.products === null) {
      domainEntity.products = null;
    }

    domainEntity.discount = raw.discount;

    domainEntity.description = raw.description;

    domainEntity.endDate = raw.endDate;

    domainEntity.startDate = raw.startDate;

    domainEntity.name = raw.name;

    domainEntity.id = raw.id;
    domainEntity.createdAt = raw.createdAt;
    domainEntity.updatedAt = raw.updatedAt;

    return domainEntity;
  }

  static toPersistence(domainEntity: Promotion): PromotionEntity {
    const persistenceEntity = new PromotionEntity();
    if (domainEntity.products) {
      persistenceEntity.products = domainEntity.products.map((item) =>
        ProductMapper.toPersistence(item),
      );
    } else if (domainEntity.products === null) {
      persistenceEntity.products = null;
    }

    persistenceEntity.discount = domainEntity.discount;

    persistenceEntity.description = domainEntity.description;

    persistenceEntity.endDate = domainEntity.endDate;

    persistenceEntity.startDate = domainEntity.startDate;

    persistenceEntity.name = domainEntity.name;

    if (domainEntity.id) {
      persistenceEntity.id = domainEntity.id;
    }
    persistenceEntity.createdAt = domainEntity.createdAt;
    persistenceEntity.updatedAt = domainEntity.updatedAt;

    return persistenceEntity;
  }
}
