import { ProductModelsModule } from '../product-models/product-models.module';
import {
  // common
  Module,
  forwardRef,
} from '@nestjs/common';
import { BrandsModule } from '../brands/brands.module';
import { ProductIdentitiesModule } from '../product-identities/product-identities.module';
import { ProductImagesModule } from '../product-images/product-images.module';
import { RelationalProductPersistenceModule } from './infrastructure/persistence/relational/relational-persistence.module';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';

@Module({
  imports: [
    ProductModelsModule,

    forwardRef(() => ProductIdentitiesModule),

    forwardRef(() => ProductImagesModule),

    BrandsModule,

    // import modules, etc.
    RelationalProductPersistenceModule,
  ],
  controllers: [ProductsController],
  providers: [ProductsService],
  exports: [ProductsService, RelationalProductPersistenceModule],
})
export class ProductsModule {}
