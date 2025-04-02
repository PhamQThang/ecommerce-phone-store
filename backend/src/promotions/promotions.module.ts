import { ProductsModule } from '../products/products.module';
import {
  // common
  Module,
} from '@nestjs/common';
import { PromotionsService } from './promotions.service';
import { PromotionsController } from './promotions.controller';
import { RelationalPromotionPersistenceModule } from './infrastructure/persistence/relational/relational-persistence.module';

@Module({
  imports: [
    ProductsModule,

    // import modules, etc.
    RelationalPromotionPersistenceModule,
  ],
  controllers: [PromotionsController],
  providers: [PromotionsService],
  exports: [PromotionsService, RelationalPromotionPersistenceModule],
})
export class PromotionsModule {}
