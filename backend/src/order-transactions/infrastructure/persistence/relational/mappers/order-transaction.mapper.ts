import { OrderTransaction } from '../../../../domain/order-transaction';
import { OrderMapper } from '../../../../../orders/infrastructure/persistence/relational/mappers/order.mapper';

import { OrderTransactionEntity } from '../entities/order-transaction.entity';

export class OrderTransactionMapper {
  static toDomain(raw: OrderTransactionEntity): OrderTransaction {
    const domainEntity = new OrderTransaction();
    if (raw.order) {
      domainEntity.order = OrderMapper.toDomain(raw.order);
    }

    domainEntity.id = raw.id;
    domainEntity.createdAt = raw.createdAt;
    domainEntity.updatedAt = raw.updatedAt;

    return domainEntity;
  }

  static toPersistence(domainEntity: OrderTransaction): OrderTransactionEntity {
    const persistenceEntity = new OrderTransactionEntity();
    if (domainEntity.order) {
      persistenceEntity.order = OrderMapper.toPersistence(domainEntity.order);
    }

    if (domainEntity.id) {
      persistenceEntity.id = domainEntity.id;
    }
    persistenceEntity.createdAt = domainEntity.createdAt;
    persistenceEntity.updatedAt = domainEntity.updatedAt;

    return persistenceEntity;
  }
}
