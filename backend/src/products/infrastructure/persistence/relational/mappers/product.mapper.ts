import { ProductModelMapper } from '../../../../../product-models/infrastructure/persistence/relational/mappers/product-model.mapper';
import { Product } from '../../../../domain/product';

import { ProductIdentityMapper } from '../../../../../product-identities/infrastructure/persistence/relational/mappers/product-identity.mapper';

import { ItemStatus, ProductStatus } from '../../../../product.type';
import { ProductEntity } from '../entities/product.entity';

export class ProductMapper {
  static toDomain(raw: ProductEntity): Product {
    const domainEntity = new Product();
    if (raw.model) {
      domainEntity.model = ProductModelMapper.toDomain(raw.model);
    }

    domainEntity.basePrice = raw.basePrice;

    domainEntity.screenSize = raw.screenSize;

    domainEntity.pin = raw.pin;

    domainEntity.screenTechnology = raw.screenTechnology;

    domainEntity.chipset = raw.chipset;

    domainEntity.os = raw.os;

    if (raw.identities) {
      // domainEntity.identities = raw.identities.map((item) =>
      //   ProductIdentityMapper.toDomain(item),
      // );
      domainEntity.identities = null;
      domainEntity.status = ProductStatus.IN_STOCK;
      domainEntity.quantity = raw.identities.length;

      const colors = raw.identities?.reduce(
        (acc, item) => {
          if (item.status === ItemStatus.SOLD) return acc;
          if (acc[item.color.id] === undefined) {
            acc[item.color.id] = {
              name: item.color.name,
              count: 1,
            };
            return acc;
          }
          acc[item.color.id].count++;
          return acc;
        },
        {} as Map<string, { name: string; count: number }>,
      );
      domainEntity.colors = Object.entries(colors || {}).map(
        ([key, value]) => ({
          id: key,
          name: value?.name,
          count: value?.count,
        }),
      );
    } else if (raw.identities === null) {
      domainEntity.identities = null;
      domainEntity.status = ProductStatus.OUT_OF_STOCK;
      domainEntity.quantity = 0;
    }
    domainEntity.images = raw.images;

    domainEntity.storage = raw.storage;

    domainEntity.ram = raw.ram;

    domainEntity.slug = raw.slug;

    domainEntity.name = raw.name;

    domainEntity.id = raw.id;
    domainEntity.createdAt = raw.createdAt;
    domainEntity.updatedAt = raw.updatedAt;

    return domainEntity;
  }

  static toPersistence(domainEntity: Product): ProductEntity {
    const persistenceEntity = new ProductEntity();
    if (domainEntity.model) {
      persistenceEntity.model = ProductModelMapper.toPersistence(
        domainEntity.model,
      );
    }

    persistenceEntity.basePrice = domainEntity.basePrice;

    persistenceEntity.screenSize = domainEntity.screenSize;

    persistenceEntity.pin = domainEntity.pin;

    persistenceEntity.screenTechnology = domainEntity.screenTechnology;

    persistenceEntity.chipset = domainEntity.chipset;

    persistenceEntity.os = domainEntity.os;

    if (domainEntity.identities) {
      persistenceEntity.identities = domainEntity.identities.map((item) =>
        ProductIdentityMapper.toPersistence(item),
      );
    } else if (domainEntity.identities === null) {
      persistenceEntity.identities = null;
    }

    persistenceEntity.images = domainEntity.images;

    persistenceEntity.storage = domainEntity.storage;

    persistenceEntity.ram = domainEntity.ram;

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
