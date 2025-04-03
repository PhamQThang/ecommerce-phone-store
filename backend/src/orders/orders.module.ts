import {
  // common
  Module,
} from '@nestjs/common';
import { CartsModule } from 'src/carts/carts.module';
import { ProductsModule } from '../products/products.module';
import { UsersModule } from '../users/users.module';
import { RelationalOrderPersistenceModule } from './infrastructure/persistence/relational/relational-persistence.module';
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';

@Module({
  imports: [
    ProductsModule,
    CartsModule,

    UsersModule,
    // import modules, etc.
    RelationalOrderPersistenceModule,
  ],
  controllers: [OrdersController],
  providers: [OrdersService],
  exports: [OrdersService, RelationalOrderPersistenceModule],
})
export class OrdersModule {}
