import { Module } from '@nestjs/common';
import { PurchaseOrderRepository } from '../purchase-order.repository';
import { PurchaseOrderRelationalRepository } from './repositories/purchase-order.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PurchaseOrderEntity } from './entities/purchase-order.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PurchaseOrderEntity])],
  providers: [
    {
      provide: PurchaseOrderRepository,
      useClass: PurchaseOrderRelationalRepository,
    },
  ],
  exports: [PurchaseOrderRepository],
})
export class RelationalPurchaseOrderPersistenceModule {}
