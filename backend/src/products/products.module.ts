import { ProductIdentitiesModule } from '../product-identities/product-identities.module';
import { ProductImagesModule } from '../product-images/product-images.module';
import { BrandsModule } from '../brands/brands.module';
import {
  // common
  Module,
  forwardRef,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { RelationalProductPersistenceModule } from './infrastructure/persistence/relational/relational-persistence.module';

@Module({
  imports: [
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
