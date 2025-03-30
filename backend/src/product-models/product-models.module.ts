import { BrandsModule } from '../brands/brands.module';
import {
  // common
  Module,
  forwardRef,
} from '@nestjs/common';
import { ProductModelsService } from './product-models.service';
import { ProductModelsController } from './product-models.controller';
import { RelationalProductModelPersistenceModule } from './infrastructure/persistence/relational/relational-persistence.module';

@Module({
  imports: [
    forwardRef(() => BrandsModule),

    // import modules, etc.
    RelationalProductModelPersistenceModule,
  ],
  controllers: [ProductModelsController],
  providers: [ProductModelsService],
  exports: [ProductModelsService, RelationalProductModelPersistenceModule],
})
export class ProductModelsModule {}
