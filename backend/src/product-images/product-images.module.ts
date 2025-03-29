import { ProductsModule } from '../products/products.module';
import {
  // common
  Module,
  forwardRef,
} from '@nestjs/common';
import { ProductImagesService } from './product-images.service';
import { ProductImagesController } from './product-images.controller';
import { RelationalProductImagePersistenceModule } from './infrastructure/persistence/relational/relational-persistence.module';

@Module({
  imports: [
    forwardRef(() => ProductsModule),

    // import modules, etc.
    RelationalProductImagePersistenceModule,
  ],
  controllers: [ProductImagesController],
  providers: [ProductImagesService],
  exports: [ProductImagesService, RelationalProductImagePersistenceModule],
})
export class ProductImagesModule {}
