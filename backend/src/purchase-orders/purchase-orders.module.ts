import { SuppliersModule } from '../suppliers/suppliers.module';
import {
  // common
  Module,
} from '@nestjs/common';
import { PurchaseOrdersService } from './purchase-orders.service';
import { PurchaseOrdersController } from './purchase-orders.controller';
import { RelationalPurchaseOrderPersistenceModule } from './infrastructure/persistence/relational/relational-persistence.module';

@Module({
  imports: [
    SuppliersModule,

    // import modules, etc.
    RelationalPurchaseOrderPersistenceModule,
  ],
  controllers: [PurchaseOrdersController],
  providers: [PurchaseOrdersService],
  exports: [PurchaseOrdersService, RelationalPurchaseOrderPersistenceModule],
})
export class PurchaseOrdersModule {}
