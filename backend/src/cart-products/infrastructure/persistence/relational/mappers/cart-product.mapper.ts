import { CartProduct } from '../../../../domain/cart-product';
import { CartMapper } from '../../../../../carts/infrastructure/persistence/relational/mappers/cart.mapper';

import { ColorMapper } from '../../../../../colors/infrastructure/persistence/relational/mappers/color.mapper';

import { ProductMapper } from '../../../../../products/infrastructure/persistence/relational/mappers/product.mapper';

import { CartProductEntity } from '../entities/cart-product.entity';

export class CartProductMapper {
  static toDomain(raw: CartProductEntity): CartProduct {
    const domainEntity = new CartProduct();
    if (raw.cart) {
      domainEntity.cart = CartMapper.toDomain(raw.cart);
    }

    if (raw.color) {
      domainEntity.color = ColorMapper.toDomain(raw.color);
    }

    domainEntity.quantity = raw.quantity;

    if (raw.product) {
      domainEntity.product = ProductMapper.toDomain(raw.product);
    }

    domainEntity.id = raw.id;
    domainEntity.createdAt = raw.createdAt;
    domainEntity.updatedAt = raw.updatedAt;

    return domainEntity;
  }

  static toPersistence(domainEntity: CartProduct): CartProductEntity {
    const persistenceEntity = new CartProductEntity();
    if (domainEntity.cart) {
      persistenceEntity.cart = CartMapper.toPersistence(domainEntity.cart);
    }

    if (domainEntity.color) {
      persistenceEntity.color = ColorMapper.toPersistence(domainEntity.color);
    }

    persistenceEntity.quantity = domainEntity.quantity;

    if (domainEntity.product) {
      persistenceEntity.product = ProductMapper.toPersistence(
        domainEntity.product,
      );
    }

    if (domainEntity.id) {
      persistenceEntity.id = domainEntity.id;
    }
    persistenceEntity.createdAt = domainEntity.createdAt;
    persistenceEntity.updatedAt = domainEntity.updatedAt;

    return persistenceEntity;
  }
}
