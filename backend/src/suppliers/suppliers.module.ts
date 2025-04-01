import {
  // common
  Module,
} from '@nestjs/common';
import { RelationalSupplierPersistenceModule } from './infrastructure/persistence/relational/relational-persistence.module';
import { SuppliersController } from './suppliers.controller';
import { SuppliersService } from './suppliers.service';

@Module({
  imports: [
    // import modules, etc.
    RelationalSupplierPersistenceModule,
  ],
  controllers: [SuppliersController],
  providers: [SuppliersService],
  exports: [SuppliersService, RelationalSupplierPersistenceModule],
})
export class SuppliersModule {}
