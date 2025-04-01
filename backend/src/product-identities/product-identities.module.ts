import {
  // common
  Module,
  forwardRef,
} from '@nestjs/common';
import { ColorsModule } from '../colors/colors.module';
import { ProductsModule } from '../products/products.module';
import { PurchaseOrdersModule } from '../purchase-orders/purchase-orders.module';
import { RelationalProductIdentityPersistenceModule } from './infrastructure/persistence/relational/relational-persistence.module';
import { ProductIdentitiesController } from './product-identities.controller';
import { ProductIdentitiesService } from './product-identities.service';

@Module({
  imports: [
    forwardRef(() => PurchaseOrdersModule),

    ColorsModule,

    forwardRef(() => ProductsModule),

    // import modules, etc.
    RelationalProductIdentityPersistenceModule,
  ],
  controllers: [ProductIdentitiesController],
  providers: [ProductIdentitiesService],
  exports: [
    ProductIdentitiesService,
    RelationalProductIdentityPersistenceModule,
  ],
})
export class ProductIdentitiesModule {}
