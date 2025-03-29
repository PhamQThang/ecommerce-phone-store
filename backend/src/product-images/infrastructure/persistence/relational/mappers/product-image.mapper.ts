import { ProductImage } from '../../../../domain/product-image';
import { ProductMapper } from '../../../../../products/infrastructure/persistence/relational/mappers/product.mapper';

import { ProductImageEntity } from '../entities/product-image.entity';

export class ProductImageMapper {
  static toDomain(raw: ProductImageEntity): ProductImage {
    const domainEntity = new ProductImage();
    if (raw.product) {
      domainEntity.product = ProductMapper.toDomain(raw.product);
    }

    domainEntity.url = raw.url;

    domainEntity.id = raw.id;
    domainEntity.createdAt = raw.createdAt;
    domainEntity.updatedAt = raw.updatedAt;

    return domainEntity;
  }

  static toPersistence(domainEntity: ProductImage): ProductImageEntity {
    const persistenceEntity = new ProductImageEntity();
    if (domainEntity.product) {
      persistenceEntity.product = ProductMapper.toPersistence(
        domainEntity.product,
      );
    }

    persistenceEntity.url = domainEntity.url;

    if (domainEntity.id) {
      persistenceEntity.id = domainEntity.id;
    }
    persistenceEntity.createdAt = domainEntity.createdAt;
    persistenceEntity.updatedAt = domainEntity.updatedAt;

    return persistenceEntity;
  }
}
