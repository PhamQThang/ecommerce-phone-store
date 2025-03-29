import { Cart } from '../../../../domain/cart';
import { CartProductMapper } from '../../../../../cart-products/infrastructure/persistence/relational/mappers/cart-product.mapper';

import { ProductMapper } from '../../../../../products/infrastructure/persistence/relational/mappers/product.mapper';

import { UserMapper } from '../../../../../users/infrastructure/persistence/relational/mappers/user.mapper';

import { CartEntity } from '../entities/cart.entity';

export class CartMapper {
  static toDomain(raw: CartEntity): Cart {
    const domainEntity = new Cart();
    if (raw.items) {
      domainEntity.items = raw.items.map((item) =>
        CartProductMapper.toDomain(item),
      );
    } else if (raw.items === null) {
      domainEntity.items = null;
    }

    if (raw.products) {
      domainEntity.products = raw.products.map((item) =>
        ProductMapper.toDomain(item),
      );
    } else if (raw.products === null) {
      domainEntity.products = null;
    }

    if (raw.userId) {
      domainEntity.userId = UserMapper.toDomain(raw.userId);
    }

    domainEntity.id = raw.id;
    domainEntity.createdAt = raw.createdAt;
    domainEntity.updatedAt = raw.updatedAt;

    return domainEntity;
  }

  static toPersistence(domainEntity: Cart): CartEntity {
    const persistenceEntity = new CartEntity();
    if (domainEntity.items) {
      persistenceEntity.items = domainEntity.items.map((item) =>
        CartProductMapper.toPersistence(item),
      );
    } else if (domainEntity.items === null) {
      persistenceEntity.items = null;
    }

    if (domainEntity.products) {
      persistenceEntity.products = domainEntity.products.map((item) =>
        ProductMapper.toPersistence(item),
      );
    } else if (domainEntity.products === null) {
      persistenceEntity.products = null;
    }

    if (domainEntity.userId) {
      persistenceEntity.userId = UserMapper.toPersistence(domainEntity.userId);
    }

    if (domainEntity.id) {
      persistenceEntity.id = domainEntity.id;
    }
    persistenceEntity.createdAt = domainEntity.createdAt;
    persistenceEntity.updatedAt = domainEntity.updatedAt;

    return persistenceEntity;
  }
}
