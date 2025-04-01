import { ProductIdentitiesModule } from '../product-identities/product-identities.module';
import {
  // common
  Module,
  forwardRef,
} from '@nestjs/common';
import { SuppliersService } from './suppliers.service';
import { SuppliersController } from './suppliers.controller';
import { RelationalSupplierPersistenceModule } from './infrastructure/persistence/relational/relational-persistence.module';

@Module({
  imports: [
    forwardRef(() => ProductIdentitiesModule),

    // import modules, etc.
    RelationalSupplierPersistenceModule,
  ],
  controllers: [SuppliersController],
  providers: [SuppliersService],
  exports: [SuppliersService, RelationalSupplierPersistenceModule],
})
export class SuppliersModule {}
