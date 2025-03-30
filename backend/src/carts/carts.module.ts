import {
  // common
  Module,
  forwardRef,
} from '@nestjs/common';
import { CartProductsModule } from '../cart-products/cart-products.module';
import { ProductsModule } from '../products/products.module';
import { UsersModule } from '../users/users.module';
import { CartsController } from './carts.controller';
import { CartsService } from './carts.service';
import { RelationalCartPersistenceModule } from './infrastructure/persistence/relational/relational-persistence.module';

@Module({
  imports: [
    forwardRef(() => CartProductsModule),

    ProductsModule,
    CartProductsModule,

    UsersModule,

    // import modules, etc.
    RelationalCartPersistenceModule,
  ],
  controllers: [CartsController],
  providers: [CartsService],
  exports: [CartsService, RelationalCartPersistenceModule],
})
export class CartsModule {}
