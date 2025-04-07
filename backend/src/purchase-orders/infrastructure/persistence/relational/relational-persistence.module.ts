import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductIdentityEntity } from 'src/product-identities/infrastructure/persistence/relational/entities/product-identity.entity';
import { PurchaseOrderRepository } from '../purchase-order.repository';
import { PurchaseOrderEntity } from './entities/purchase-order.entity';
import { PurchaseOrderRelationalRepository } from './repositories/purchase-order.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([PurchaseOrderEntity]),
    TypeOrmModule.forFeature([ProductIdentityEntity]),
  ],
  providers: [
    {
      provide: PurchaseOrderRepository,
      useClass: PurchaseOrderRelationalRepository,
    },
  ],
  exports: [PurchaseOrderRepository],
})
export class RelationalPurchaseOrderPersistenceModule {}
