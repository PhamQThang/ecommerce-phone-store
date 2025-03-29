import { CartsModule } from '../carts/carts.module';
import { ColorsModule } from '../colors/colors.module';
import { ProductsModule } from '../products/products.module';
import {
  // common
  Module,
  forwardRef,
} from '@nestjs/common';
import { CartProductsService } from './cart-products.service';
import { CartProductsController } from './cart-products.controller';
import { RelationalCartProductPersistenceModule } from './infrastructure/persistence/relational/relational-persistence.module';

@Module({
  imports: [
    forwardRef(() => CartsModule),

    ColorsModule,

    ProductsModule,

    // import modules, etc.
    RelationalCartProductPersistenceModule,
  ],
  controllers: [CartProductsController],
  providers: [CartProductsService],
  exports: [CartProductsService, RelationalCartProductPersistenceModule],
})
export class CartProductsModule {}
