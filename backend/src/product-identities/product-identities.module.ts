import { ColorsModule } from '../colors/colors.module';
import { ProductsModule } from '../products/products.module';
import {
  // common
  Module,
  forwardRef,
} from '@nestjs/common';
import { ProductIdentitiesService } from './product-identities.service';
import { ProductIdentitiesController } from './product-identities.controller';
import { RelationalProductIdentityPersistenceModule } from './infrastructure/persistence/relational/relational-persistence.module';

@Module({
  imports: [
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
