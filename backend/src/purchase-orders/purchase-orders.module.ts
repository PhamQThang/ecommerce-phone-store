import {
  // common
  Module,
  forwardRef,
} from '@nestjs/common';
import { ProductIdentitiesModule } from '../product-identities/product-identities.module';
import { SuppliersModule } from '../suppliers/suppliers.module';
import { RelationalPurchaseOrderPersistenceModule } from './infrastructure/persistence/relational/relational-persistence.module';
import { PurchaseOrdersController } from './purchase-orders.controller';
import { PurchaseOrdersService } from './purchase-orders.service';

@Module({
  imports: [
    forwardRef(() => ProductIdentitiesModule),

    forwardRef(() => SuppliersModule),

    // import modules, etc.
    RelationalPurchaseOrderPersistenceModule,
  ],
  controllers: [PurchaseOrdersController],
  providers: [PurchaseOrdersService],
  exports: [PurchaseOrdersService, RelationalPurchaseOrderPersistenceModule],
})
export class PurchaseOrdersModule {}
